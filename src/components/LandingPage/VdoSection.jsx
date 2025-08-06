import { Play } from "lucide-react";

const VideoSection = () => {
  return (

      <div className="container mx-auto px-6 ">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <button className="w-20 h-20 bg-[#F2EBBF]/80 pl-1 rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors">
                <Play className="w-15 h-15 text-background" fill="#8CBEB2" />
              </button>
            </div>
            
          </div>
        </div>
      </div>

  );
};

export default VideoSection;