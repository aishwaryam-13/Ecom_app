import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchproduct } from "../../rtk/productReducer/ProductReducer";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product.length === 0) {
      dispatch(fetchproduct());
    }
  }, [dispatch, product.length]);

  useEffect(() => {
    const found = product.find((p) => String(p.id) === id);
    setItem(found);
  }, [id, product]);

  if (!item) {
    return <h3 className="text-center mt-5">Product not found!</h3>;
  }

  const totalPrice = (item.price * quantity).toFixed(2);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={item.image}
            alt={item.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-7">
          <h3 className="fw-bold mb-3">{item.title}</h3>
          <p className="text-muted mb-2">Product Name: {item.name}</p>
          <h5 className="text-success mb-3">Price: ₹{item.price}</h5>
          <p className="text-secondary">{item.description}</p>

          <div className="d-flex align-items-center my-4">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={decreaseQty}
            >
              −
            </button>
            <span className="fw-bold fs-5">{quantity}</span>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={increaseQty}
            >
              +
            </button>
          </div>

          <h5 className="fw-bold text-primary mb-4">Total: ₹{totalPrice}</h5>

          <div className="mt-3">
            <Link to="/shop" className="btn btn-success">
              ← Back to Shop
            </Link>{" "}
            <br /> <br />
            <Link to="/cart" className="btn btn-success">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          .btn-outline-secondary {
            border-radius: 50%;
            width: 38px;
            height: 38px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          .fw-bold.fs-5 {
            min-width: 40px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetails;
