import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import getProductById from "../lib/get-product-by-id";
import useFetchData from "@/hooks/use-fetch-data";
import Button from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import useCartActions from "@/hooks/use-add-product-to-cart";
import parse from "html-react-parser";

const ProductDetails = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const productId = params["product-id"];

  const { data, isLoading } = useFetchData(`/products/${productId}`);

  const { addProductToCart } = useCartActions();

  const PARSED_DESCRIPTION = parse(data?.description || "");
  return (
    <Layout>
      <div className="bg-[RGB(239,240,245)]">
        <div className="container mx-auto flex flex-col justify-center gap-6 p-12">
          {/* product genral information */}
          <div className="w-full rounded-md bg-white p-6">
            <div className="font-extrabold">{data?.title}</div>
            <div className="font-semibold">Rs.{data?.price}</div>
            <div className="font-light [text-decoration:line-through]">
              Rs.{data?.discountedPrice}
            </div>
            <div className="flex items-center gap-1">
              Quantity{" "}
              <Button
                onClick={() => {
                  if (quantity <= 1) {
                    return;
                  }
                  setQuantity(quantity - 1);
                }}
                variant="option"
                className="size-8"
              >
                <Minus className="size-5" />
              </Button>
              <input
                value={quantity}
                type="number"
                className="h-8 w-11 border text-center"
                min={1}
              />
              <Button
                variant="option"
                className="size-8"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <Plus className="size-5" />
              </Button>
            </div>
            <div className="mt-8">
              <Button
                onClick={() => {
                  addProductToCart({ productId: data._id, quantity: quantity });
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
          {/* product details */}
          <div className="w-full rounded-md bg-white p-6">
            Product details
            <div className="show-list mt-5 border-t pt-5">
              {PARSED_DESCRIPTION}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
