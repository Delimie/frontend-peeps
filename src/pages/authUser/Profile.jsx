import React from "react";
import Avatar from "../../components/avatar";
import { EditIcon, ProfilePic } from "../../assets/icon";

function Profile() {
  return (
    <div className="flex flex-col items-center h-full text-xl font-sans">
      <div className="whitebox flex flex-col justify-center items-center my-30 w-200 h-200 bg-[#FFFCFC] rounded-2xl">
        <p className="font-bold text-3xl">Profile</p>
        <div className="greybox rounded-2xl bg-[#EFEFEF] h-140 w-170 flex my-10">
          <div className="flex mx-auto pb-80">
            <ProfilePic />
          </div>
          <div className="textInfo w-100 flex flex-col pt-15 gap-4">
            <div>
              <p className="font-bold">Name :</p>
              <p>Andy</p>
            </div>
            <div>
              <p className="font-bold">Email :</p>
              <p>andy@mail.com</p>
            </div>

            <div className="flex gap-15">
              <div>
                <p className="font-bold">Phone Number :</p>
                <p>0123456789</p>
              </div>
              <div>
                <p className="font-bold">Birthdate :</p>
                <p>10/10/2010</p>
              </div>
            </div>

            <div className="flex gap-34">
              <div>
                <p className="font-bold">Gender :</p>
                <p>Male</p>
              </div>
              <div>
                <p className="font-bold">Occupation :</p>
                <p>Engineer</p>
              </div>
            </div>

            <div>
              <p className="font-bold">Address :</p>
              <p className="Address">123 Abcdefg St., Bangkok,</p>
              <div className="flex gap-3">
                <p className="Country">Thailand</p>
                <p className="Zip">10001</p>
              </div>
            </div>
            <br />
            <button
              type="btn"
              className="flex hover:cursor-pointer transition hover:scale-105 py-2 w-50 rounded-2xl bg-[#F3B761] gap-5 items-center justify-center"
            >
              <EditIcon />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
