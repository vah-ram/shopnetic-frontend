import React, { useEffect, useState } from 'react'
import "../css/Adverst-style.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css';

function Adverst() {
        const [ count, setCount ] = useState(2);

        useEffect(() => {
            if(window.innerWidth < 700) {
                setCount(1)
            } else {
                setCount(2)
            }
        }, []);

        window.addEventListener('resize', () => {
            if(window.innerWidth < 700) {
                setCount(1)
            } else {
                setCount(2)
            }
        });
      
        return (
            <section className='AdverstSection'>
                <Swiper 
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    slidesPerView={count}
                    draggable={true}
                    loop={true}
                    spaceBetween={16}
                    grabCursor={true}>

                    <SwiperSlide>
                        <img src='/shopImages/Advertisement1.jpg' className="AdverstImage"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src='/shopImages/Advertisement2.webp' className="AdverstImage"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src='/shopImages/Advertisement4.jpg' className="AdverstImage"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src='/shopImages/Advertisement5.png' className="AdverstImage"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src='/shopImages/Advertisement6.webp' className="AdverstImage"/>
                    </SwiperSlide>
                </Swiper>
            </section>
        );
}

export default Adverst