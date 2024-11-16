import React, { useState } from "react";
import Product from "./product";
import { products } from "../data/products";

function ProductList() {
  // State to store cart items
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Added to cart successfully!"); 
  };

  return (
    <section className="container mx-auto my-20 flex justify-center gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
