import React from "react";
import Button, { ButtonLink } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ROUTES from "../constants/routes";

function Product({ product, onAddToCart }) {
  return (
    <div className="border-aayush-50 group overflow-hidden rounded-md border shadow-orange-600 hover:shadow-md">
      <img
        src={product.thumbnail || "/images/fallback-thumbnail.jpg"}
        alt={product.name}
        className="aspect-video object-cover duration-200 group-hover:scale-110"
      />

      <div className="p-4">
        <h2 className="font-bold">{product.name}</h2>
        <p>{product.price ? `${product.price}` : "Contact for Price"}</p>
        <div className="mt-2 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => onAddToCart(product)}>
            <Icon className="size-6" icon={"ic:baseline-plus"} />
            Add
          </Button>
          <ButtonLink to={`${ROUTES.SHOP}/${product.id}`} variant="primary">
            <Icon className="size-6" icon={"hugeicons:view"} />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default Product;
