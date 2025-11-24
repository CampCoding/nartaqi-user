// components/FormField.jsx
export const FormField = ({ id, label, as = "input", ...props }) => {
  const InputComponent = as; // 'input' or 'textarea'

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <label htmlFor={id} className="font-semibold text-text">
        {label}
      </label>
      <div className="w-full">
        <InputComponent
          id={id}
          className={`w-full rounded-lg border border-solid border-zinc-200 bg-white p-4 text-sm text-text placeholder:text-text-alt focus:border-secondary focus:ring-1 focus:ring-secondary [direction:rtl] ${
            as === "textarea" ? "h-32 resize-none" : ""
          }`}
          required
          aria-required="true"
          {...props}
        />
      </div>
    </div>
  );
};

// components/CustomSelect.jsx
