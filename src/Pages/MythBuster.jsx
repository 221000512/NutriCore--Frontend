import { assets } from '../assets/assets';
import Title from '../Components/Title';

const MythBuster = () => {
  const myths = [
    {
      id: 1,
      title: 'Myth - Sugar causes hyperactivity in kids',
      fact: 'Fact - Studies show no consistent evidence that sugar makes kids hyper. Excitement at parties is often mistaken for a sugar rush.',
      image: assets.sugar_img,
    },
    {
      id: 2,
      title: 'Myth - Gluten-free diets are healthier for everyone',
      fact: 'Fact - Gluten-free diets are necessary only for people with celiac disease or gluten sensitivity. Otherwise, they may lack important nutrients.',
      image: assets.gluten_img,
    },
    {
      id: 3,
      title: 'Myth - Eggs raise your blood cholesterol dramatically',
      fact: 'Fact - Eggs have little impact on blood cholesterol for most people. Saturated and trans fats affect cholesterol much more.',
      image: assets.eggs_img,
    },
    {
      id: 4,
      title: 'Myth - Detox teas cleanse your body of toxins',
      fact: 'Fact - Your liver and kidneys naturally detoxify your body. Detox teas often act as laxatives, which may cause dehydration.',
      image: assets.detox_img,
    },
    {
      id: 5,
      title: 'Myth - Eating late at night causes weight gain',
      fact: 'Fact - Weight gain is influenced by overall calorie intake, not the time of day. Late-night eating can affect sleep quality if overeating occurs.',
      image: assets.night_eating_img,
    },
    {
      id: 6,
      title: 'Myth - Carbs make you fat',
      fact: 'Fact - Carbohydrates are a key energy source. Excess calories, not carbs alone, cause weight gain. Focus on complex carbs like whole grains.',
      image: assets.carbs_img,
    },
    {
      id: 7,
      title: 'Myth - Drinking water flushes out fat',
      fact: 'Fact - Water is essential for health, but it does not directly burn fat. Proper hydration supports metabolism and digestion.',
      image: assets.water_img,
    },
    {
      id: 8,
      title: 'Myth - High-protein diets damage kidneys',
      fact: 'Fact - Healthy individuals can safely consume higher protein levels. Only those with pre-existing kidney disease need strict limits.',
      image: assets.protein_img,
    },
    {
      id: 9,
      title: 'Myth - Coffee stunts growth',
      fact: 'Fact - There is no scientific evidence that coffee affects height. Excess caffeine may affect sleep, which indirectly impacts growth in children.',
      image: assets.coffee_img,
    },
    {
      id: 10,
      title: 'Myth - Supplements can replace a balanced diet',
      fact: 'Fact - Supplements cannot replace whole foods. A balanced diet provides nutrients, fiber, and antioxidants that supplements alone cannot offer.',
      image: assets.supplements_img,
    },
    {
      id: 11,
      title: 'Myth - Natural sugars are always safe',
      fact: 'Fact - Even natural sugars, like honey or fruit juice, can contribute to excess calorie intake and affect blood sugar if consumed in large amounts. Moderation is key.',
      image: assets.natural_sugar_img,
    },
    {
      id: 12,
      title: 'Myth - All fats are bad for you',
      fact: 'Fact - Healthy fats, such as those from avocados, nuts, and olive oil, are essential for heart and brain health. Only trans and excessive saturated fats are harmful.',
      image: assets.fats_img,
    },
    
  ];

 

  return (
    <div className="px-4 sm:px-[1vw] md:px-[1vw] lg:px-[6vw] bg-slate-50">
      {/* Page Title */}
      <div className="text-5xl font-bold pt-10 border-t mb-10 ">
        <Title text1={'Myth'} text2={'Buster'} />
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {myths.map((myth) => (
          <div
            key={myth.id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transform transition duration-300"
          >
            <img
              src={myth.image}
              alt={myth.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{myth.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{myth.fact}</p>
          </div>
        ))}
      </div>
      <br /> <br />
    </div>
  );
};

export default MythBuster;
