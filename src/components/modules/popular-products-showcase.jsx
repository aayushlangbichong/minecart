import useFetchData from "@/hooks/use-fetch-data";
import QueryString from "qs";
import React from "react";
import Product from "@/components/product";
import { Flame } from "lucide-react";

const categoryMap = {
  gaming: "6733a43401b4dd504b425d61",
  cosmetics: "6733a4d61aa216310b305f36",
  groceries: "6739733f8363c462ba2fabee",
};

const PopularProductsShowCase = () => {
  const { data, isLoading } = useFetchData("/products/most-ordered");

  return (
    <section>
      <h3 className="flex text-2xl font-bold">
        <Flame className="mr-2 size-10 fill-orange-500 text-orange-500" />
        Most Popular Products
      </h3>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {data?.data?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProductsShowCase;
