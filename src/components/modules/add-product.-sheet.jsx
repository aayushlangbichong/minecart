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
import { Image, Plus, Trash } from "lucide-react";
import ImageSelector from "./image-selector";

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
  thumbnail: null,
  thumbnailUrl: null,
  tags: "",
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
        thumbnail: fields?.thumbnail,
        tags: fields?.tags.split(","),
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
      className="mt-8 flex grow flex-col gap-6 overflow-y-auto"
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

      <Input
        label={"Tags"}
        description={"Separate tags by comma eg: pc-build, gaming-pack"}
        type={"text"}
        value={fields.tags}
        onChange={handleFieldChange}
        name="tags"
      />

      <ProductCategoriesSelect
        label={"Categories"}
        values={fields?.categories || []}
        onChange={(newValues) =>
          setFields((pre) => ({
            ...pre,
            categories: newValues,
          }))
        }
      />

      {/* thumbnail selector */}
      <div>
        <div className="mb-1">Thumbnail</div>

        <div className="mb-2 flex gap-6">
          {fields?.thumbnail && fields?.thumbnailUrl ? (
            <img
              src={fields?.thumbnailUrl}
              className="aspect-square w-1/3 rounded-md"
            />
          ) : (
            <div className="flex aspect-square w-1/3 items-center justify-center rounded-md bg-black/10">
              <Image className="size-20 opacity-40" />
            </div>
          )}
        </div>

        <div className="flex gap-6">
          <ImageSelector
            trigger={
              <Button variant="secondary">
                {fields?.thumbnail ? "Change Thumbnail" : "Select Thumbnail"}
              </Button>
            }
            selectedImagesIds={fields?.thumbnail ? [fields.thumbnail] : []}
            onImageSelect={({ imageId, imageUrl }) =>
              setFields((pre) => ({
                ...pre,
                thumbnail: imageId,
                thumbnailUrl: imageUrl,
              }))
            }
          />

          {fields?.thumbnail && (
            <Button
              variant="danger"
              onClick={() => {
                setFields((pre) => ({
                  ...pre,
                  thumbnail: null,
                  thumbnailUrl: null,
                }));
              }}
            >
              <Trash className="size-6" /> Remove
            </Button>
          )}
        </div>
      </div>
      {/* <Input label={"Category"} type={"text"} /> */}
      <Button className="mt-4 justify-center py-2" type="submit">
        Add product
      </Button>
    </form>
  );
};
