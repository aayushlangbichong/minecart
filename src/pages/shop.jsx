import Layout from "../components/layout";
import Product from "../components/product";
import { all_products } from "../data/products";

const Shop = (product) => {
  return (
    <Layout>
      <section className="container mx-auto my-20 flex justify-center gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {all_products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
