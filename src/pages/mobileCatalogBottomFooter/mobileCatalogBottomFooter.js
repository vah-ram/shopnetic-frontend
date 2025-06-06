import React from 'react'
import '../../css/mobileCatalogBottomFooter.css'
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import { toBasketRoute, link } from '../utils/pageRoutes.js'

const socket = io(link);

function MobileCatalogBottomFooter({ item, currentUser }) {
    const navigate = useNavigate();

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
    <footer className="CatalogBottomFooter">
        <button onClick={() => toBasket(item._id)}>
            Добавить в корзину
        </button>
        <button className='buyButton'>
            Купить сейчас
        </button>
    </footer>

    <Toaster/>
    </>
  )
}

export default MobileCatalogBottomFooter