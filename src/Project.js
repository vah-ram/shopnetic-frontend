import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./css/Project-style.css"
import Header from './Header/Header'
import ShopPart from './Shop/ShopPart'
import Adverst from './Adverst/Adverst'
import BottomFooter from './BottomFooter/BottomFooter'

function Project() {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useState({});

      useEffect(() => {
        const storedUser = localStorage.getItem("current-user");
        const user = storedUser ? JSON.parse(storedUser) : null;
    
        setCurrentUser(user)
      }, []);

    useEffect(() => {
      if(localStorage.getItem("current-user")) {
        const user = JSON.parse(localStorage.getItem("current-user"));

        if(user.ref === "Admin") {
          navigate('/my-admin-panel-is-blocked')
        };
      };
    }, []);

      useEffect(() => {
          document.querySelector('body').classList.remove('in-basket')
      }, []);

  return (
    <>
      <section className='Project-section'>
        <Header currentUser={currentUser}/>
        <BottomFooter/>
        <Adverst/>
        <ShopPart currentUser={currentUser}/>
      </section>
    </>
  )
}

export default Project