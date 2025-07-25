import { useState } from "react";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";

export default function Payment() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EBBF]">
      <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-white p-8 flex flex-col gap-4 border border-[#e8e5b0]">
        <h2 className="text-2xl font-extrabold text-center text-[#5C4B51] mb-2">
          Payment
        </h2>
        {success ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <svg
              className="w-16 h-16 text-[#8ca317]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#8ca317"
                strokeWidth="2"
                fill="#f5ffeb"
              />
              <path
                stroke="#8ca317"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12.5l2.5 2.5 5-5"
              />
            </svg>
            <p className="text-xl font-bold text-[#8ca317]">
              Payment successful!
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormInput
              label="Package"
              name="package"
              as="select"
              register={register}
              error={error.package}
            >
              <option value="">Select package</option>
              <option value="standard">Standard ($4.99/mo)</option>
              <option value="premium">Premium ($12.99/mo)</option>
            </FormInput>

            <FormInput
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              error={error.cardNumber}
              register={register}
            />

            <FormInput
              label="Name on Card"
              name="cardName"
              placeholder="John Doe"
              error={error.cardName}
              register={register}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <FormInput
                  label="Expiry Date"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  error={error.expiry}
                  register={register}
                />
              </div>
              <div className="flex-1">
                <FormInput
                  label="CVV"
                  name="cvv"
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  error={error.cvv}
                  register={register}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#8CBEB2] px-4 py-3 rounded-xl font-bold shadow-md text-[#5C4B51] hover:bg-[#8ca317] hover:scale-105 transition-all"
            >
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
