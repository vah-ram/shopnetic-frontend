import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ShopBasket.css';
import { deleteBasketProduct, link, addFavoriteProduct, deleteFavoriteProduct, getFavoriteProduct } from './utils/pageRoutes.js';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const socket = io(link);

function BasketItem({ item, currentUser }) {
    const navigate = useNavigate();
    const [ count, setCount ] = useState(1);
    const [ isFavorite, setIsFavorite ] = useState(null);
    const key = `favorites-${currentUser._id}`;

    const date = new Date(item.updatedAt);
    const formatted = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(date);

    const handleDelete = async(id) => {
        try {
            await axios.delete(deleteBasketProduct, {
                params: { myId: currentUser?._id, productId: id }
            });
            socket.emit('refresh-basket-products');
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (count < 1) setCount(1);
    }, [count]);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem(key)) || {};
        if (local[item?._id] !== undefined) {
            setIsFavorite(local[item?._id]);
        }

        const syncWithServer = async () => {
            try {
                const res = await axios.get(getFavoriteProduct, {
                    params: { myId: currentUser?._id }
                });

                if (res.data.favorites) {
                    const isFav = res.data.favorites.includes(item?._id);
                    setIsFavorite(isFav);
                    localStorage.setItem(key, JSON.stringify({ ...local, [item?._id]: isFav }));
                }
            } catch (err) {
                console.log(err);
            }
        };

        syncWithServer();
    }, []);

    useEffect(() => {
        if (isFavorite === null) return;

        const updateFavorite = async () => {
            const local = JSON.parse(localStorage.getItem(key)) || {};

            try {
                if (isFavorite) {
                    await axios.post(addFavoriteProduct, {
                        productId: item._id,
                        myId: currentUser._id
                    });
                } else {
                    await axios.delete(deleteFavoriteProduct, {
                        params: { productId: item._id, myId: currentUser._id }
                    });
                }

                localStorage.setItem(key, JSON.stringify({ ...local, [item._id]: isFavorite }));
            } catch (err) {
                console.log(err);
            }
        };

        updateFavorite();
    }, [isFavorite]);

    return (
        <section 
            className='product-basket-section' 
            onClick={() => navigate(`/catalog/${item.article}`)}>

            <span className='second-part-span'>
                <span className='img-part'>
                    <img src={item.images[0]} className='product-image'/>
                </span>
                            
                <span className='info-part'>
                    <h2>{item.price.toLocaleString()} ֏</h2>
                    <h3>{item.title}</h3>
                    <p>{formatted}</p>
                </span>
            </span>

            <div 
                className='favoriteDiv' 
                onClick={(e) => {
                    e.stopPropagation();
                    if (isFavorite !== null) setIsFavorite(!isFavorite);
                }}>
                <button className='favoriteBtn'>
                    {isFavorite ? (
                        <img src='/catalogImg/is-favorite.png' className='added-img' />
                    ) : (
                        <img src='/catalogImg/favorite.png' className='default-img' />
                    )}
                </button>
            </div>

            <div className='bottom-add-part'>
                <span onClick={e => e.stopPropagation()}>
                    <button onClick={() => setCount(Math.max(1, count - 1))}>-</button>
                    <p>{count}</p>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </span>

                <button 
                    className='buyBtn' 
                    onClick={(e) => { e.stopPropagation() }}>
                    Купить
                </button>

                <button className='removeBtn' onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                }}>
                    <img src='/shopImages/recycle-bin.png' />
                </button>
            </div>
        </section>
    );
}

export default BasketItem;
