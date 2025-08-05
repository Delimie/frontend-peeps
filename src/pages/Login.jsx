import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validators/validator";
import { toast } from "react-toastify";
import { LogoAnimation } from "../components/Animation";
import useAuthStore from "../stores/authStore";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onSubmit" });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      toast.success("Welcome back!!");
      console.log(res)
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EBBF]">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center mb-5">
          <LogoAnimation/>
        </div>

        <div className="w-[380px] mx-auto">
          <form
            className="bg-white/80 rounded-3xl shadow-2xl px-8 py-8 flex flex-col gap-3 border border-[#e8e5b0] backdrop-blur-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              label="Email or Phone"
              placeholder="Enter your email or phone"
              error={errors.identity?.message}
              register={register}
              name="identity"
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              register={register}
              name="password"
              autoComplete="off"
            />
            <button
              className="bg-[#8CBEB2] cursor-pointer text-[#ffffff] px-4 py-3 rounded-xl font-bold mt-2 shadow-md hover:scale-105 hover:bg-[#ada069] transition-all duration-200"
              type="submit"
            >
              LOG IN
            </button>
          </form>
          <div className="mt-5 text-center text-[#258178] text-base">
            Don't have account?
            <Link
              to="/register"
              className="text-[#8ca317] ml-2 font-semibold hover:text-[#2dc1b7] underline underline-offset-4 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
