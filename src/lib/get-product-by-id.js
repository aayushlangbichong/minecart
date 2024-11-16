import { all_products } from "../data/products";



const getProductById = (productId) => {

    const product=all_products.find((prod)=>prod.id==productId);
    if (product){
        return product;
    }
    else{
        return null;
    }
   
}
 
export default getProductById;