import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../components/avatar";
import { EditIcon } from "../../assets/icon";
import useAuthStore from "../../stores/authStore";
import { toast } from "react-toastify";
import { updateUserApi } from "../../api/usersApi";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import SettingSidebar from "../../components/SettingSidebar";
import { FaCameraIcon } from "../../components/icon";

function Profile() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const getProfile = useAuthStore((state) => state.getUserProfile);
  const token = useAuthStore((state) => state.token);
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  if (!user) return <div>Loading...</div>;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) reset(user);
  }, [user, openModal, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (qrCode) {
        formData.append("qrCode", qrCode);
      }

      await updateUserApi(user.id, formData, token);
      await getProfile();
      toast.success("Your profile has been updated");
      setOpenModal(false);
      setProfileImage(null);
      setProfileImagePreview(null);
      setQrCode(null);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  const handleSaveProfileImage = async () => {
    if (!profileImage) return;
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      await updateUserApi(user.id, formData, token);
      await getProfile();
      toast.success("Profile image updated");
      setProfileImage(null);
      setProfileImagePreview(null);
    } catch (error) {
      toast.error("Failed to update profile image");
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const res = await updateUserApi(user.id, data, token);
  //     await getProfile();
  //     toast.success("Your profile has updated");
  //     setOpenModal(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Please try again");
  //   }
  // };

  return (
    <div>
      <SettingSidebar />
      <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans">
        <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
          <p className="font-bold text-3xl">Profile</p>

          <div className="greybox flex flex-row bg-[#EFEFEF] rounded-2xl w-full p-8 gap-20">
            {/* Avatar */}
            {/* <div className="flex items-start justify-center w-1/3">
              <Avatar size={150} />
            </div> */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative group w-[150px] h-[150px] cursor-pointer"
            >
              <Avatar
                avatar={true}
                size={150}
                previewUrl={profileImagePreview}
                onFileChange={handleProfileImageChange}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                className="hidden"
              />
              <div className="rounded-full absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold">
                <FaCameraIcon className="w-16 h-16" />
              </div>
              {profileImage && (
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 cursor-pointer bg-[#F3B562] rounded-2xl hover:scale-105 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveProfileImage();
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#F06060] cursor-pointer rounded-2xl hover:scale-105 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileImage(null);
                      setProfileImagePreview(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="textInfo w-2/3 flex flex-col gap-4">
              <div>
                <p className="font-bold">Name :</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="font-bold">Email :</p>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-10.5">
                <div>
                  <p className="font-bold">Phone No. :</p>
                  <p>{user.mobile}</p>
                </div>
                <div>
                  <p className="font-bold">Birthdate :</p>
                  <p>{user.birthDate.slice(0, 10)}</p>
                </div>
              </div>
              <div className="flex gap-18">
                <div>
                  <p className="font-bold">Gender :</p>
                  <p>{user.gender}</p>
                </div>
                <div>
                  <p className="font-bold">Occupation :</p>
                  <p>{user.occupation}</p>
                </div>
              </div>
              <div>
                <p className="font-bold">Address :</p>
                <p>{user.address}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex hover:cursor-pointer transition hover:scale-105 py-2 px-5 rounded-2xl bg-[#F3B761] gap-2 items-center justify-center"
          >
            <EditIcon />
            Edit Profile
          </button>
          {openModal && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
              onMouseDown={handleBackdropClick}
            >
              <div
                ref={modalRef}
                className="bg-white rounded-2xl p-8 min-w-[320px] shadow-lg relative"
                onMouseDown={(e) => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกข้างใน
              >
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setOpenModal(false)}
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormInput
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="Email"
                  />
                  <FormInput
                    label="Mobile"
                    name="mobile"
                    register={register}
                    error={errors.mobile?.message}
                    placeholder="Mobile"
                  />
                  <FormInput
                    label="Birthdate"
                    name="birthDate"
                    type="date"
                    register={register}
                    error={errors.birthDate?.message}
                    // ถ้า birthDate มี T ใส่ defaultValue={user.birthDate.slice(0, 10)} ได้เช่นกัน
                  />
                  <FormInput
                    label="Gender"
                    as="select"
                    name="gender"
                    register={register}
                    error={errors.gender?.message}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </FormInput>
                  <FormInput
                    label="Occupation"
                    as="select"
                    name="occupation"
                    register={register}
                    error={errors.occupation?.message}
                  >
                    <option value="">Select occupation</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </FormInput>
                  <FormInput
                    label="Address"
                    name="address"
                    register={register}
                    error={errors.address?.message}
                    placeholder="Address"
                  />
                  <FormInput
                    label="Upload QR Code"
                    name="qrCode"
                    type="file"
                    accept="image/*"
                    register={register}
                    error={errors.qrCode?.message}
                    onChange={(e) => setQrCode(e.target.files[0])}
                  />
                  <button
                    type="submit"
                    className="bg-[#F3B761] mt-4 px-4 py-2 rounded-2xl hover:scale-105 transition"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
