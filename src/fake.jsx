 // Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from "../../../assets/img1.jpg"
import img2 from "../../../assets/img2.jpg"
import img3 from "../../../assets/img3.jpg"
import img4 from "../../../assets/img4.jpg"


import './styles.css';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import BannerImg from './BannerImg';


const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerImg img={img1} title={'Find Your Perfect Match Today'} text={'Start your journey to find the love of your life. Join our community and meet like-minded individuals who are ready to commit to a lifelong partnership.'}></BannerImg>
        </SwiperSlide>
        <SwiperSlide>
          <BannerImg img={img2} title={'Connecting Hearts, Building Futures'} text={'At Love Link Matrimony, we believe in creating meaningful connections that last a lifetime. Our platform brings together hearts and minds to build beautiful futures together.'}></BannerImg>
        </SwiperSlide>
        <SwiperSlide>
          <BannerImg img={img3} title={'Matchmaking Made Easy'} text={'Finding your soulmate has never been easier. With Love Link Matrimony, enjoy a seamless and efficient matchmaking experience tailored to your preferences.'}></BannerImg>
        </SwiperSlide>
        <SwiperSlide>
          <BannerImg img={img4} title={'Bringing Soulmates Together'} text={'We specialize in bringing soulmates together. Join our community and let us help you find the person who complements you perfectly.'}></BannerImg>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
#app {
    height: 100%;
  }
  html,
  body {
    position: relative;
    height: 100%;
  }
  
  body {
    /* background: #eee; */
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
  }
  
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /* background: #fff; */
  
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
 const BannerImg = ({ img, title, text }) => {
    return (


        <div
            className='w-full bg-center bg-cover h-[53rem]'
            style={{
                backgroundImage: url("${img}"),
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                        {title}
                    </h1>
                    <br />
                    <p className=' w-3/4 ml-32  text-xl font-medium text-white '>
                        {text}
                    </p>
                </div>
                
            </div>
            
        </div>


    );
};

export default BannerImg;