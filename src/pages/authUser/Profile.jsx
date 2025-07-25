import React, { useEffect } from "react";
import Avatar from "../../components/avatar";
import { EditIcon } from "../../assets/icon";
import useAuthStore from "../../stores/authStore";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const getProfile = useAuthStore((state) => state.getUserProfile);

  console.log(user);

  useEffect(() => {
    getProfile(3);
  }, []);

  return (
    <div className="flex flex-col items-center h-screen text-xl mt-30 font-sans bg-white">
      <div className="whitebox flex flex-col gap-6 justify-center items-center py-10 px-8 bg-[#FFFCFC] rounded-2xl shadow-md w-[800px]">
        <p className="font-bold text-3xl">Profile</p>

        <div className="greybox flex flex-row bg-[#EFEFEF] rounded-2xl w-full p-8 gap-8">
          {/* Avatar */}
          <div className="flex items-start justify-center w-1/3">
            <Avatar />
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
            <div className="flex gap-10">
              <div>
                <p className="font-bold">Phone Num. :</p>
                <p>{user.mobile}</p>
              </div>
              <div>
                <p className="font-bold">Birthdate :</p>
                <p>{user.birthDate.slice(0, 10)}</p>
              </div>
            </div>
            <div className="flex gap-10">
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

        {/* Button */}
        <button
          type="button"
          className="flex hover:cursor-pointer transition hover:scale-105 py-2 px-5 rounded-2xl bg-[#F3B761] gap-2 items-center justify-center"
        >
          <EditIcon />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
