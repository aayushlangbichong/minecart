import useFetchData from "@/hooks/use-fetch-data";
import Layout from "@/components/layout";
import Product from "@/components/product";

const Shop = () => {
  const { data, isLoading } = useFetchData("/products");
  return (
    <Layout>
      <section className="container mx-auto my-20 flex flex-col items-center justify-center gap-6">
        <div className="flex w-full justify-between">
          <h3 className="mb-20 text-2xl font-bold">Shop your dream!</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {data?.products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
