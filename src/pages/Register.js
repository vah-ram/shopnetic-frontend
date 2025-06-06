import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import '../css/register-style.css'
import { useNavigate } from 'react-router-dom'
import { registerRoute } from './utils/pageRoutes.js'

function Register() {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ correctPassword, setCorrectPassword ] = useState('');

  const toastOptions = {
    position: "bottom-right",
    duration: 3000,
    swipeDirection: "right"
  }

  useEffect(() => {
    if(localStorage.getItem("current-user")) {
      navigate('/')
    }
  }, []);

  const handleSubmit = async() => {
    if(handleValidation()) {
      try {
        const result = await axios.post( registerRoute, {
          username: username,
          email: email,
          password: password
        });

        if(!result.data.status) {
          toast.error(result.data.msg, toastOptions);
        } else {
          localStorage.setItem("current-user", JSON.stringify(result.data.obj));
          navigate('/')
        }

      } catch(err) {
        console.log(err)
      };
    };
  };

  const handleValidation = () => {
    if(username.length < 3) {
      toast.error("Your username must consist of at least 3 letters", toastOptions)
    
      return false;
    } else if(email.length < 11) {
      toast.error("Please write your real Gmail", toastOptions)
    
      return false;
    }  else if(password.length < 8) {
      toast.error("Please write a strong password that will consist of 8 or more characters", toastOptions)
      
      return false;
    } else if(password !== correctPassword) {
      toast.error("Your password and correct password must be the same", toastOptions)
      
      return false;
    } else {
      return true
    }
  }

  return (
    <>
    <section className='SectionLogin'>
        <form className='signForm' onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit()
        }}>
            <span className='titleSpan'>
              <h1>Create ShopNetic account</h1>
            </span>

            <p className='request-text'>
              Already have an account. <a href='/sign-in'>Log in</a>
            </p>

            <section className='secondPartSection'>
              <span className='inputSpan'>
                      <label htmlFor='Username'>* Username</label>
                      
                      <div className='inputPart'>
                          <input 
                              type='text' 
                              placeholder='Write username...' 
                              alt='input for username'
                              id='Username'
                              onChange={e => setUsername(e.target.value)}/>
                      </div>
              </span>

              <span className='inputSpan'>
                      <label htmlFor='emailInput'>* Email</label>
                      
                      <div className='inputPart'>
                          <input 
                              type='email' 
                              placeholder='Write email...' 
                              alt='input for email'
                              id='emailInput'
                              onChange={e => setEmail(e.target.value)}/>
                      </div>
              </span>

              <span className='inputSpan'>
                      <label htmlFor='passwordInput'>* Password</label>
                      
                      <div className='inputPart'>
                          <input 
                              type='password' 
                              placeholder='Write password...' 
                              alt='input for password'
                              id='passwordInput'
                              onChange={e => setPassword(e.target.value)}/>
                      </div>
              </span>

              <span className='inputSpan'>
                      <label htmlFor='CorrectPasswordInput'>* Correct Password</label>
                      
                      <div className='inputPart'>
                          <input 
                              type='password' 
                              placeholder='Correct password...' 
                              alt='input for correct password'
                              id='CorrectPasswordInput'
                              onChange={e => setCorrectPassword(e.target.value)}/>
                      </div>
              </span>

              <button 
                className='sign-Btn'
                type='submit'>
                Sign up
              </button>
              
              <span className='hrSpan'>
                OR
              </span>

              <div className='otherSignDiv'>
                <span>
                  <img src='/shopImages/github.png'/>
                  <p>
                    Sign up with Github
                  </p>
                </span>

                <span>
                  <img src='/shopImages/google.png'/>
                  <p>
                    Sign up with Google
                  </p>
                </span>
              </div>
            </section>
        </form>
    </section>

    <Toaster richColors/>
    </>
  )
}

export default Register