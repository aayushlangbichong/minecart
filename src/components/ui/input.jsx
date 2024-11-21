import { cn } from "../../lib/cn";

const Input = ({
  label,
  className,
  type,
  value,
  onChange,
  placeholder,
  error,
  name,
  description,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label className="">{label}</label>
      {description && (
        <div className="mb-1 text-sm text-gray-500">{description}</div>
      )}
      <input
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={cn([
          "rounded-md border px-2 py-1.5",

          error ? "border-red-600" : "border-black",
        ])}
        {...props}
      />

      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default Input;
