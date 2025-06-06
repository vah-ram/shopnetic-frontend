import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/Header-style.css"
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { toDoAddRoute, toDoGetRoute, toDoRemoveRoute } from './utils/headerRoutes.js'

function Header({ currentUser, not }) {
  const inputDivRef = useRef(null);
  const inputRef = useRef();

  const navigate = useNavigate();

  const [ inputValue, setInputValue ] = useState("");
  const [ exitOrentry, setExitOrEntry ] = useState("");
  const [ historyActive, setHistoryActive ] = useState(false);
  const [ historyArr, setHistoryArr ] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
        if(!inputDivRef.current.contains(e.target)) {
          setInputValue('');
          setHistoryActive(false)
        }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  const inputSubmit = async() => {
    if(inputValue) {
      navigate(`/search/${inputValue}`);

      try {
        setInputValue('')

        const res = await axios.post(toDoAddRoute, {
          text: inputValue,
          author: currentUser._id
        });
  
        setHistoryArr(res.data.todoList)
      } catch(err) {
        console.log(err)
      }
    }
  }

  const inputChange = (e) => {
    const callAsync = async() => {
      setInputValue(e.target.value);

      try {
        const res = await axios.get(toDoGetRoute, {
          params: { author: currentUser._id }
        });

        setHistoryArr(res.data.result)
      } catch(err) {
        console.log(err)
      };
    };
    callAsync();
  }

  const todoDelete = async(id) => {
    try {
      await axios.delete(toDoRemoveRoute, {
        params: { todoId: id }
      });
    } catch(err) {
      console.log(err)
    };

    setHistoryArr(prevs => prevs.filter(item => item._id !== id));
  };  


  useEffect(() => {
    if(localStorage.getItem('current-user')) {
      setExitOrEntry("Кабинет")
    } else {
      setExitOrEntry("Войти")
    }

    if (not) return;
    
    const MainHeader = document.querySelector('#MainHeader');
    
    window.innerWidth > 500 && window.addEventListener('scroll', () => {
      if(window.scrollY > 20 ) {
        MainHeader.classList.add('isScrolled')
      } else {
        MainHeader.classList.remove('isScrolled')
      }
    });
  }, []);

  const toBasket = () => {
    if(!localStorage.getItem("current-user")) {
      toast.error("Please sign in for shop!", {
          position: "bottom-center",
          duration: 3000
      })
  } else {
      navigate('/basket');
}

  return (
    <>
      <header className="MainHeader" id='MainHeader'>
          <div className='headerTopBar'>
            <span className='placeSpan'>
              <img src='/shopImages/place-icon.png'/>
              <p>Ванадзор, Лорийская область</p>
            </span>
          </div>

          <div className='headerSecondPart'>
          <h1 onClick={() => navigate('/')}>Ｓʜᴏᴘɴᴇᴛɪᴄ</h1>

          <form 
            className="inputForm"
            ref={inputDivRef}
            onSubmit={e => {
              e.preventDefault();
              inputSubmit();
            }}
            onClick={() => inputRef.current.focus()}>
                <div className='inputPart'>
                  <button 
                    className="inputBtn" id='inputBtn'>
                    <img src='/shopImages/search.png' className='searchImg'/>
                  </button>

                  <input 
                    type='text' 
                    placeholder='Поиск'
                    className="typeInput"
                    onChange={inputChange}
                    onClick={() => setHistoryActive(true)}
                    value={inputValue}
                    ref={inputRef}/>
                </div>

                {
                historyActive && historyArr.length !== 0
                ? 
                <div className='historyPart'>
                  {
                    historyArr.map((item, i) => (
                      <span key={i} onClick={() => setInputValue(item.text)}>
                        <div>
                          <img src='/shopImages/history-search.png'/>
                          <p>{item.text}</p>
                        </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              todoDelete(item._id)
                            }}/>
                      </span>
                    ))
                  }
                </div> 
                : ''}
          </form>

          <button className='storeBtn' onClick={toBasket}>
                  <img src='/shopImages/shopping-cart.png'/>
              <p>Корзина</p>
          </button>

          {
            localStorage.getItem('current-user') ?
             <button className='signBtn' onClick={() => navigate('/user')}>
                    <img src='/shopImages/user.png'/>
                  <p>{exitOrentry}</p>
              </button>
          :
            <button className='signBtn' onClick={() => navigate('/login')}>
                  <img src='/shopImages/user.png'/>
                <p>{exitOrentry}</p>
            </button>
          }
          
          </div>
      </header>

      <Toaster richColors/>
    </>
  )}}

export default Header;