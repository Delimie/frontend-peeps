import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[#F2EBBF] ">
      <div className="w-[450px] mx-auto">
        <form
          onSubmit={handleSubmit()}
          className="bg-white rounded-3xl shadow-xl px-16 py-8 flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold tracking-wide mb-4 text-center">
            Create Account
          </h1>

          <FormInput
            label="USERNAME"
            name="username"
            placeholder="Enter your username"
            register={register}
            error={errors.username?.message}
          />

          <FormInput
            label="EMAIL"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message}
          />

          <FormInput
            label="PASSWORD"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
          />

          <FormInput
            label="CONFIRM PASSWORD"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword?.message}
          />

          <FormInput
            label="PHONE"
            name="phone"
            placeholder="Enter your phone"
            register={register}
            error={errors.phone?.message}
          />

          <button className="bg-[#8CBEB2] w-40 ml-20 px-2 py-2 mt-4 rounded-2xl font-semibold cursor-pointer hover:bg-[#5ea192] hover:scale-102 duration-120 shadow-gray-300 shadow-[4px_4px_0px]">
            Create Account
          </button>
          <div className="mt-3 text-center text-[#258178] text-sm">
            {/* Already have account? */}
            <Link
              to="/login"
              className="text-[#8ca317] ml-2 font-semibold hover:text-[#2dc1b7] underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
