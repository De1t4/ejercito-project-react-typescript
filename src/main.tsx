import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/globalProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter>
    <GlobalProvider>
      <Toaster />
      <App />
    </GlobalProvider>
  </BrowserRouter>
  // </StrictMode>,
)
