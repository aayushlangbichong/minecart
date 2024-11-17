import * as React from "react";
import Select from "react-select";

import useFetchData from "../../hooks/use-fetch-data";
import { cn } from "@/lib/cn";

export function ProductCategoriesSelect(props) {
  const { data, isLoading } = useFetchData("/categories/get-all");

  const categoriesOptions = React.useMemo(() => {
    if (data)
      return data?.map((cat) => ({
        value: cat._id,
        label: cat.name,
      }));
    else return [];
  }, [data]);

  const currentValues = React.useMemo(() => {
    if (categoriesOptions)
      return categoriesOptions?.filter(({ value }) =>
        props.values?.includes(value),
      );
    else return [];
  }, [categoriesOptions, props?.values]);

  return (
    <div>
      {props?.label && <div className="mb-1">{props?.label}</div>}

      <Select
        isMulti
        isLoading={isLoading}
        name="colors"
        options={categoriesOptions}
        onChange={(newValues) =>
          props?.onChange(newValues?.map(({ value }) => value))
        }
        value={currentValues}
      />

      {props?.error && (
        <div className="mb-t text-sm text-red-600">{props?.error}</div>
      )}
    </div>
  );
}
