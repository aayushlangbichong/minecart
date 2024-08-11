import React from "react";
import Button from "./ui/button";

function Product({ product }) {
  return (
    <div className="border-aayush-50 group overflow-hidden rounded-md border shadow-orange-600 hover:shadow-md">
      <img
        src={product.thumbnail}
        className="aspect-video object-cover duration-200 group-hover:scale-110"
      />

      <div className="p-4">
        <h2 className="font-bold">{product.name}</h2>
        <p>{product.price}</p>
        <Button variant="secondary">+Add</Button>
      </div>
    </div>
  );
}

export default Product;
