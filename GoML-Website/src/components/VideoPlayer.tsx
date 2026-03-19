import { memo, useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoSrc?: string;
}

const VideoPlayer = memo(({ videoSrc = "/videos/luminance_11_4k.mp4" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={`${import.meta.env.BASE_URL}${videoSrc.startsWith('/') ? videoSrc.slice(1) : videoSrc}`}
      />
      <div className="absolute inset-0 bg-background/10" />
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
