// frontend/src/Pages/LabelAnalyzer.jsx
import { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { ingredientsInfo } from "../Data/ingredintsInfo";

const LabelAnalyzer = () => {
  const { user } = useContext(Context); // used to gate USDA requests (optional)
  const [ingredientsText, setIngredientsText] = useState("");
  const [results, setResults] = useState([]); // array of { name, infoFromDict, usdaNutrients }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // read USDA key from env (optional)
  const USDA_KEY = import.meta.env.VITE_USDA_API_KEY || "";

  // helper: normalize ingredient token
  const normalize = (s) => s.trim().toLowerCase();

  const fetchUsdaFor = async (term) => {
    // Returns nutrient array or null
    try {
      const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
        term
      )}&pageSize=3&api_key=${USDA_KEY}`;

      const searchRes = await fetch(searchUrl);
      if (!searchRes.ok) return null;
      const searchData = await searchRes.json();
      const foods = searchData.foods;
      if (!foods || foods.length === 0) return null;

      // choose the first match's fdcId
      const fdcId = foods[0].fdcId;
      const detailUrl = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${USDA_KEY}`;
      const detailRes = await fetch(detailUrl);
      if (!detailRes.ok) return null;
      const detail = await detailRes.json();

      // Map nutrients into a smaller representation
      const nutrients = (detail.foodNutrients || []).map((n) => ({
        name: n.nutrientName,
        value: n.value,
        unit: n.unitName,
      }));

      // optionally include the description
      return {
        description: detail.description || foods[0].description || term,
        nutrients,
        fdcId,
      };
    } catch (err) {
      console.error("USDA fetch error:", err);
      return null;
    }
  };

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    setError("");
    setResults([]);
    const raw = ingredientsText || "";
    // Accept newline, semicolon or comma separated
    const tokens = raw
      .split(/[,;\n]/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (tokens.length === 0) {
      setError("Please enter at least one ingredient (comma or newline separated).");
      return;
    }

    setLoading(true);

    // Decide whether to attempt USDA calls:
    // only if user is logged in AND key exists
    const doUsda = Boolean(user && USDA_KEY);

    const out = [];

    for (const tok of tokens) {
      const key = normalize(tok);
      // lookup simple dictionary (exact match)
      const dict = ingredientsInfo[key] || null;

      let usda = null;
      if (doUsda) {
        usda = await fetchUsdaFor(tok);
      }

      out.push({
        name: tok,
        normalized: key,
        dict,
        usda,
      });
    }

    setResults(out);
    setLoading(false);

    if (!doUsda && USDA_KEY && !user) {
      // advise the user they can login to enable deeper nutrient lookups
      setError(
        "Tip: Log in to enable USDA nutrient lookups (USDA key present). Without login the analyzer still shows explanations from the local dictionary."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Label Analyzer</h1>

      <p className="mb-4 text-sm text-gray-600">
        Paste the ingredients from a product label (comma, semicolon, or newline separated).
      </p>

      <form onSubmit={handleAnalyze} className="flex flex-col gap-3">
        <textarea
          placeholder="e.g. Sugar, Water, Sodium Benzoate, Citric Acid, Milk"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          className="border rounded p-3 min-h-[120px]"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            type="button"
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded"
            onClick={() => {
              setIngredientsText("");
              setResults([]);
              setError("");
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.length === 0 && !loading && (
          <p className="text-sm text-gray-500">No results yet.</p>
        )}

        {results.map((r, idx) => (
          <div key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <div className="text-xs text-gray-500">
                {r.dict ? r.dict.type : r.usda ? "Found in USDA" : "Unknown"}
              </div>
            </div>

            {/* Local dictionary description */}
            {r.dict ? (
              <p className="mt-2 text-sm text-gray-700">{r.dict.description}</p>
            ) : (
              <p className="mt-2 text-sm text-gray-600 italic">
                No local description found. {r.usda ? "Showing USDA nutrients below." : ""}
              </p>
            )}

            {/* USDA data if present */}
            {r.usda ? (
              <div className="mt-3">
                <div className="text-sm text-gray-700 mb-1">USDA: {r.usda.description}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  {r.usda.nutrients.slice(0, 12).map((n, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-gray-50 border text-xs"
                      title={n.name}
                    >
                      <div className="font-medium">{n.name}</div>
                      <div className="text-gray-600">
                        {n.value} {n.unit}
                      </div>
                    </div>
                  ))}
                </div>
                {r.usda.nutrients.length > 12 && (
                  <p className="mt-2 text-xs text-gray-500">
                    Showing top nutrients — click item to fetch full details (feature).
                  </p>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelAnalyzer;
