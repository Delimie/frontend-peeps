import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validators/validator";
import { registerApi } from "../api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const [step, setStep] = useState(1);

  const handleNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(["name", "email", "password", "confirmPassword"]);
    }
    if (valid) setStep(step + 1);
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await registerApi(data);
      console.log(res);
      toast.success("Register successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[#F2EBBF] ">
      <div className="w-[450px] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl  shadow-xl px-16 py-8 flex flex-col gap-2"
        >
          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold tracking-wide mb-4 text-center">
                Create Account
              </h1>

              <FormInput
                label="USERNAME"
                name="name"
                placeholder="Enter your username"
                register={register}
                error={errors.name?.message}
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

              <button
                className="bg-[#8CBEB2] px-2 py-2 mt-4 rounded-lg font-semibold cursor-pointer hover:bg-[#5ea192] hover:scale-102 duration-120"
                onClick={handleNext}
              >
                NEXT
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <FormInput
                label="PHONE"
                name="mobile"
                placeholder="Enter your phone"
                register={register}
                error={errors.mobile?.message}
              />
              <FormInput
                label="ADDRESS"
                name="address"
                type="text"
                placeholder="Enter your address"
                register={register}
                error={errors.address?.message}
              />

              <FormInput
                label="DATE OF BIRTH"
                name="birthDate"
                type="date"
                placeholder="Enter your birthday"
                register={register}
                error={errors.birthDate?.message}
              />

              <FormInput
                label="GENDER"
                name="gender"
                as="select"
                register={register}
                error={errors.gender?.message}
              >
                <option value="">Select gender</option>
                <option value="men">Male</option>
                <option value="women">Female</option>
                <option value="others">Other</option>
              </FormInput>

              <FormInput
                label="OCCUPATION"
                name="occupation"
                as="select"
                register={register}
                error={errors.occupation?.message}
              >
                <option value="">Select your occupation</option>
                <option value="Accountant">Accountant</option>
                <option value="Actor/Actress">Actor/Actress</option>
                <option value="Architect">Architect</option>
                <option value="Businessman/Businesswoman">
                  Businessman/Businesswoman
                </option>
                <option value="Designer">Designer</option>
                <option value="Driver">Driver</option>
                <option value="Doctor/Nurse">Doctor/Nurse</option>
                <option value="Employee">Employee</option>
                <option value="Engineer">Engineer</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Journalist">Journalist</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Musician">Musician</option>
                <option value="Pilot">Pilot</option>
                <option value="Police">Police</option>
                <option value="Programmer">Programmer</option>
                <option value="Salesperson">Salesperson</option>
                <option value="Scientist">Scientist</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Singer">Singer</option>
                <option value="Teacher/Professor">Teacher/Professor</option>
                <option value="Other">Other</option>
              </FormInput>

              <button className="bg-[#8CBEB2] px-2 py-2 mt-4 rounded-lg font-semibold cursor-pointer hover:bg-[#5ea192] hover:scale-102 duration-120">
                Create Account
              </button>
            </>
          )}

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
