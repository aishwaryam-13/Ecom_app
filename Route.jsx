import { createBrowserRouter } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar"
import Shop from "../shop/Shop";
import Cart from "../cart/Cart";
import Hero from "../hero/Hero";
import AddProducts from "../addProducts/AddProducts";
import ProductDetails from "../shop/ProductDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true, 
        element: <Hero/>,
      },
      {
        path: "/shop", 
        element: <Shop/>,
      },
      {
path:"/add-products",
element:<AddProducts />,
      },


      {
        path:"/shop/:id",
        element:<ProductDetails />

      },
      {
        path: "/cart",  
        element: <Cart/>,
      },
    ],
  },
]);

export default router;

