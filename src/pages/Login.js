import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { loginRoute } from './utils/pageRoutes.js'
import '../css/Login-style.css';

function Login() {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

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
            const result = await axios.post( loginRoute, {
              username: username,
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
          if(username === '') {
            toast.error("Please write your username!", toastOptions)
          
            return false;
          } else if(password === '') {
            toast.error("Please write your password!", toastOptions)
          
            return false;
          } else {
            return true
          }
        }

  return (
    <>
    <section className='SectionLogin'>
        <form className='loginForm' onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}>
            <span className='titleSpan'>
              <h1>Log in your account</h1>
            </span>

            <p className='request-text'>
              Don't have an account. <a href='/register'>Sign up</a>
            </p>

            <span className='inputSpan'>
                    <label htmlFor='Username'>* Username</label>
                    
                    <div className='inputPart'>
                        <input 
                            type='text' 
                            placeholder='Write username...' 
                            alt='Username'
                            id='Username'
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
            </span>
            
            <span className='inputSpan'>
                    <label htmlFor='passwordInput'>* Password</label>
                    
                    <div className='inputPart'>
                        <input 
                            type='password' 
                            placeholder='Write password...' 
                            alt='Password'
                            id='passwordInput'
                            onChange={e => setPassword(e.target.value)}/>
                    </div>
            </span>

            <span className='keepMeSpan'>
              <input type='checkbox' id='checkInput'/>
              <label htmlFor='checkInput'>Keep me logged in</label>
            </span>

            <button className='sign-Btn' type='submit'>
              Sign in
            </button>

            <span className='hrSpan'>
               OR
            </span>

            <div className='otherSignDiv'>
              <span>
                <img src='/shopImages/github.png'/>
                <p>
                  Continue with Github
                </p>
              </span>

              <span>
                <img src='/shopImages/google.png'/>
                <p>
                  Continue with Google
                </p>
              </span>
            </div>
        </form>
    </section>
      <Toaster richColors/>
    </>
  )
}

export default Login