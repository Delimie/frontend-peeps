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
        className="mb-1 rounded-lg px-3 py-2 bg-[#F3B761] placeholder:text-[#786531] text-[#246980] font-medium border border-[#bee8b0] focus:outline-none focus:border-[#2dc1b7]"
        {...register(name)}
        {...props}
      />
      {error && <span className="text-red-400 text-xs -mt-2">{error}</span>}
    </>
  );
}
