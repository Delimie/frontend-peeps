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
        <label className="text-[#258178] font-semibold text-md">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="mb-1 rounded-lg px-4 py-2 bg-[#e7faf7] placeholder:text-[#98d4cc] text-[#246980] font-medium border border-[#bee8b0] focus:outline-none focus:border-[#2dc1b7]"
        {...register(name)}
        {...props}
      />
      {error && <span className="text-red-400 text-xs -mt-2">{error}</span>}
    </>
  );
}
