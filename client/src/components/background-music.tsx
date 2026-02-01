import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const playlist = [
  { src: "/audio/song1.mp3", title: "53 Thieves - dreamin'" },
  { src: "/audio/song2.mp3", title: "53 Thieves - what you do to me" },
];

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnded = useCallback(() => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  }, [currentTrack]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0.3;
    
    const handleCanPlayThrough = () => {
      setHasAudio(true);
      if (!autoplayAttempted) {
        setAutoplayAttempted(true);
        audio.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };
    
    const handleError = () => {
      setHasAudio(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    
    audio.src = playlist[currentTrack].src;
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [currentTrack, handleEnded, autoplayAttempted]);

  useEffect(() => {
    if (audioRef.current && hasAudio) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setHasAudio(false);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, hasAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (hasAudio) {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!hasAudio) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {isExpanded && isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
                <Music className="w-3 h-3 text-[#8EB69B] flex-shrink-0" />
                <div className="overflow-hidden whitespace-nowrap">
                  <motion.div
                    animate={{ x: [0, -100, 0] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-xs text-[#8EB69B] font-medium"
                  >
                    Now Playing: {playlist[currentTrack].title}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 glass-card rounded-full p-1">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-testid="button-play-pause"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            data-testid="button-mute-toggle"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
