import { useField } from "formik";

interface Iprops {
  label: string;
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}

const FormField = ({ label, ...props }: Iprops) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col py-2">
      <label
        htmlFor={props.id || props.name}
        className="pb-2 text-sm font-bold"
      >
        {label}
      </label>
      <input
        className="mb-1 border rounded-lg px-2 py-1 focus-visible:border-2 focus-visible:outline-none"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-xs text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default FormField;
