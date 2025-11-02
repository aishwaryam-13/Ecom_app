import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './rtk/store/store';




createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <App/>
</Provider>
)
