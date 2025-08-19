"use client"
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './main.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {Swiper as Swiper_O} from 'swiper';
import Image from 'next/image';
import ImageMagnifier from './ImageMagnify';

const ProductCarousel = ({imgs}:{imgs:string[]}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper_O|null>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productSwiper mb-5"
      >
        {
            imgs.map((img, index) => (
              <SwiperSlide className='w-full h-full border-2 rounded flex justify-center items-center'  key={index}>
                <ImageMagnifier className='h-full m-auto' src={img} />
              </SwiperSlide>
            ))

  
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={2}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
            imgs.map((img, index) => (
              <SwiperSlide className='' key={index}>
                <Image src={img} className='object-center object-cover border-2 rounded border-gray-400 m-auto' alt="Product Image" width={100} height={100} />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}


export default ProductCarousel;