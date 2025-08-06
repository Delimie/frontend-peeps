import { Play } from "lucide-react";

function Info() {
  return (
    <div className="min-h-[500px] mt-20 relative z-0 w-full">
      <div className="flex">
        <div className="w-1/2 max-w-2xl mx-auto relative bg-card rounded-2xl shadow-lg">
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <button className="w-20 h-20 bg-[#F2EBBF]/80 pl-1 rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors">
              <Play className="w-15 h-15 text-background" fill="#8CBEB2" />
            </button>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="w-4/5 h-[100%] flex flex-col justify-center gap-5">
            <h2 className="text-4xl font-bold">
              Your always-with-you money chat
            </h2>
            <p className="text-xl leading-relaxed">
              Helping you manage group expenses easily and fairly with clear
              summaries, individual shares, and a full transfer history to keep
              everyone on the same page.
            </p>
            <div>
              <button className="bg-[#8CBEB2] py-3 px-4 text-2xl text-white cursor-pointer rounded-4xl">
                Try Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="relative flex justify-center z-1 h-full py-10">
    //   <div>
    //     <div className="flex px-30 items-center justify-center">
    //       {/* Left */}
    //       <div className="container mx-auto px-6 ">
    //         <div className="max-w-2xl">
    //           <div className="relative bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
    //             <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
    //               <button className="w-20 h-20 bg-[#F2EBBF]/80 pl-1 rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors">
    //                 <Play
    //                   className="w-15 h-15 text-background"
    //                   fill="#8CBEB2"
    //                 />
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Right */}
    //       <div className="w-3/5 h-[100%] flex flex-col md:text-left">
    //         <h2 className="text-5xl">Your always-with-you money chat</h2>
    //         <p className="text-2xl leading-relaxed w-4/5 pt-5">
    //           Helping you manage group expenses easily and fairly with clear
    //           summaries, individual shares, and a full transfer history to keep
    //           everyone on the same page.
    //         </p>
    //         <div className="pt-5">
    //           <button className="bg-[#8CBEB2] py-3 px-4 text-2xl text-white cursor-pointer rounded-4xl">
    //             Try Now!
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
export default Info;
