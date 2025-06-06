import './App.css';
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Project from './Project';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import ShopBasket from './pages/ShopBasket';
import Catalogs from './pages/Catalogs';
import SearchPart from './Search/SearchPart';
import UserPart from './UserPart/UserPart';
import QrPage from './pages/qrPage';

function App() {

  const [ currentUser, setCurrentUser ] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("current-user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    setCurrentUser(user)
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' 
                 element={<Project currentUser={currentUser}/>}/>
          <Route path='/sign-in' 
                 element={<Login />}/>
          <Route path='/sign-up' 
                 element={<Register />}/>
          <Route path='/my-admin-panel-is-blocked' 
                 element={<AdminPanel/>} />
          <Route path='/basket' 
                 element={<ShopBasket currentUser={currentUser} />} />
          <Route path='/catalog/:productId' 
                 element={<Catalogs currentUser={currentUser}/>} />
          <Route path='/search/:searchResult' 
                 element={<SearchPart currentUser={currentUser}/>} />
          <Route path='/user' 
                 element={<UserPart currentUser={currentUser}/>} />
          <Route path='/qr-code/?qrId' 
                 element={<QrPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
