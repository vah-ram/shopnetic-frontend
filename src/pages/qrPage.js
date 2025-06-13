import "../css/qrPage-style.css"
import { useNavigate } from 'react-router-dom'

function QrPage({ currentUser }) {
  const navigate = useNavigate();

  return (
    <>
      <main className="qrCodeMain">
        <header>
          <button onClick={() => navigate("/user")}>
            <img src="/catalogImg/left-arrow.png"/>
          </button>
        </header>
        
        <footer>
          <img src={currentUser.shoppingQr}/>
        </footer>
      </main>
    </>
  )
}

export default QrPage