import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproduct } from "../../rtk/productReducer/ProductReducer";
import { addToCart } from "../../rtk/cartReducer/CartSlice";
import { Link, useNavigate } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    product = [],
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchproduct());
  }, [dispatch]);

  if (loading) {
    return <h1 className="text-center my-5 text-primary">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center my-5 text-danger">Error: {error}</h1>;
  }

  return (
    <>
      <h2 className="text-center my-4 text-success fst-italic text-decoration-underline">
        Product List
      </h2>

      <div className="container">
        <div className="row">
          {product.length > 0 ? (
            product.map((data, index) => (
              <div
                className="col-md-3 col-sm-6 mb-4"
                key={`${data.id}-${index}`}
              >
                <div className="card product-card border-0 shadow-sm">
                  <img
                    src={data.image}
                    className="card-img-top img-fluid"
                    alt={data.title}
                  />
                  <div className="card-body text-center p-3">
                    <h6 className="card-title text-dark fw-semibold mb-2">
                      {data.title}
                    </h6>
                    <p className="card-text text-muted small mb-1">
                      Product Name: {data.name}
                    </p>
                    <p className="text-success fw-bold">
                      Price: ₹{data.price || data["price "]}
                    </p>
                    <p className="card-text small text-secondary">
                      {data.description}
                    </p>
                  </div>

                  <div className="card-footer bg-white border-0 d-flex justify-content-center gap-2 pb-3">
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: data.id,
                            title: data.name,
                            price: data.price,
                            image: data.image,
                            qty: 1,
                          })
                        );
                        alert(`${data.name} added to cart!`);
                        navigate("/cart");
                      }}
                      className="btn btn-custom btn-sm px-3"
                    >
                      Add To Cart
                    </button>

                    <Link
                      to={`/shop/${data.id}`}
                      className="btn btn-custom btn-sm px-3"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center text-muted">No Products Found</h5>
          )}
        </div>
      </div>

      <style>
        {`
        .product-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 380px;
          background: #fff;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }

        .product-card img {
          height: 180px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover img {
          transform: scale(1.05);
        }

        .btn-custom {
          background: linear-gradient(135deg, #f4a261, #e76f51);
          border: none;
          color: #fff;
          border-radius: 20px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-custom:hover {
          background: linear-gradient(135deg, #e76f51, #d84315);
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(231,111,81,0.3);
        }

        .card-footer {
          background-color: #f8f9fa;
        }

        @media (max-width: 576px) {
          .product-card {
            height: auto;
          }
          .card-footer {
            flex-direction: column;
          }
          .card-footer .btn {
            width: 100%;
          }
        }
        `}
      </style>
    </>
  );
};

export default Shop;
