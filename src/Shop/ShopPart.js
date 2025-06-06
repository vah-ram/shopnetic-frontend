import React, { useState , useEffect } from 'react';
import "../css/ShopPart.css";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { getProductRoute, toBasketRoute, link } from '../pages/utils/pageRoutes.js';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(link)

function ShopPart({ currentUser }) {
    const navigate = useNavigate();
    
    const [ isMobile, setIsMobile ] = useState(false);
    const [ productsArr, setProductsArr ] = useState([]);


     useEffect(() => {
        if(window.innerWidth < 600) {
            setIsMobile(true)
        } else {
             setIsMobile(false)
         }
     }, []);
    
     window.addEventListener('resize', () => {
         if(window.innerWidth < 600) {
             setIsMobile(true)
         } else {
             setIsMobile(false)
         }
     });


    useEffect(() => {
        const categorySpan = document.querySelectorAll('.categorySpan');

        const handleCheck = (e) => {

            categorySpan.forEach((item) => {
                item.classList.remove('activated')
            })

            e.target.classList.add('activated');
        };


        categorySpan.forEach((item) => {
            item.addEventListener('click', handleCheck)
        });

        return () => {
            categorySpan.forEach((item) => {
                item.removeEventListener('click', handleCheck)
            });
        }
    }, []);

    useEffect(() => {
        const callAsync = async() => {
            try {
                const res = await axios.get(getProductRoute);
                setProductsArr(res.data.result);
            } catch(err) {
                console.log(err)
            }
        };
        callAsync()
    }, [])

    const handleSubmit = async(name) => {
        try {
            const res = await axios.get(getProductRoute, { params: { name } })
            setProductsArr(res.data.result);
        } catch(err) {
            console.log(err)
        }
    };

    const toBasket = async(id) => {
        if(!localStorage.getItem("current-user")) {
            toast.error("Please sign in for shop!", {
                position: "bottom-center",
                duration: 3000
            })
        } else {
            navigate('/basket')

            try {
                await axios.post(toBasketRoute, { myId: currentUser._id, id });
            } catch(err) {
                console.error(err);
            }

            socket.emit('refresh-basket-products')
        }
    }

  return (
    <>
    <footer className='shopFooter'>
        <main className='categoriesMain' id='categoriesMain'>
            {
                isMobile ?
                    <Swiper 
                        loop={true}
                        slidesPerView={4}
                        spaceBetween={7}
                        grabCursor={true}>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("Shirts")}>
                                <img src='/categoryImages/CategoryImg1.png'/>

                                    <p>
                                        Рубашки
                                    </p>
                            </span>
                        </SwiperSlide>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("Trousers")}>
                                <img src='/categoryImages/CategoryImg2.png'/>

                                    <p>
                                        Брюки
                                    </p>
                            </span>
                        </SwiperSlide>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("Accessories")}>
                                <img src='/categoryImages/CategoryImg3.png'/>

                                    <p>
                                        Аксессуары
                                    </p>
                            </span>
                        </SwiperSlide>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("For Car")}>
                                <img src='/categoryImages/CategoryImg6.png'/>

                                    <p>
                                        Для Машины
                                    </p>
                            </span>
                        </SwiperSlide>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("SmartPhones")}>
                                <img src='/categoryImages/CategoryImg4.png'/>

                                    <p>
                                        Смартфоны
                                    </p>
                            </span>
                        </SwiperSlide>

                        <SwiperSlide>
                            <span 
                                className='categoryMobileSpan'
                                onClick={() => handleSubmit("Sneakers")}>
                                <img src='/categoryImages/CategoryImg5.png'/>

                                    <p>
                                        Кроссовки
                                    </p>
                            </span>
                        </SwiperSlide>
                    </Swiper>
                :
                <>
                <span 
                    className='categorySpan' 
                    onClick={() => handleSubmit("Shirts")}>
                        <img src='/shopImages/tshirt.png' className='default-img'/>
                        <img src='/shopImages/tshirt-white.png' className='added-img'/>
                    <p>
                        Рубашки
                    </p>
                </span>

                <span className='categorySpan' 
                      onClick={() => handleSubmit("Trousers")}>
                        <img src='/shopImages/pants.png' className='default-img'/>
                        <img src='/shopImages/pants-white.png' className='added-img'/>
                    <p>
                        Брюки
                    </p>
                </span>

                <span className='categorySpan' 
                      onClick={() => handleSubmit("Accessories")}>
                        <img src='/shopImages/gadget.png' className='default-img'/>
                        <img src='/shopImages/gadget-white.png' className='added-img'/>
                    <p>
                        Аксессуары
                    </p>
                </span>

                <span className='categorySpan' 
                      onClick={() => handleSubmit("For Car")}>
                        <img src='/shopImages/for-car.png' className='default-img'/>
                        <img src='/shopImages/for-car-white.png' className='added-img'/>
                    <p>
                        Для Машины
                    </p>
                </span>

                <span className='categorySpan' 
                      onClick={() => handleSubmit("SmartPhones")}>
                        <img src='/shopImages/mobile.png' className='default-img'/>
                        <img src='/shopImages/mobile-white.png' className='added-img'/>
                    <p>
                        Смартфоны
                    </p>
                </span>
                
                <span className='categorySpan' 
                      onClick={() => handleSubmit("Sneakers")}>
                        <img src='/shopImages/sneakers.png' className='default-img'/>
                        <img src='/shopImages/sneakers-white.png' className='added-img'/>
                    <p>
                        Кроссовки
                    </p>
                </span>
            </>
            }
        </main>

        <div className='rekTitleDiv'>
            <h2 className='rekTitle'>Рекомендовано для вас</h2>
        </div>

        <footer className='ProductsFooter' id='ProductsFooter'> 
            {productsArr ? 
                productsArr.map((item, i) => (
                    <span 
                        key={i} 
                        className='productSpan'
                        id='productSpan'
                        onClick={() => 
                            navigate(`/catalog/${item.article}`)
                        }>
                                
                            <Swiper
                                loop={true}
                                grabCursor={true}>
                                {
                                item.images ? item.images.map((img) => (
                                    <SwiperSlide>
                                        <img 
                                            src={img} 
                                            className="product-image"/>
                                    </SwiperSlide>
                                )) : ''
                                }
                            </Swiper>

                            <div className='buyPart'>
                                <div className='textPart'>
                                    <h2>
                                        {item.price.toLocaleString()} ֏ 
                                    </h2>
                                    <p>{item.title}</p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toBasket(item._id)
                                    }}
                                    id='toBasket'>
                                    <img src='/shopImages/shopping-cart.png'/>
                                    <p>В Корзину</p>
                                </button>
                            </div>
                    </span>
            )) : null}               
        </footer>
    </footer>

    <Toaster richColors/>
    </>
  )
}

export default ShopPart