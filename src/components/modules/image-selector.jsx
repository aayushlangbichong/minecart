import Button from "@/components/ui/button";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";

import useFetchData from "@/hooks/use-fetch-data";
import { cn } from "@/lib/cn";

function ImageSelector({ trigger, onImageSelect, selectedImagesIds = [] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="primary">
            <Plus /> Select Image
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[30%]">
        <SheetHeader>
          <SheetTitle>Select Image</SheetTitle>
          <SheetDescription>Browser Image</SheetDescription>
        </SheetHeader>

        <ImageBrowser
          selectedImagesIds={selectedImagesIds}
          onImageSelect={(imageId) => {
            onImageSelect?.(imageId);
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

const ImageBrowser = ({ onImageSelect, selectedImagesIds }) => {
  const { data, isLoading } = useFetchData("/images?limit=50");
  return (
    <div className="grow overflow-y-auto">
      <div className="grid grid-cols-2 gap-6">
        {data?.images?.length === 0 && (
          <div className="flex justify-center">No images found</div>
        )}

        {isLoading && <div className="flex justify-center">Loading...</div>}

        {data?.images?.map((image) => (
          <div key={image._id} className="bg-[white] shadow hover:shadow-lg">
            <div
              className={cn(
                "group aspect-square w-full overflow-hidden rounded-md border-2",
                selectedImagesIds?.includes(image._id)
                  ? "border-orange-600 bg-orange-50"
                  : "border-gray-300",
              )}
              onClick={() =>
                onImageSelect?.({
                  imageId: image._id,
                  imageUrl: image?.imgurUrl,
                })
              }
            >
              <img
                src={image.imgurUrl}
                alt={image.altText}
                className="h-full w-full object-cover duration-200 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
