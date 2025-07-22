import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";
//branch Ploy

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[#F2EBBF]">
      <div className="w-[370px] mx-auto">
        <div className="mb-6 text-center">
          <span className="text-4xl">LOGO พวกเราอะ</span>
          <h2 className="text-xl mt-2 font-semibold text-[#2dc1b7]">
            เทสจ้าาาาาาา อยากใส่ไรก็ใส่
          </h2>

          <h1 className="text-4xl font-bold text-[#55a149] tracking-wide mb-1">
            SIGN IN

          </h1>
        </div>

        <form className="bg-white rounded-3xl shadow-xl px-8 py-8 flex flex-col gap-2 border border-[#e8e5b0]">
          <FormInput
            label="Email or Phone"
            placeholder="Enter your email or phone"
            error={errors.username?.message}
            register={register}
            name="username"
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            register={register}
            name="password"
          />

          <button className="bg-amber-100 px-2 py-2 rounded-lg font-bold cursor-pointer mt-2">
            LOGIN
          </button>
        </form>

        <div className="mt-3 text-center text-[#258178] text-sm">
          ยังไม่มีบัญชี?
          <Link
            to="/register"
            className="text-[#8ca317] ml-2 font-semibold hover:text-[#2dc1b7] underline"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
