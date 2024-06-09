import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, FreeMode, Autoplay, Pagination, Navigation } from 'swiper/modules';
import useMediAll from '../../../../Hooks/UseMedicinAll/useMediAll';
import DiscountSlider from './DiscountSlider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import './styles.css';

const Discount = () => {
    const [medicinAll] = useMediAll();

    const discountedProducts = medicinAll.filter(product => product.discount_percentage > 0);
    console.log(discountedProducts);

    return (
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
            modules={[EffectFlip, Autoplay, FreeMode, Pagination, Navigation]}
            className="mySwiper"
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
        >
            {discountedProducts.map(discount => (
                <SwiperSlide key={discount._id}>
                    <DiscountSlider discount={discount} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Discount;
