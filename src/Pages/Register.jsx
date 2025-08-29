import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await registerUser(name, email, password);
    if (res.success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 flex flex-col gap-5 text-gray-100 shadow-lg"
      >
        <h2 className="text-3xl text-center mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400" />
        <button className="w-2/3 m-auto bg-gray-100 text-black font-semibold py-3 rounded-full hover:bg-gray-200 transition">Sign Up</button>
        <p className="text-center mt-2 text-gray-400">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="cursor-pointer text-green-500 hover:underline">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
