import React from "react";
import Product from "./product";

const products = [
  {
    id: 1,
    name: "Apple",
    price: "Rs.80",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Banana",
    price: "Rs.50",
    thumbnail:
      "https://images.unsplash.com/photo-1523667864248-fc55f5bad7e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmFuYXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Pumpkin",
    price: "Rs.30",
    thumbnail:
      "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function ProductList() {
  return (
    <section className="container mx-auto my-20 flex justify-center gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
