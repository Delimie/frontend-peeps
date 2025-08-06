import React from "react";
import Chat from "../assets/Chat.jpg";
import Group from "../assets/Group.jpg";

function About() {
  return (
    <div className="flex flex-col mt-20 justify-center items-center">
      <div className="flex flex-row gap-30 py-10 mt-10">
        <h1 className="flex flex-col text-3xl">
          <p>So how did</p>
          <div className="flex flex-row">
            <p className="text-[#EF6060]">P</p>
            <p className="text-[#F3B761]">E</p>
            <p className="text-[#8ABEB2]">E</p>
            <p className="text-[#EF6060]">PS!</p>
          </div>

          <p>come to be?</p>
        </h1>
        <p className="flex w-120 items-center">
          Well for us, it happened somewhere in between collaborating and
          communicating, engaging, and scaling rapidly. All while being totally
          transparent and working the way we want.
        </p>
      </div>
      <div className="flex flex-row gap-30 items-center py-10">
        <img src={Chat} className="w-180" />
        <div className="flex flex-col">
          <h1 className="text-3xl">Chat it out,</h1>
          <h1 className="text-3xl">no bill doubt!</h1>
        </div>
      </div>
      <div className="flex flex-row justify-around py-10">
        <p className="w-120 items-center flex">
          As we integrated and automated, built workflows, created templates,
          and expanded our community beyond our wildest expectations, we
          continued to grow. It is through this journey that the PEEPS! was
          born.
        </p>
        <img src={Group} className="w-60 h-fit rounded-2xl" />
      </div>
    </div>
  );
}

export default About;
