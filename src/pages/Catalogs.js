import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCatalogRoute, getSimiliarProducts, toBasketRoute, link } from './utils/pageRoutes.js'
import '../css/Catalogs-style.css'
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import Header from '../Header/Header.js';
import { io } from 'socket.io-client';
import { Swiper, SwiperSlide } from "swiper/react";
import MobileCatalogBottomFooter from './mobileCatalogBottomFooter/mobileCatalogBottomFooter.js';

const socket = io(link);

function Catalogs( { currentUser }) {
  const navigate = useNavigate();
    const [ item, setItem ] = useState({});
    const [ similiars, setSimiliars ] = useState([]);
    const { productId } = useParams();
    const [ isPc, setIsPc ] = useState(null);

  useEffect(() => {
    const callAsync = async() => {
      try {
        const res = await axios.get( getCatalogRoute, {
          params: { articleId: productId }
        });

        setItem(res.data.catalog)
      } catch(err) {
        console.error(err)
      }
    };
    callAsync();

    window.scroll(0, 0)
  }, [productId]);

  useEffect(() => {
    const callAsyncSimiliars = async() => {
      try {
        const result = await axios.get( getSimiliarProducts, {
          params: { similiarName: item.categoryName, catalogId: item._id }
        });

        setSimiliars(result.data.catalogs)
      } catch(err) {
        console.log(err)
      }
    };
    callAsyncSimiliars();
  }, [item]);

  const handleCopy = () => {
    navigator.clipboard.writeText(item?.article);

    toast.success("Артикул скопирован", {
      position: "bottom-right",
      duration: 3000,
      style: {
        background: "rgb(255, 57, 57)",
        color: "white",
        border: "none"
      }
    });
  };

  window.addEventListener('resize', () => {
    if(window.innerWidth > 500) {
      setIsPc(true)
    } else {
      setIsPc(false)
    }
  }); 
  
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
};

  return (
    <>
      {
        isPc ? <Header not="hi"/> : ''
      }

        <section className='Catalog-Section'>
          <button onClick={() => navigate('/')} className="exit-arrow">
            <img src="/catalogImg/left-arrow.png"/>
          </button>

          <div className='imagePart'>
            <div className='leftImagesPart'>
              {
                item.images?.map(( item, i) => (
                  <span key={i} className='imageSpan'>
                    <img src={item}/>
                  </span>
                ))
              }
            </div>
            <div className='bigPictureDiv'>
              <span className="imgSpan">
                {
                  <Swiper 
                    loop={true}
                    grabCursor={true}>
                    {
                      item.images?.map((img) => (
                        <SwiperSlide>
                           <img src={img}/>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                }
              </span>
            </div>
          </div>
          
          <main className='secondInfoPart'>
              <section className='infoFirstPart'>
                <div className='betweenInfoPart'>
                  <div className='titleReviewDiv'>
                    <h1 className='titleProduct'>{item?.title}</h1>
                    <span className='reviewsSpan'>
                      0 · 0 отзывов
                    </span>
                    <span className='questionSpan'>
                      0 вопросов
                    </span>
                  </div>

                  <span 
                    className='articleSpanSecond' 
                    onClick={handleCopy}>
                    <img src='/catalogImg/copy.png'/> Артикул: {item?.article}
                  </span>

                  <div className='smallImagesDiv'>
                    {
                      item.images?.map(( item, i) => (
                        <span key={i}>
                          <img src={item}/>
                        </span>
                      ))
                    }
                  </div>
                </div>
              </section>

              <section className='infoSecondPart'>
                <div className='infoTopMenuDiv'>
                  <span 
                    className='articleSpan' 
                    onClick={handleCopy}>
                    <img src='/catalogImg/copy.png'/> Артикул: {item?.article}
                  </span>

                  <button className='favoriteButton'>
                    <img src='/catalogImg/favorite-black.png'/>
                  </button>
                </div>

                <div className='workswithProductDiv'>
                  <span className='priceSpan'>
                    {item.price ? item.price.toLocaleString() : ''}֏
                  </span>
                  
                  <span className='basketOrFavoriteSpan'>
                      <button className='basketButton' onClick={() => toBasket(item._id)}>
                        Добавить в корзину
                      </button>
                      <button className='buyButton'>
                        Купить сейчас
                      </button>
                    </span>
                  </div>

                  <div className='placeInfoDiv'>
                    <h2>Информация о доставке</h2>

                    <span>Ванадзор, Армения</span>
                  </div>
              </section>
          </main>
        </section>

        <section className='mobileCatalogPart'>
            <MobileCatalogBottomFooter 
              item={item} 
              currentUser={currentUser}/>
                    
            <div className='imgSliderPart'>
                    <Swiper
                      loop={true}
                      grabCursor={true}>
                      {
                        item.images ? item.images.map((img) => (
                          <SwiperSlide className='slider'>
                            <img src={img}/>
                          </SwiperSlide>
                        )) : ''
                      }
                    </Swiper>
            </div>
            
            <span className="mobileTopMenu">
                <button onClick={() => navigate('/')}>
                  <img src="/catalogImg/left-arrow.png"/>
                </button>

                <button>
                  <img src="/catalogImg/favorite-black.png"/>
                </button>
            </span>

            <div className="pricePartDiv">
              <span>
                <span className='priceMainSpan'>
                  <img src="/catalogImg/price-tag.png"/>
                  <p>
                    {item.price ? item.price.toLocaleString() : ''} ֏
                  </p>
                </span>

                <span onClick={() => handleCopy()}>
                  <p>{item?.article}</p>
                  <img src='/catalogImg/copy.png'/>
                </span>
              </span>
            </div>

            <div className="mobileReviewAndQuestion">
              <span>
                  <main>
                    <div>
                      <img src='/catalogImg/gold-star.png'/>
                      <h2>
                        0,0
                      </h2>
                    </div>
                    <p>0 оценок</p>
                  </main>

                  <button>
                    <img src="/catalogImg/right-arrow.png"/>
                  </button>
              </span>

              <span>
                  <main>
                    <div>
                      <img src="/catalogImg/question.png"/>

                      <h1>0</h1>
                    </div>

                    <p>
                      вопросов
                    </p>
                  </main>
                  
                  <button>
                    <img src="/catalogImg/right-arrow.png"/>
                  </button>
              </span>
            </div>

            <div className='mobileProductNameDiv'>
                  {item?.title}
            </div>

            <footer className='similiarCatalogsFooter'>
                {similiars !== undefined ? 
                    similiars.map((item, i) => (
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
        </section>

        <Toaster richColors/>
    </>
  )
}

export default Catalogs