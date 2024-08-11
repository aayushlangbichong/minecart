import React from "react";
import Header from "../components/layout/header";
import ProductList from "../components/product-list";
import Footer from "../components/layout/footer";
import Layout from "../components/layout";

function HomePage() {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
}

export default HomePage;
