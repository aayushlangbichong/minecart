import React from "react";
import AdminLayout from "../components/admin-layout";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

const AdminEditProduct = () => {
  return (
    <AdminLayout>
      <div>
        <form className="w-56 justify-center">
          <Input label={"Title"} type={"text"} />
          <Input label={"Description"} type={"textarea"} />
          <Input label={"Price"} type={"number"} />
          <Input label={"Category"} type={"text"} />
          <Button className="mx-12 mt-4" type="submit">
            Edit product
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminEditProduct;
