import { assets } from '../assets/assets';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden" id="Footer">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="">
          <img src={assets.logo1} alt="" className="mb-5 w-32 " />
          <p className="w-full sm:w-2/3 text-white ">
            We believe that understanding what you put into your body is the <br /> first step 
            toward a healthier lifestyle. By carefully reading food nutrition <br /> labels and 
            making informed choices, you can enjoy balanced meals, stay energized, and nurture 
            your overall wellness.<br /> Small, mindful decisions today pave the way for significant 
            improvements in your health tomorrow. 
          </p>
          <br />
        </div>

        <div className=" text-white pr-20">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1">
            <li className="mb-2">+88017XX-XXXXXX</li>
            <li className="mb-2">nutriCore@gmail.com </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center  text-white">
          Copyright 2025@ nutricore.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;





