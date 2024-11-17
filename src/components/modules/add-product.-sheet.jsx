import Button from "@/components/ui/button";

import React from "react";

import Input from "@/components/ui/input";

import { authApi } from "@/lib/api";
import { toast } from "react-toastify";
import Editor from "react-simple-wysiwyg";

import { ProductCategoriesSelect } from "@/components/modules/product-categories-select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";

export function AddProductSheet({ trigger, onAddSuccess }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="primary">
            <Plus /> Add Product
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[30%]">
        <SheetHeader>
          <SheetTitle>Add new Product</SheetTitle>
          <SheetDescription>Adds new product to the inventory</SheetDescription>
        </SheetHeader>
        <AdminAddProductForm
          onAddSuccess={() => {
            onAddSuccess?.();
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

const defaultValues = {
  title: "",
  description: "",
  price: 0,
  discountedPrice: 0,
  categories: [],
};

const AdminAddProductForm = ({ onAddSuccess }) => {
  const [fields, setFields] = React.useState(defaultValues);

  const handleFieldChange = (e) => {
    setFields((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAtProduct(e) {
    e.preventDefault();

    try {
      const response = await authApi.post("/products", {
        title: fields.title,
        description: fields.description,
        price: fields.price,
        category: [],
        discountedPrice: fields.discountedPrice,
        categories: fields?.categories || [],
      });

      if (response) {
        toast.success("Product added successfully.");
        onAddSuccess?.();
      }
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  return (
    <form
      className="mt-8 flex flex-col justify-center gap-6"
      onSubmit={handleAtProduct}
    >
      <Input
        label={"Title"}
        type={"text"}
        name="title"
        value={fields.title}
        onChange={handleFieldChange}
      />

      <div>
        <div className="mb-1">Description</div>
        <Editor
          className="[&_*]:list-inside [&_ol]:list-decimal [&_ul]:list-disc"
          value={fields?.description}
          onChange={(e) =>
            setFields((pre) => ({ ...pre, description: e.target.value }))
          }
        />
      </div>

      <Input
        label={"Price"}
        type={"number"}
        value={fields.price}
        onChange={handleFieldChange}
        name="price"
        min={0}
      />
      <Input
        label={"Discounted Price"}
        type={"number"}
        value={fields.discountedPrice}
        onChange={handleFieldChange}
        name="discountedPrice"
        min={0}
      />

      <ProductCategoriesSelect
        values={fields?.categories || []}
        onChange={(newValues) =>
          setFields((pre) => ({
            ...pre,
            categories: newValues,
          }))
        }
      />
      {/* <Input label={"Category"} type={"text"} /> */}
      <Button className="mt-4 justify-center py-2" type="submit">
        Add product
      </Button>
    </form>
  );
};
