import React from "react";
import AdminLayout from "@/components/admin-layout";
import useFetchData from "@/hooks/use-fetch-data";
import AddImageSheet from "@/components/modules/add-image-sheet";
import { ConfirmImageDelete } from "@/components/modules/delete-image-confirm";

const AdminImageGallery = () => {
  const { data, isLoading, refetch } = useFetchData("/images");

  return (
    <AdminLayout>
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Image Gallery</h2>

        <AddImageSheet onUploadSuccess={refetch} />
      </header>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {isLoading && <div className="flex justify-center">Loading...</div>}
        {data?.images?.map((image) => (
          <div
            key={image._id}
            className="group relative bg-[white] shadow hover:shadow-lg"
          >
            <div className="group aspect-square w-full overflow-hidden rounded-t-md border-2">
              <img
                src={image.imgurUrl}
                alt={image.altText}
                className="h-full w-full object-cover duration-200 group-hover:scale-110"
              />
            </div>

            <div className="p-4">
              <ul>
                <li> Alt Text: {image?.altText}</li>
                <li> Tags: {image?.tags?.join(",")}</li>
                <li> Album: {image?.al?.join(",")}</li>
              </ul>
            </div>

            {/* delete dialog */}

            <ConfirmImageDelete
              className={
                "absolute right-3 top-3 opacity-0 hover:!opacity-100 group-hover:opacity-50"
              }
              imageId={image?._id}
              onDeleteSuccess={refetch}
            />
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminImageGallery;
