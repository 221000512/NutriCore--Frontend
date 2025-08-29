import { assets } from '../assets/assets';
import heroVideo from '../assets/hero_vdo.mp4'; 

const Hero = () => {
  return (
   
    <div className='  px-4 sm:px-[1vw] md:px-[1vw] lg:px-[1vw]'>
      <div className="flex flex-col sm:flex-row border bg-[#fff2d1] ">
      
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">

            
          <div className="text-[#414141] relative z-10 text-center px-4">
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-7xl leading-relaxed drop-shadow-lg">
              {' '}
              NutriCore
            </h1>
            <div className="flex items-center gap-2 justify-center">
              <p className="font-semibold text-xl md:text-base">Know What You Eat!</p>
              <p className="w-8 md:w-11 h-[1px] bg-black"></p>
            </div>
            <br />
            <div className="flex items-center gap-2 justify-center">
              <p className=" lg:text-xl md:text-base">Let's explore the components of healthy foods and their contribution to our overall health</p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}

      
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full sm:w-1/2 object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
