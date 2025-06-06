import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import Header from '../Header/Header'
import { useParams } from "react-router-dom"
import '../css/SearchPart-style.css'
import { SearchRoute } from './utils/searchRoutes.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import BottomFooter from '../BottomFooter/BottomFooter.js';

function SearchPart() {
  const navigate = useNavigate();

  const [ noResultText, setNoResultText ] = useState("")
  const { searchResult } = useParams();
  const [ searchedCategories, setSearchedCategories ] = useState([]);

 useEffect(() => {
    const callAsync = async() => {
      try {
        const res = await axios.get(SearchRoute, {
          params: { searched: searchResult }
        });

        setSearchedCategories(res.data.products);
        if(res.data.product) {
          navigate(`/catalog/${searchResult}`)
        }

        if(res.data.text) {
          setNoResultText(res.data.text);
          document.querySelector('#SearchResultsSection').classList.remove('notText')
        } else {
          setNoResultText(undefined);
          document.querySelector('#SearchResultsSection').classList.add('notText')

        }
      } catch(err) {
        console.error(err);
      }
    };
    callAsync();
}, [searchResult]);

  return (
    <>
        <Header/>
        <BottomFooter/>

        { noResultText ? 
                <span className='noResultsSpan'>
                  <p className='noResultsText'>
                    {noResultText}
                  </p>
                </span>
                :
                ''}

        <section className='SearchResultsSection' id='SearchResultsSection'>
              {
              searchedCategories ?
               searchedCategories.map((item, i) => (
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
                                    }}
                                    id='toBasket'>
                                    <img src='/shopImages/shopping-cart.png'/>
                                    <p>В Корзину</p>
                                </button>
                            </div>
                    </span>
               )) 
               : ''
            }
        </section>
    </>
  )
}

export default SearchPart