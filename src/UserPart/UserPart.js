import React, { useEffect, useState } from 'react'
import '../css/UserPart-style.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { getBasketPricesRoute } from "./utils/UserPartRoutes.js"
import axios from "axios"
 
function UserPart( {currentUser} ) {

  const navigate = useNavigate();
  const [ allPrices, setAllPrices ] = useState(null);

  useEffect(() => {
    const exitDiv = document.querySelector('#exitDiv');

    const handleExit = () => {
      if (localStorage.getItem("current-user")) {
        localStorage.removeItem("current-user");
        navigate('/sign-in');
      }
    };

    exitDiv?.addEventListener("click", handleExit);

    return () => {
      exitDiv?.removeEventListener("click", handleExit);
    };
}, []);


  useEffect(() => {
    const callAsync = async() => {
      try {
        const res = await axios.get(getBasketPricesRoute, {
          params: { myId: currentUser._id }
        });

        if(res) {
          setAllPrices(res.data.productsPrices)
        }
      }catch(err) {
        console.error(err)
      }
    };
    callAsync();
  }, [currentUser]);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Код скопирован", {
          position: "bottom-right",
          duration: 3000,
          style: {
            background: "rgb(255, 57, 57)",
            color: "white",
            border: "none"
          }
        });
  };

  return (
    <>
        <section className="userPartSection">
          <div className="backBtnleft" onClick={() => {
            navigate('/')
          }}>
            <img src="/catalogImg/left-arrow.png"/>
          </div>

          <div className="accountItems">
            <div>
              <span>
                <h2>Общие в карзине</h2>
                <p>{allPrices?.toLocaleString()} ֏</p>
              </span>
            </div>

            <div>
              <span>
                <h2>Доставки</h2>
                <p>Получите товар по QR-коду или коду 
                    <h3 onClick={
                      () => { copyId(currentUser?.shoppingId)}}>
                        {currentUser?.shoppingId}
                    </h3>
                </p>
              </span>
                <Link 
                  to={`/qrId/${currentUser?.shoppingId}`}
                  style={currentUser?.shoppingQr}>
                    <div className="QrCodeDiv">
                      <img src="/shopImages/qr-code.png"/>
                    </div>
                </Link>
            </div>

            <div>
              <span>
                <h2>Покупки</h2>
                <p>Здесь можно купить что-то заново</p>
              </span>
            </div>

            <div>
              <span>
                <h2>Лист ожидания</h2>
                <p>В наличии</p>
              </span>
            </div>

            <div>
              <span>
                <h2>Отзывы и вопросы</h2>
                <p>Делитесь мнением и узнавайте о товарах</p>
              </span>
            </div>

            <div className="exitDiv" id="exitDiv">
              <span>
                <h2>Выйти</h2>
              </span>
            </div>
          </div>
        </section>

        <Toaster richColors/>
    </>
  )
}

export default UserPart