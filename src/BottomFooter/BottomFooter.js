import React from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import '../css/BottomFooter-style.css'

function BottomFooter() {
      const navigate = useNavigate();

      const toBasket = () => {
        if(!localStorage.getItem("current-user")) {
          toast.error("Please sign in for shop!", {
              position: "bottom-center",
              duration: 3000
          })
      } else {
          navigate('/basket');
      }
    }

  return (
    <><footer className='bottomMenuFooter'>
        <span onClick={() => navigate('/')}>
            <img src='/shopImages/bottom-home.png' className='default-img'/>
            <img src='/shopImages/painted-bottom-home.png' className='added-img'/>
        </span>

        <span>
            <img src='/shopImages/bottom-menu.png' className='default-img'/>
            <img src='/shopImages/painted-bottom-menu.png' className='added-img'/>
        </span>

          {
            localStorage.getItem('current-user') ?
              <span onClick={() => navigate('/user')}>
                  <img src='/shopImages/bottom-shopping-cart.png' className='default-img'/>
                  <img src='/shopImages/painted-bottom-shopping-cart.png' className='added-img'/>
              </span>
          :
            <span onClick={() => navigate('/login')}>
                <img src='/shopImages/bottom-shopping-cart.png' className='default-img'/>
                <img src='/shopImages/painted-bottom-shopping-cart.png' className='added-img'/>
            </span>
          }
    </footer>
          <Toaster richColors/>
    </>
  )
}

export default BottomFooter