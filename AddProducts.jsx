
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../rtk/productReducer/ProductReducer";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    dispatch(addProduct(newProduct))
      .unwrap()
      .then(() => {
        alert("Product added successfully!");
        setFormData({ name: "", price: "", image: "" });
      })
      .catch((err) => {
        alert(" Failed to add product: " + err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3 w-50 shadow p-3 rounded"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
