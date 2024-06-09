

// import banner1 from "../../../../assets/Banner/HomeBanner.png"

// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


const Slider = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img src="https://t4.ftcdn.net/jpg/06/44/71/59/360_F_644715970_ms6pbT1zagBprZPT0mv9yoAgi2zJ4U2c.jpg" className="min-h-screen" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/main-banner1-598x289.png" className='min-h-screen' alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/main-banner3-598x289.png" className='min-h-screen' alt="" /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;