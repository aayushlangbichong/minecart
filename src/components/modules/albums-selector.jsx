import React from "react";
import useFetchData from "@/hooks/use-fetch-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AlbumsSelector = ({ onChange, label, error, value }) => {
  const { data, isLoading } = useFetchData("/albums");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block font-medium text-gray-700">{label}</label>
      )}
      <Select onChange={onChange} value={value}>
        <SelectTrigger disabled={isLoading}>
          <SelectValue placeholder="Select an album" className="capitalize" />
        </SelectTrigger>

        <SelectContent>
          {data?.length === 0 && <div> No albums found</div>}

          {data?.map((album) => (
            <SelectItem
              key={album._id}
              value={album._id}
              className="capitalize"
            >
              {album.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default AlbumsSelector;
