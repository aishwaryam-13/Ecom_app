import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateQty,
  clearCart,
} from "../../rtk/cartReducer/CartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(updateQty({ id: item.id, qty: item.qty + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.qty > 1) {
      dispatch(updateQty({ id: item.id, qty: item.qty - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;
  if (error)
    return <h4 className="text-center mt-5 text-danger">Error: {error}</h4>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-success">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-center">
          <h5>Your cart is empty.</h5>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="70"
                      height="70"
                      style={{
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto 5px",
                      }}
                    />
                    <div>{item.name}</div>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.price * item.qty}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-3">
            <h4>Total: ₹{totalPrice}</h4>
            <button
              className="btn btn-outline-danger me-2"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
