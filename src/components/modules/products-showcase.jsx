import useFetchData from "@/hooks/use-fetch-data";
import QueryString from "qs";
import React from "react";
import Product from "@/components/product";

const categoryMap = {
  gaming: "6733a43401b4dd504b425d61",
  cosmetics: "6733a4d61aa216310b305f36",
  groceries: "6739733f8363c462ba2fabee",
};

const ProductsShowCase = ({ category, heading }) => {
  const catId = categoryMap[category];

  if (!catId) throw Error("Category not found");

  const query = QueryString.stringify({ category: catId, limit: 4 });

  const { data, isLoading } = useFetchData("/products?" + query);

  return (
    <section>
      <h3 className="text-2xl font-bold">{heading}</h3>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {data?.products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsShowCase;
