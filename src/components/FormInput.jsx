export default function FormInput({
  label,
  type = "text",
  placeholder,
  error,
  register,
  name,
  ...props
}) {
  return (
    <>
      {label && (
        <label className="font-semibold text-md">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="mb-1 rounded-lg px-3 py-2 bg-[#F3B761] placeholder:text-[#786531] placeholder:opacity-50 font-medium focus:outline-none shadow-gray-300 shadow-[4px_4px_0px]"
        {...register(name)}
        {...props}
      />
      {error && <span className="text-red-400 text-xs -mt-2">{error}</span>}
    </>
  );
}
