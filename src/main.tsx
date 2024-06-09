import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@buildo/bento-design-system/index.css";
import "@buildo/bento-design-system/defaultTheme.css";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
