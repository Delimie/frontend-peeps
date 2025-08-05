import React from "react";
import SettingSidebar from "../../SettingSidebar";
import useAuthStore from "../../../stores/authStore";
import { useForm } from "react-hook-form";

function PassSet() {
  const token = useAuthStore(state => state.token)
  const postUserNewPassword = useAuthStore(state => state.postUserNewPassword)
  const { register, handleSubmit, formState, reset, setValue } = useForm()
  const { isSubmitting, errors } = formState

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const createData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }
      const result = await postUserNewPassword(createData, token)
      // console.log("token =>", token)
      console.log(result)
      alert('change password success')
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-[#F2EBBF]">
        <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="font-bold text-3xl">Password</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="greybox flex flex-col bg-[#EFEFEF] rounded-2xl w-140 p-8 gap-8">

              <div className="grid grid-cols-2 items-center font-semibold">
                <p>Enter Your Password :</p>
                <input type="text" className="bg-[#ffffff] rounded-2xl py-2 px-3" {...register('currentPassword')}></input>
              </div>
              <div className="grid grid-cols-2 items-center font-semibold">
                <p>Enter Your New Password :</p>
                <input type="text" className="bg-[#ffffff] rounded-2xl py-2 px-3" {...register('newPassword')}></input>
              </div>
              <div className="grid grid-cols-2 items-center font-semibold">
                <p>Re-enter Your Password :</p>
                <input type="text" className="bg-[#ffffff] rounded-2xl py-2 px-3"></input>
              </div>
              <div className="flex justify-around">
                <button className="btn bg-[#8CBEB2] shadow-xl/20 w-50 py-2 rounded-2xl border-none" disabled={isSubmitting}>Save</button>
                <button type="button" className="btn bg-[#F3B761] shadow-xl/20 w-50 py-2 rounded-2xl border-none">Cancel</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PassSet;
