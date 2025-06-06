import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productRoute } from './utils/pageRoutes.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios'
import '../css/Admin-panel.css'

function AdminPanel() {
  const navigate = useNavigate();

  const [ categoryTitle, setCategoryTitle ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ imageFiles, setImageFiles ] = useState([]);

  const toBackFunc = () => {
    localStorage.removeItem("current-user");
    navigate('/sign-in')
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const AddBtn = document.querySelector('#AddBtn');
  
    try {
      const uploadedImageUrls = [];
  
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", "dyyqgjk00");
        formData.append("upload_preset", "shopnetic-upload-preset");
  
        const res = await fetch("https://api.cloudinary.com/v1_1/dyyqgjk00/image/upload", {
          method: "POST",
          body: formData
        });
  
        const data = await res.json();
        uploadedImageUrls.push(data.secure_url);
      }
  
      const result = await axios.post(productRoute, {
        categoryTitle,
        title,
        price,
        images: uploadedImageUrls
      });
  
      if (result.status === 200) {
        AddBtn.classList.add('isSended');
        setTimeout(() => {
          AddBtn.classList.remove('isSended');
        }, 2000);
      } else {
        AddBtn.classList.remove('isSended');
      }
  
      setPrice('');
      setTitle('');
      setCategoryTitle('');
      setImageFiles([]);
    } catch (err) {
      console.error("Product save error:", err);
    }
  };
  

  return (
    <main className='AdminMain'>
      <span className='backBtn' onClick={toBackFunc}>
        <img src='/shopImages/left-arrow.png'/>
      </span>

    <form 
      className='adminAddForm' 
      onSubmit={handleSubmit}>
        
        <section className='swiperSection'>
          <Swiper 
            slidesPerView={2}
            loop={true}
            spaceBetween={25}
            grabCursor={true}
            className='swiper'>
              
              <SwiperSlide className='swiper-slide'>
                <span 
                  className='swipeCategory' 
                  onClick={e => setCategoryTitle("Shirts")}> 
                    Վերնաշապիկներ
                </span>
              </SwiperSlide>

              <SwiperSlide className='swiper-slide'>
                <span 
                    className='swipeCategory' 
                    onClick={e => setCategoryTitle("Trousers")}> 
                    Տաբատներ
                </span>
              </SwiperSlide>

              <SwiperSlide className='swiper-slide'>
                <span 
                    className='swipeCategory' 
                    onClick={e => setCategoryTitle("Accessories")}>  
                    Աքսեսուարներ
                </span>
              </SwiperSlide>

              <SwiperSlide className='swiper-slide'>
                <span 
                    className='swipeCategory' 
                    onClick={e => setCategoryTitle("For Car")}> 
                    Մեքենայի համար
                </span>
              </SwiperSlide>

              <SwiperSlide className='swiper-slide'>
                <span 
                    className='swipeCategory' 
                    onClick={e => setCategoryTitle("SmartPhones")}> 
                    Սմարթֆոններ
                </span>
              </SwiperSlide>

              <SwiperSlide className='swiper-slide'>
                <span 
                    className='swipeCategory' 
                    onClick={e => setCategoryTitle("Sneakers")}> 
                    Բոթասներ
                </span>
              </SwiperSlide>

          </Swiper>
        </section>
      
      <input 
        type="text" 
        name="title" 
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}/>

      <input 
        type="number" 
        name="price" 
        placeholder='Price' 
        value={price}
        onChange={e => setPrice(e.target.value)}/>

        <label for="fileUpload" class="customFileUpload">Upload Image</label>
        <input 
          type="file" 
          id="fileUpload" 
          name="image" 
          multiple 
          onChange={(e) => setImageFiles([...e.target.files])} />

      <button type="submit" className='AddBtn' id='AddBtn'>
        <p>Add</p>
        <span/>
      </button>
    </form>

    </main>
  )
}

export default AdminPanel