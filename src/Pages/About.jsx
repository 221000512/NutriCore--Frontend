import { assets } from '../assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';
import Title from '../Components/Title';

const About = () => {
  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-slate-50'>
      {/* Section Title */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold pt-10 border-t border-gray-300 mb-10">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 my-10">
        {/* Image */}
        <img
          src={assets.about_img}
          alt="About NutriCore"
          className="w-full md:w-1/2 lg:w-[450px] rounded-lg shadow-2xl shadow-black/25 object-cover"
        />

        {/* Text */}
        <div className="flex flex-col justify-center gap-4 md:w-1/2 text-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">NutriCore</h2>
          <p className='text-base sm:text-lg'>
            NutriCore was created to solve a common problem: food labels are often confusing and filled with unfamiliar terms. Many people struggle to understand what ingredients really mean and whether they are safe or harmful. We built NutriCore to make this process simple and transparent.
          </p>

          <p className='text-base sm:text-lg'>
            At NutriCore, we believe that understanding what you eat should be simple and clear. Too often, food labels are filled with confusing terms and hidden ingredients that leave people unsure about their choices. That’s why we built NutriCore — a platform that breaks down food products into their ingredients and tells you whether each one is good or bad for your health. No complicated science, no overwhelming details — just straightforward explanations you can trust.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">Our Mission</h2>
          <p className='text-base sm:text-lg'>
            Our mission is to empower everyone to make smarter, healthier food decisions with confidence. With NutriCore, you don’t just read labels — you understand them.
          </p>

          <p className='text-base sm:text-lg'>
            We are committed to creating a trusted platform that blends knowledge with technology, helping individuals stay informed, avoid health risks, and build sustainable eating habits that support long-term health and well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
