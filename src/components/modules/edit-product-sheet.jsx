import Button from "@/components/ui/button";

import React from "react";

import Input from "@/components/ui/input";

import { api, authApi } from "@/lib/api";
import { toast } from "react-toastify";

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
import { Edit, Image, Plus, Trash } from "lucide-react";
import Editor from "react-simple-wysiwyg";
import ImageSelector from "./image-selector";

export function EditProductSheet({ trigger, productId, onEditSuccess }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="secondary">
            <Edit /> Edit
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[30%]">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Updates existing product of the inventory
          </SheetDescription>
        </SheetHeader>
        <AdminEditProductForm
          productId={productId}
          onEditSuccess={() => {
            onEditSuccess?.();
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

const AdminEditProductForm = ({ onEditSuccess, productId }) => {
  const [product, setProduct] = React.useState(null);
  const [fields, setFields] = React.useState(null);

  const handleFieldChange = (e) => {
    setFields((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  // func def: to fetch product detail and set default form values
  const fetchProduct = async () => {
    try {
      const res = await api.get("/products/" + productId);
      if (res) {
        setProduct(res.data);
        setFields({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          discountedPrice: res.data?.discountedPrice || 0,
          category: res?.data?.category?.map(({ _id }) => _id) || [],
          thumbnail: res?.data?.thumbnail?._id,
          thumbnailUrl: res?.data?.thumbnail?.imgurUrl,
          tags: res?.data?.tags?.join(",") || "",
        });
      }
    } catch (e) {
      toast.error("Failed to get product");
    }
  };

  // handle product edit
  const handleProductEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.put("/products/" + productId, {
        title: fields.title,
        description: fields.description,
        price: fields.price,
        discountedPrice: fields.discountedPrice,
        category: fields?.category || [],
        thumbnail: fields?.thumbnail,
        tags: fields?.tags?.split(",") || [],
      });
      if (res) {
        toast.success("Product Edited Successfully");
        onEditSuccess?.();
      }
    } catch (e) {
      toast.error("Failed to edit product");
    }
  };

  // fetch product detail on component mount
  React.useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <form
      className="mt-8 flex grow flex-col gap-6 overflow-y-auto"
      onSubmit={handleProductEdit}
    >
      <Input
        label={"Title"}
        type={"text"}
        name="title"
        value={fields?.title}
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
        value={fields?.price}
        onChange={handleFieldChange}
        name="price"
        min={0}
      />
      <Input
        label={"Discounted Price"}
        type={"number"}
        value={fields?.discountedPrice}
        onChange={handleFieldChange}
        name="discountedPrice"
        min={0}
      />

      <Input
        label={"Tags"}
        description={"Separate tags by comma eg: pc-build, gaming-pack"}
        type={"text"}
        value={fields?.tags}
        onChange={handleFieldChange}
        name="tags"
      />

      <ProductCategoriesSelect
        label={"Categories"}
        values={fields?.category || []}
        onChange={(newValues) =>
          setFields((pre) => ({
            ...pre,
            category: newValues,
          }))
        }
      />

      {/* thumbnail selector */}
      <div>
        <div className="mb-1">Thumbnail</div>

        <div className="mb-2 flex gap-6">
          {fields?.thumbnailUrl ? (
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
        Update product
      </Button>
    </form>
  );
};
