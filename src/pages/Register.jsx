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
    mode: "onTouched"
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/1200x/d4/97/50/d49750f776171052bc004c53c36aa90d.jpg')`,
      }}
    >
      <div className="w-[370px] mx-auto">
        <div className="mb-6 text-center">
          <span>LOGO พ่กเราอะ</span>
          <h1 className="text-4xl font-bold text-[#18867e] tracking-wide mb-1">
            Create new account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit()}
          className="bg-white rounded-3xl shadow-xl px-8 py-8 flex flex-col gap-3 border border-[#bee8b0]"
        >
          <FormInput
            label="Username"
            name="username"
            placeholder="Enter your username"
            register={register}
            error={errors.username?.message}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword?.message}
          />
        </form>

        <div className="mt-3 text-center text-[#258178] text-sm">
          มีบัญชีอยู่แล้ว?
          <Link
            to="/login"
            className="text-[#8ca317] ml-2 font-semibold hover:text-[#2dc1b7] underline"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
