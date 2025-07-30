export default function FormInput({
  label,
  as = "input",
  type = "text",
  placeholder,
  error,
  register,
  name,
  children,
  ...props
}) {
  const inputId = `input-${name}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="font-semibold text-md">
          {label}
        </label>
      )}

      {as === "select" ? (
        <select
          id={inputId}
          className="mb-1 rounded-lg px-3 py-2 bg-[#F3B761] text-[#246980] font-medium border border-[#bee8b0] focus:outline-none focus:border-[#2dc1b7]"
          {...register(name)}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={`mb-1 rounded-lg px-3 py-2 bg-[#F3B761] placeholder:text-[#786531] text-[#246980] font-medium border border-[#bee8b0] focus:outline-none focus:border-[#2dc1b7] 
            ${type === "file" ? "cursor-pointer" : ""
          }`}
          // className="mb-1 rounded-lg px-3 py-2 bg-[#F3B761] placeholder:text-[#786531] text-[#246980] font-medium border border-[#bee8b0] focus:outline-none focus:border-[#2dc1b7]"
          {...register(name)}
          {...props}
          autoComplete="off"
        />
      )}

      {error && <span className="text-red-400 text-xs -mt-2">{error}</span>}
    </div>
  );
}
