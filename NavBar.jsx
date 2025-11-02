import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import "./nav.css";

function NavBar({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
      } else {
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, products]);

  return (
    <>
      <div className="navbar" style={{ position: "relative" }}>
        <div className="logo">DreamClick</div>

        <Link to="/shop">Shop</Link>

        <div className="search-container" style={{ position: "relative" }}>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />

          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderTop: "none",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              {suggestions.map((prod) => (
                <li
                  key={prod.id}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => {
                    setSearchTerm(prod.name);
                    setSuggestions([]);
                  }}
                >
                  {prod.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/cart">
          Cart
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Link>
        <Link to="/add-products">Add Products</Link>
        <hr />
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
