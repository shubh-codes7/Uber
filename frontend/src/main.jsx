import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

  <CaptainContext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </SocketProvider>
    </UserContext>
  </CaptainContext>

)
