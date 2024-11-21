import useFetchData from "@/hooks/use-fetch-data";
import QueryString from "qs";
import React from "react";
import Product from "@/components/product";
const RecommendedProducts = ({ productId, tags }) => {
  const query = QueryString.stringify({ excludeIds: [productId], tags });
  const { data, isLoading } = useFetchData(
    "/products/by-tags?limit=5&" + query,
  );

  if (data?.totalProducts < 1) return <></>;
  return (
    <section>
      <h3 className="text-2xl font-bold">Recommended products</h3>

      <div className="mt-10 grid grid-cols-4 gap-8">
        {data?.products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
