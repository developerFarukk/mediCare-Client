
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { EffectFlip, Autoplay, Pagination, Navigation } from 'swiper/modules';


const Discount = () => {
    return (

        <>
            <Swiper
                effect={'flip'}
                grabCursor={true}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                  }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[EffectFlip, Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid justify-center  items-center mx-24 my-16'>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/p8-180x210.jpg" alt="Shoes" /></figure>
                            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">20% OFF</p>
                            <div className="card-body flex flex-col items-center">
                                <h2 className="card-title">Discount srction</h2>
                                <p>Tablet</p>
                                {/* <div className="card-actions justify-end">
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='grid justify-center'>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/p8-180x210.jpg" alt="Shoes" /></figure>
                            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">20% OFF</p>
                            <div className="card-body flex flex-col items-center">
                                <h2 className="card-title">Discount srction</h2>
                                <p>Tablet</p>
                                {/* <div className="card-actions justify-end">
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='grid justify-center'>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/p8-180x210.jpg" alt="Shoes" /></figure>
                            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">20% OFF</p>
                            <div className="card-body flex flex-col items-center">
                                <h2 className="card-title">Discount srction</h2>
                                <p>Tablet</p>
                                {/* <div className="card-actions justify-end">
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='grid justify-center'>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://opencart.templatemela.com/OPC04/OPC040084/image/cache/catalog/p8-180x210.jpg" alt="Shoes" /></figure>
                            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">20% OFF</p>
                            <div className="card-body flex flex-col items-center">
                                <h2 className="card-title">Discount srction</h2>
                                <p>Tablet</p>
                                {/* <div className="card-actions justify-end">
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Discount;