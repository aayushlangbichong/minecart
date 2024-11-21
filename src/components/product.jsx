import React from "react";
import Button, { ButtonLink } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ROUTES from "../constants/routes";
import useCartActions from "@/hooks/use-add-product-to-cart";
import { formatCurrency } from "@/utils/format-currency";
import { NO_IMAGE_URL } from "@/constants/placeholder";

function Product({ product, onAddToCart }) {
  const hasDiscount = product?.discountedPrice > 0;

  const { addProductToCart } = useCartActions();

  return (
    <div className="border-aayush-50 group overflow-hidden rounded-md border shadow-orange-600 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden border">
        <img
          src={product.thumbnail?.imgurUrl || NO_IMAGE_URL}
          alt={product.name}
          className="absolute inset-0 block h-full w-full object-cover duration-200 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold">{product.title}</h2>
        <div className="flex gap-2">
          <span
            className={
              hasDiscount ? "opacity-50 [text-decoration:line-through]" : ""
            }
          >
            {product.price
              ? `${formatCurrency(product.price)}`
              : "Contact for Price"}
          </span>
          <span>{formatCurrency(product.discountedPrice)}</span>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <ButtonLink to={`${ROUTES.SHOP}/${product._id}`} variant="secondary">
            <Icon className="size-6" icon={"hugeicons:view"} />
          </ButtonLink>
          <Button
            variant="primary"
            onClick={() =>
              addProductToCart({ productId: product._id, quantity: 1 })
            }
          >
            <Icon className="size-6" icon={"ic:baseline-plus"} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
