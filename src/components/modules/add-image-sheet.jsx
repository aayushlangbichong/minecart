import Button from "@/components/ui/button";

import React from "react";

import Input from "@/components/ui/input";

import { authApi } from "@/lib/api";
import { toast } from "react-toastify";
import Editor from "react-simple-wysiwyg";

import { ProductCategoriesSelect } from "@/components/modules/product-categories-select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader, Plus, Upload } from "lucide-react";
import AlbumsSelector from "./albums-selector";

function AddImageSheet({ trigger, onUploadSuccess }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="primary">
            <Plus /> Add Image
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[30%]">
        <SheetHeader>
          <SheetTitle>Add new Image</SheetTitle>
          <SheetDescription>
            Adds new image to the image gallery.
            <br /> Maximum size: 4MB
          </SheetDescription>
        </SheetHeader>

        <AdminAddImageForm
          onUploadSuccess={() => {
            onUploadSuccess?.();

            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

const defaultValues = {
  altText: "",
  //   public album
  albumId: "673a0538df03a2ce3914d60f",
  tags: [],
  image: null,
};

const AdminAddImageForm = ({ onUploadSuccess }) => {
  const inputFileRef = React.useRef(null);
  const [fields, setFields] = React.useState(defaultValues);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFieldChange = (e) => {
    setFields((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  const imagePreviewURL = fields.image
    ? URL.createObjectURL(fields?.image)
    : null;

  const selectedFileName = fields.image?.name;
  //   size :convert to mb from bytes
  const selectedFileSize = fields.image?.size
    ? (fields.image?.size / 1024 / 1024).toFixed(2)
    : "";

  const clearFile = () => {
    setFields((previousValues) => ({
      ...previousValues,
      image: null,
    }));
    inputFileRef.current.value = "";
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (!fields.image) {
      toast.error("Please select an image");
      return;
    }

    if (!fields.altText) {
      toast.error("Please set an image alt text");
      return;
    }

    if (selectedFileSize > 4) {
      toast.error("Image size should be less than 4MB");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("image", fields.image);
      formData.append("altText", fields.altText);
      formData.append("tags", JSON.stringify(fields?.tags || []));
      formData.append("albumId", fields.albumId);

      const response = await authApi.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Image added successfully.");
        onUploadSuccess?.();
      }
    } catch (err) {
      toast.error("Failed to add image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="mt-6 flex flex-col gap-6" onSubmit={handleUploadImage}>
      <input
        type="file"
        name="image"
        multiple={false}
        // accept jpeg,jpg,png
        accept="image/jpeg,image/png,image/jpg"
        onChange={(e) => setFields({ ...fields, image: e.target.files[0] })}
        ref={inputFileRef}
      />

      {imagePreviewURL && (
        <div className="mt-8">
          <h5 className="font-bold">Preview Image</h5>

          <div className="relative flex gap-6">
            <img
              src={imagePreviewURL}
              alt={fields.altText}
              className="aspect-square w-[100px] rounded-md object-cover"
            />
            <div className="mt-5">
              <div> Name: {selectedFileName}</div>
              <div> size: {selectedFileSize} MB</div>

              <Button
                variant="danger"
                onClick={clearFile}
                className="absolute right-2 top-2"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      <Input
        label={"Alt Text"}
        type={"altText"}
        name="altText"
        value={fields.altText}
        onChange={handleFieldChange}
      />

      <Input
        label={"Tags"}
        description={"Separate tags by comma"}
        placeholder={"eg: electronics,mobile,groceries"}
        name="tags"
        value={fields.tags?.toString()}
        onChange={(e) => {
          setFields((pre) => ({ ...pre, tags: e.target.value.split(",") }));
        }}
      />

      <AlbumsSelector
        label={"Album"}
        value={fields?.albumId}
        onChange={(albumId) => setFields((pre) => ({ ...pre, albumId }))}
      />

      <Button type="submit" className="justify-center py-3">
        {isUploading ? (
          <>
            <Loader className="size-6 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="size-6" />
            Upload Image
          </>
        )}
      </Button>
    </form>
  );
};
export default AddImageSheet;
