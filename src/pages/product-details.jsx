import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import getProductById from "../lib/get-product-by-id";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [notFound, setNotFound] = useState(null);
  const params = useParams();

  const productId = params["product-id"];

  useEffect(() => {
    const prod = getProductById(productId);
    if (prod) {
      setProduct(prod);
    } else {
      setNotFound(true);
    }
  }, [productId]);

  return (
    <Layout>
      {notFound == true ? (
        <div className="w-fit">
          <img src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg" />
        </div>
      ) : (
        <div>
          <div>{product?.name}</div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
