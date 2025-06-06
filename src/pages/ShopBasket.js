import React, { useState, useEffect } from 'react'
import Header from '../Header/Header.js'
import BottomFooter from '../BottomFooter/BottomFooter.js'
import '../css/ShopBasket.css';
import axios from 'axios'
import { getBasketProducts, link } from './utils/pageRoutes.js'
import BasketItem from './BasketItem.js';
import { io } from "socket.io-client";

const socket = io(link);

function ShopBasket({ currentUser }) {
    const [ notMobile, setNotMobile ] = useState(true);
    const [ basketProducts, setBasketProducts ] = useState([]);

    useEffect(() => {
        if(window.innerWidth < 500) {
            setNotMobile(false);
        } else {
            setNotMobile(true);
        }
    }, []);

    useEffect(() => {
        document.querySelector('body').classList.add('in-basket');
    }, []);


    useEffect(() => {
        if (currentUser && currentUser?._id) {
            fetchBasket(currentUser?._id);
        }
    }, [currentUser]);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser && storedUser?._id) {
            fetchBasket(storedUser?._id);
        }
    }, []);
    
    const fetchBasket = async (id) => {
        try {
            const res = await axios.get(getBasketProducts, {
                params: { myId: id },
            });
            if (res) {
                setBasketProducts(res.data.arr);
            }
        } catch (err) {
            console.error(err);
        }
    };

    socket.on('refresh-basket-products', fetchBasket(currentUser?._id))
    
  return (
    <>
      { notMobile ? <Header/> : <BottomFooter/>}

      <footer className='basket-footer' id='basket-footer'>
        <span className='top-basket-products'>
            <h2>Корзина</h2>
            <p>{basketProducts.length ? basketProducts.length : 'нет'} товар</p>
        </span>

        <div className='basket-sections-part'>

            {
                basketProducts ?
                    basketProducts.map((item, i) => (
                        item ? 
                            <BasketItem 
                            key={i}
                            item={item} 
                            currentUser={currentUser}/>
                            :
                            null
                    ))
                : ''
            }
        </div>
      </footer>
    </>
  )
}

export default ShopBasket