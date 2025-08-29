import { assets } from '../assets/assets';
import Title from '../Components/Title';

const DoctorsTips = () => {
  const doctorTips = [
    {
      id: 1,
      title: 'Heart Health',
      description:
       '“Keep your heart healthy by focusing on a balanced diet that includes plenty of fruits, vegetables, whole grains, and lean proteins. Limit processed foods, sugary drinks, and trans fats to maintain healthy cholesterol levels. Reduce salt intake to support blood pressure. Exercise regularly, aiming for at least 30 minutes most days, to improve cardiovascular function. Manage stress through relaxation techniques or mindfulness practices. Avoid smoking and limit alcohol consumption. Stay hydrated and get enough sleep. Monitor your heart health through regular check-ups. Incorporate heart-healthy fats like olive oil, nuts, and seeds. Consistently following these habits can significantly improve your heart and overall cardiovascular well-being.”', 
      image: assets.heart_img,
      video: 'https://www.youtube.com/watch?v=jP0qT6GpBVY',
    },
    {
      id: 2,
      title: 'PCOD/PCOS Care',
      description:
        '“Manage PCOD/PCOS by maintaining a balanced diet rich in whole grains, lean proteins, fruits, and vegetables. Limit sugary foods, refined carbs, and processed snacks to support insulin balance. Exercise regularly to improve metabolism and hormonal health. Manage stress through meditation or relaxation techniques. Stay hydrated throughout the day. Get adequate sleep each night. Follow your doctor’s advice for supplements or medications if prescribed. Track your menstrual cycle and symptoms to better manage PCOS. Avoid extreme dieting and focus on sustainable habits. Consistently following these practices helps regulate cycles, reduce symptoms, and improve overall well-being.”',
      image: assets.pcod_img,
      video: 'https://www.youtube.com/watch?v=Mc5iK0AtGNc',
    },
    {
      id: 3,
      title: 'Pregnancy Care',
      description:
        '“During pregnancy, focus on nutrient-rich foods such as folate, iron, calcium, and protein to support both your health and your baby’s development. Stay hydrated and avoid processed foods, alcohol, and excessive caffeine. Engage in safe, doctor-approved physical activity to maintain energy and overall well-being. Prioritize rest and manage stress through relaxation techniques. Attend regular prenatal check-ups to monitor your health and your baby’s growth. Follow your doctor’s guidance on supplements or medications. Practice mindful eating and avoid overeating. Get adequate sleep to support fetal development. Limit exposure to harmful substances and chemicals. Consistently following these habits promotes a healthy pregnancy and smooth delivery.”',
      image: assets.pregnancy_img,
      video: 'https://www.youtube.com/watch?v=8BH7WFmRs-E',
    },
    {
      id: 4,
      title: 'Liver Health',
      description:
        '“Protect your liver by limiting alcohol consumption and avoiding processed or fried foods that can strain liver function. Include liver-friendly foods like leafy greens, cruciferous vegetables, garlic, turmeric, and antioxidant-rich fruits to support detoxification. Stay hydrated throughout the day to help your liver process toxins efficiently. Maintain a healthy weight through regular physical activity, as excess fat can affect liver health. Reduce exposure to environmental toxins and chemicals whenever possible. Follow your doctor’s guidance regarding medications or supplements that impact liver function. Get routine medical check-ups and liver function tests to monitor your health. Prioritize adequate sleep and stress management, as both influence liver performance. Avoid excessive sugar and refined carbohydrates to reduce fat accumulation in the liver. Consistently following these habits supports optimal liver function, overall digestion, and long-term well-being.”',
      image: assets.liver_img,
      video: 'https://www.youtube.com/watch?v=wbh3SjzydnQ',
    },
    {
      id: 5,
      title: 'Gut Health',
      description:
        '“Support your gut health by eating a variety of fiber-rich foods such as whole grains, fruits, and vegetables. Include probiotics from yogurt, kefir, and fermented foods like sauerkraut and kimchi to nourish beneficial gut bacteria. Avoid highly processed foods, sugary snacks, and excessive red meat, which can disrupt the gut microbiome. Stay hydrated by drinking plenty of water, as proper hydration supports digestion and nutrient absorption. Regular physical activity, including walking or yoga, helps maintain healthy gut motility. Manage stress through meditation, deep breathing, or mindfulness, as chronic stress negatively affects gut health. Ensure 7–9 hours of sleep each night to allow your digestive system to repair. Limit unnecessary antibiotics, which can harm beneficial bacteria. Incorporate prebiotic foods like garlic, onions, and bananas to feed healthy gut microbes. Consistently following these habits improves digestion, boosts immunity, and maintains a balanced microbiome.”',
      image: assets.gut_img,
      video: 'https://www.youtube.com/watch?v=1sISguPDlhY',
    },
  ];

  return (
    <div className="px-4 sm:px-[1vw] md:px-[1vw] lg:px-[9vw] bg-slate-30">
      {/* Page Title */}
      <div className="text-5xl font-bold pt-10 border-t mb-10 ">
        <Title text1={"Doctor's"} text2={'Tips'} />
      </div>

      {/* Doctor's Tips Section */}
      <div className="flex flex-col gap-16 my-10">
        {doctorTips.map((tip, index) => (
          <div
            key={tip.id}
            className={`flex flex-col sm:flex-row gap-6 items-center ${
              index % 2 === 1 ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full sm:max-w-[400px] rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {tip.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{tip.description}</p>

              {/* Watch More Button */}
              <a
                href={tip.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-3 py-1.5 bg-slate-700 text-white font-medium rounded-full shadow-sm hover:shadow-md transition duration-300 text-x self-start"
              >
                Watch More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsTips;
