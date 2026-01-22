"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Pause, RotateCcw, RotateCw } from "lucide-react";
import cx from "../../lib/cx";
import { useSearchParams } from "next/navigation";

const PlayerType = {
  VIMEO: "vimeo",
  YOUTUBE: "youtube",
};

// ==================== DECODING HELPERS ====================
const decodeId = (encodedValue) => {
  if (!encodedValue) return null;
  try {
    return atob(decodeURIComponent(encodedValue));
  } catch (e) {
    console.error("Decoding error:", e);
    // Return as-is if decoding fails (might be plain text)
    return encodedValue;
  }
};

const extractVimeoId = (value) => {
  if (!value) return null;
  // Direct ID (just numbers)
  if (/^\d+$/.test(value)) return value;
  // URL format: https://vimeo.com/123456789 or https://player.vimeo.com/video/123456789
  const match = value.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const extractYoutubeId = (value) => {
  if (!value) return null;
  // Direct ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  // URL formats
  const match = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// Platform Icons
const VimeoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function VideoPlayer({
  rootClassName = "",
  defaultPlay = false,
  videoData = null,
  vimeo_id, // ✅ new
  youtube_id, // ✅ new
}) {
  const searchParams = useSearchParams();

  // Get encoded params
  // ✅ يسمح بالمصدر من الـ props أو من query
  const encodedVimeoId =
    vimeo_id || videoData?.vimeo_id || searchParams.get("vimeo_id");
  const encodedYoutubeId =
    youtube_id || videoData?.youtube_id || searchParams.get("youtube_id");

  // Decode and extract final IDs
  const { vimeoId, youtubeId } = useMemo(() => {
    let finalVimeoId = null;
    let finalYoutubeId = null;

    // Decode Vimeo
    if (encodedVimeoId) {
      const decoded = decodeId(encodedVimeoId);
      // Try to extract ID from decoded value (could be URL or ID)
      finalVimeoId = extractVimeoId(decoded) || decoded;
      // Validate it's a number for Vimeo
      if (finalVimeoId && !/^\d+$/.test(finalVimeoId)) {
        // If not a pure number, try to extract again
        const extracted = extractVimeoId(finalVimeoId);
        if (extracted) finalVimeoId = extracted;
      }
    }

    // Decode YouTube
    if (encodedYoutubeId) {
      const decoded = decodeId(encodedYoutubeId);
      // Try to extract ID from decoded value (could be URL or ID)
      finalYoutubeId = extractYoutubeId(decoded) || decoded;
    }

    return { vimeoId: finalVimeoId, youtubeId: finalYoutubeId };
  }, [encodedVimeoId, encodedYoutubeId]);

  // Determine initial platform
  const getInitialPlatform = () => {
    if (vimeoId && youtubeId) return PlayerType.VIMEO;
    if (vimeoId) return PlayerType.VIMEO;
    if (youtubeId) return PlayerType.YOUTUBE;
    return null;
  };

  // State
  const [activePlatform, setActivePlatform] = useState(getInitialPlatform());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Refs
  const containerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const timeUpdateIntervalRef = useRef(null);

  // iOS detection
  const isIOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream;

  const [iosRotateHack, setIosRotateHack] = useState(false);

  // Check platform availability
  const hasBothPlatforms = vimeoId && youtubeId;
  const hasVimeo = !!vimeoId;
  const hasYouTube = !!youtubeId;

  // Get current video ID
  const getCurrentVideoId = useCallback(() => {
    if (activePlatform === PlayerType.VIMEO) return vimeoId;
    if (activePlatform === PlayerType.YOUTUBE) return youtubeId;
    return null;
  }, [activePlatform, vimeoId, youtubeId]);

  const videoId = getCurrentVideoId();

  // Format time helper
  const formatTime = (seconds) => {
    const s = Math.max(0, Number(seconds) || 0);
  
    const hours = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = Math.floor(s % 60);
  
    return `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  // Reset player state
  const resetPlayerState = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsReady(false);
    setIsLoading(true);
    setPlaybackRate(1);

    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
    if (vimeoPlayerRef.current) {
      try {
        vimeoPlayerRef.current.destroy();
      } catch (e) {}
      vimeoPlayerRef.current = null;
    }
    if (youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current.destroy();
      } catch (e) {}
      youtubePlayerRef.current = null;
    }
  }, []);

  // Handle platform switch
  const handlePlatformSwitch = useCallback(
    (platform) => {
      if (platform === activePlatform) return;
      resetPlayerState();
      setActivePlatform(platform);
    },
    [activePlatform, resetPlayerState]
  );

  // Update platform when IDs change
  useEffect(() => {
    setActivePlatform(getInitialPlatform());
  }, [vimeoId, youtubeId]);

  // ==================== VIMEO PLAYER ====================
  useEffect(() => {
    if (activePlatform !== PlayerType.VIMEO || !vimeoId) return;

    const initVimeoPlayer = async () => {
      try {
        setIsLoading(true);
        const Player = (await import("@vimeo/player")).default;

        if (playerContainerRef.current) {
          playerContainerRef.current.innerHTML =
            '<div id="vimeo-player"></div>';
        }

        const playerElement = document.getElementById("vimeo-player");
        if (!playerElement) return;

        const player = new Player(playerElement, {
          id: parseInt(vimeoId),
          width: "100%",
          responsive: true,
          controls: false,
          autopause: false,
        });

        vimeoPlayerRef.current = player;

        player.on("loaded", async () => {
          const dur = await player.getDuration();
          setDuration(dur);
          setIsReady(true);
          setIsLoading(false);
        });

        player.on("play", () => setIsPlaying(true));
        player.on("pause", () => setIsPlaying(false));
        player.on("ended", () => {
          setIsPlaying(false);
          if (isLooping) {
            player.setCurrentTime(0);
            player.play();
          }
        });

        player.on("timeupdate", (data) => {
          setCurrentTime(data.seconds);
          setDuration(data.duration);
        });

        player.on("volumechange", (data) => {
          setVolume(data.volume);
        });

        player.on("error", (error) => {
          console.error("Vimeo error:", error);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Vimeo player error:", error);
        setIsLoading(false);
      }
    };

    initVimeoPlayer();

    return () => {
      if (vimeoPlayerRef.current) {
        try {
          vimeoPlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [activePlatform, vimeoId, isLooping]);

  // ==================== YOUTUBE PLAYER ====================
  useEffect(() => {
    if (activePlatform !== PlayerType.YOUTUBE || !youtubeId) return;

    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        );
        if (existingScript) {
          const checkYT = setInterval(() => {
            if (window.YT && window.YT.Player) {
              clearInterval(checkYT);
              resolve();
            }
          }, 100);
          return;
        }

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          resolve();
        };
      });
    };

    const initYouTubePlayer = async () => {
      try {
        setIsLoading(true);
        await loadYouTubeAPI();

        if (playerContainerRef.current) {
          playerContainerRef.current.innerHTML =
            '<div id="youtube-player"></div>';
        }

        const playerElement = document.getElementById("youtube-player");
        if (!playerElement) return;

        const player = new window.YT.Player("youtube-player", {
          videoId: youtubeId,
          width: "100%",
          height: "100%",
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              youtubePlayerRef.current = event.target;
              setDuration(event.target.getDuration());
              setIsReady(true);
              setIsLoading(false);
            },
            onStateChange: (event) => {
              switch (event.data) {
                case window.YT.PlayerState.PLAYING:
                  setIsPlaying(true);
                  if (timeUpdateIntervalRef.current) {
                    clearInterval(timeUpdateIntervalRef.current);
                  }
                  timeUpdateIntervalRef.current = setInterval(() => {
                    if (youtubePlayerRef.current) {
                      setCurrentTime(youtubePlayerRef.current.getCurrentTime());
                    }
                  }, 250);
                  break;
                case window.YT.PlayerState.PAUSED:
                  setIsPlaying(false);
                  if (timeUpdateIntervalRef.current) {
                    clearInterval(timeUpdateIntervalRef.current);
                  }
                  break;
                case window.YT.PlayerState.ENDED:
                  setIsPlaying(false);
                  if (timeUpdateIntervalRef.current) {
                    clearInterval(timeUpdateIntervalRef.current);
                  }
                  if (isLooping && youtubePlayerRef.current) {
                    youtubePlayerRef.current.seekTo(0);
                    youtubePlayerRef.current.playVideo();
                  }
                  break;
              }
            },
            onError: (error) => {
              console.error("YouTube error:", error);
              setIsLoading(false);
            },
          },
        });
      } catch (error) {
        console.error("YouTube player error:", error);
        setIsLoading(false);
      }
    };

    initYouTubePlayer();

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
      if (youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [activePlatform, youtubeId, isLooping]);

  // ==================== CONTROL FUNCTIONS ====================
  const togglePlay = useCallback(() => {
    if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
      if (isPlaying) {
        vimeoPlayerRef.current.pause();
      } else {
        vimeoPlayerRef.current.play();
      }
    } else if (
      activePlatform === PlayerType.YOUTUBE &&
      youtubePlayerRef.current
    ) {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    }
  }, [activePlatform, isPlaying]);

  const seek = useCallback(
    (seconds) => {
      const newTime = Math.min(Math.max(currentTime + seconds, 0), duration);

      if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setCurrentTime(newTime);
      } else if (
        activePlatform === PlayerType.YOUTUBE &&
        youtubePlayerRef.current
      ) {
        youtubePlayerRef.current.seekTo(newTime, true);
      }
      setCurrentTime(newTime);
    },
    [activePlatform, currentTime, duration]
  );

  const handleProgressChange = useCallback(
    (e) => {
      const newTime = parseFloat(e.target.value);

      if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setCurrentTime(newTime);
      } else if (
        activePlatform === PlayerType.YOUTUBE &&
        youtubePlayerRef.current
      ) {
        youtubePlayerRef.current.seekTo(newTime, true);
      }
      setCurrentTime(newTime);
    },
    [activePlatform]
  );

  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);

      if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setVolume(newVolume);
      } else if (
        activePlatform === PlayerType.YOUTUBE &&
        youtubePlayerRef.current
      ) {
        youtubePlayerRef.current.setVolume(newVolume * 100);
      }
    },
    [activePlatform]
  );

  const handleSpeedChange = useCallback(
    (speed) => {
      setPlaybackRate(speed);

      if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setPlaybackRate(speed);
      } else if (
        activePlatform === PlayerType.YOUTUBE &&
        youtubePlayerRef.current
      ) {
        youtubePlayerRef.current.setPlaybackRate(speed);
      }
      setShowSettings(false);
    },
    [activePlatform]
  );

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => {
      const next = !prev;
      if (activePlatform === PlayerType.VIMEO && vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setLoop(next);
      }
      return next;
    });
  }, [activePlatform]);

  // ==================== FULLSCREEN ====================
  function isFullscreen() {
    return (
      document.fullscreenElement != null ||
      document.webkitFullscreenElement != null
    );
  }

  async function enterFullscreenWithOrientation() {
    const elem = containerRef.current;
    if (!elem) return;

    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      }
      setIsFullScreen(true);

      try {
        if (screen.orientation?.lock) {
          await screen.orientation.lock("landscape");
        }
      } catch {}

      if (isIOS && window.matchMedia("(orientation: portrait)").matches) {
        setIosRotateHack(true);
      }
    } catch (e) {
      console.error("Fullscreen request failed:", e);
    }
  }

  async function exitFullscreenWithOrientation() {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (
        document.webkitFullscreenElement &&
        document.webkitExitFullscreen
      ) {
        await document.webkitExitFullscreen();
      }
    } catch {
    } finally {
      setIsFullScreen(false);
      setIosRotateHack(false);
      try {
        screen.orientation?.unlock?.();
      } catch {}
    }
  }

  // ==================== KEYBOARD CONTROLS ====================
  const handleKeydown = useCallback(
    (e) => {
      switch (e.key.toLowerCase()) {
        case " ":
        case "enter":
          togglePlay();
          e.preventDefault();
          break;
        case "arrowright":
          seek(10);
          break;
        case "arrowleft":
          seek(-10);
          break;
        case "arrowup":
          setVolume((v) => {
            const newV = Math.min(v + 0.1, 1);
            handleVolumeChange({ target: { value: newV } });
            return newV;
          });
          break;
        case "arrowdown":
          setVolume((v) => {
            const newV = Math.max(v - 0.1, 0);
            handleVolumeChange({ target: { value: newV } });
            return newV;
          });
          break;
        case "f":
          if (isFullscreen()) {
            exitFullscreenWithOrientation();
          } else {
            enterFullscreenWithOrientation();
          }
          break;
        default:
          break;
      }
    },
    [togglePlay, seek, handleVolumeChange]
  );

  // ==================== EFFECTS ====================
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  useEffect(() => {
    const onFsChange = () => {
      const active =
        !!document.fullscreenElement || !!document.webkitFullscreenElement;
      setIsFullScreen(active);
      if (!active) setIosRotateHack(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  useEffect(() => {
    const onOrientationChange = () => {
      if (
        isIOS &&
        isFullScreen &&
        window.matchMedia("(orientation: landscape)").matches
      ) {
        setIosRotateHack(false);
      }
    };
    window.addEventListener("orientationchange", onOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", onOrientationChange);
  }, [isIOS, isFullScreen]);

  // ==================== RENDER ====================

  // No video available
  if (!hasVimeo && !hasYouTube) {
    return (
      <div
        className={`w-full relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center ${rootClassName}`}
      >
        <div className="text-white text-center p-8">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg opacity-75">No video selected</p>
          <p className="text-sm opacity-50 mt-2">
            Pass vimeo_id or youtube_id in URL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${rootClassName}`}>
      {/* Platform Toggle Buttons */}
      {hasBothPlatforms && (
        <div className="flex items-center justify-center gap-3 my-4">
          <button
            onClick={() => handlePlatformSwitch(PlayerType.VIMEO)}
            className={cx(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105",
              activePlatform === PlayerType.VIMEO
                ? "bg-[#1ab7ea] text-white shadow-lg shadow-[#1ab7ea]/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <VimeoIcon className="w-5 h-5" />
            <span>Vimeo</span>
            {activePlatform === PlayerType.VIMEO && (
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>

          <button
            onClick={() => handlePlatformSwitch(PlayerType.YOUTUBE)}
            className={cx(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105",
              activePlatform === PlayerType.YOUTUBE
                ? "bg-[#FF0000] text-white shadow-lg shadow-[#FF0000]/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <YouTubeIcon className="w-5 h-5" />
            <span>YouTube</span>
            {activePlatform === PlayerType.YOUTUBE && (
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        </div>
      )}

      {/* Single Platform Badge */}
      {!hasBothPlatforms && (
        <div className="flex items-center justify-start p-3">
          <div
            className={cx(
              "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white",
              hasVimeo ? "bg-[#1ab7ea]" : "bg-[#FF0000]"
            )}
          >
            {hasVimeo ? (
              <>
                <VimeoIcon className="w-5 h-5" />
                <span>Vimeo Player</span>
              </>
            ) : (
              <>
                <YouTubeIcon className="w-5 h-5" />
                <span>YouTube Player</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Video Player Container */}
      <div
        ref={containerRef}
        onContextMenu={(e) => e.preventDefault()}
        className={cx(
          "w-full relative  select-none flex items-center justify-center bg-black shadow-2xl",
          iosRotateHack ? "ios-landscape-hack" : "",
          isFullScreen && "!fixed !inset-0 !z-[9999] !w-screen !h-screen"
        )}
        dir="ltr"
      >
        {/* Video Container */}
        <div
          className={cx(
            "relative mx-auto cursor-pointer w-full ",
            isFullScreen
              ? "!w-screen !h-screen !max-w-none"
              : "md:max-w-7xl aspect-video"
          )}
          onMouseMove={() => setShowControls(true)}
          onMouseEnter={() => setShowControls(true)}
          onClick={togglePlay}
          onDoubleClick={() => {
            if (isFullscreen()) {
              exitFullscreenWithOrientation();
            } else {
              enterFullscreenWithOrientation();
            }
          }}
        >
          <div
            ref={playerContainerRef}
            className={cx(
              "w-full h-full",
              "[&>iframe]:w-full [&>iframe]:h-full",
              "[&>div]:w-full [&>div]:h-full",
              isFullScreen &&
                "[&>iframe]:!w-screen [&>iframe]:!h-screen [&>div]:!w-screen [&>div]:!h-screen"
            )}
            style={{ pointerEvents: "none" }}
          />
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
            <div className="relative">
              <div
                className={cx(
                  "animate-spin rounded-full h-14 w-14 border-4 border-t-transparent",
                  activePlatform === PlayerType.VIMEO
                    ? "border-[#1ab7ea]"
                    : "border-[#FF0000]"
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {activePlatform === PlayerType.VIMEO ? (
                  <VimeoIcon className="w-6 h-6 text-[#1ab7ea]" />
                ) : (
                  <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />
                )}
              </div>
            </div>
            <p className="text-white mt-4 text-sm">
              Loading{" "}
              {activePlatform === PlayerType.VIMEO ? "Vimeo" : "YouTube"}{" "}
              player...
            </p>
          </div>
        )}

        {/* Play Button */}
        {!isPlaying && isReady && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-14 md:w-20 h-14 md:h-20 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 shadow-2xl pointer-events-auto hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <circle
                  cx={13}
                  cy={13}
                  r={11}
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                />
                <path fill="white" d="m17 13l-6 4V9" />
              </svg>
            </button>
          </div>
        )}

        {/* Seek Buttons */}
        {showControls && isReady && !isLoading && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(-10);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/75 transition z-20"
            >
              <RotateCcw className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(10);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/75 transition z-20"
            >
              <RotateCw className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </button>
          </>
        )}

        {/* Platform Badge */}
        {isReady && !isLoading && (
          <div className="absolute top-4 left-4 z-20">
            <div
              className={cx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium backdrop-blur-sm",
                activePlatform === PlayerType.VIMEO
                  ? "bg-[#1ab7ea]/80"
                  : "bg-[#FF0000]/80"
              )}
            >
              {activePlatform === PlayerType.VIMEO ? (
                <VimeoIcon className="w-4 h-4" />
              ) : (
                <YouTubeIcon className="w-4 h-4" />
              )}
              <span>
                {activePlatform === PlayerType.VIMEO ? "Vimeo" : "YouTube"}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 p-4 py-2 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent z-20 ${
            showControls && isReady
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="gap-3 justify-between">
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                disabled={duration === 0}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: duration
                    ? `linear-gradient(to right, #f97316 0%, #f97316 ${
                        (currentTime / duration) * 100
                      }%, #4b5563 ${
                        (currentTime / duration) * 100
                      }%, #4b5563 100%)`
                    : "#4b5563",
                }}
              />
            </div>

            <div className="flex mt-2">
              <div className="flex w-full items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-9 h-9 p-1 bg-white/30 rounded-full" />
                  ) : (
                    <svg
                      className="w-9 h-9 p-1 bg-white/30 rounded-full"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z"
                      />
                    </svg>
                  )}
                </button>

                <div className="text-white text-sm bg-white/30 p-1 px-2 rounded-xl">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-3 relative">
                {/* Settings */}
                <div className="relative">
                  <button
                    className="text-white hover:text-orange-400 transition-colors duration-200"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill="white"
                        fillRule="evenodd"
                        d="m5.557.69l-.463 1.195l-1.594.904l-1.27-.194a1.08 1.08 0 0 0-1.078.528l-.43.754a1.08 1.08 0 0 0 .086 1.217l.807 1.001v1.81L.83 8.906a1.08 1.08 0 0 0-.086 1.217l.43.754a1.08 1.08 0 0 0 1.078.528l1.27-.194l1.573.904l.463 1.196a1.08 1.08 0 0 0 1 .689h.905a1.08 1.08 0 0 0 1.002-.69l.463-1.195l1.572-.904l1.27.194a1.08 1.08 0 0 0 1.078-.528l.43-.754a1.08 1.08 0 0 0-.086-1.217l-.807-1.001v-1.81l.786-1.001a1.08 1.08 0 0 0 .086-1.217l-.43-.754a1.08 1.08 0 0 0-1.078-.528l-1.27.194l-1.573-.904L8.443.689A1.08 1.08 0 0 0 7.442 0h-.884a1.08 1.08 0 0 0-1.001.69M7 9.25a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white rounded-lg shadow-lg w-44 text-sm z-30 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-700/50 text-xs text-gray-400 font-medium">
                        Playback Speed
                      </div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={cx(
                            "block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors",
                            playbackRate === speed
                              ? "bg-orange-500/20 text-orange-400"
                              : ""
                          )}
                        >
                          {speed}x {speed === 1 && "(Normal)"}
                          {playbackRate === speed && " ✓"}
                        </button>
                      ))}
                      <div className="border-t border-gray-700">
                        <button
                          onClick={toggleLoop}
                          className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-700"
                        >
                          <span>Loop</span>
                          <span
                            className={cx(
                              "w-8 h-4 rounded-full transition-colors relative",
                              isLooping ? "bg-orange-500" : "bg-gray-600"
                            )}
                          >
                            <span
                              className={cx(
                                "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform",
                                isLooping ? "translate-x-4" : "translate-x-0.5"
                              )}
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <button
                  className="text-white hover:text-orange-400 transition-colors duration-200"
                  onClick={() => {
                    if (isFullscreen()) {
                      exitFullscreenWithOrientation();
                    } else {
                      enterFullscreenWithOrientation();
                    }
                  }}
                >
                  {isFullScreen ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M21.29 4.12L16.7 8.71l1.59 1.59c.63.63.18 1.71-.71 1.71H13c-.55 0-1-.45-1-1v-4.6c0-.89 1.08-1.34 1.71-.71l1.59 1.59l4.59-4.59a.996.996 0 0 1 1.41 0c.38.4.38 1.03-.01 1.42M4.12 21.29l4.59-4.59l1.59 1.59c.63.63 1.71.18 1.71-.71V13c0-.55-.45-1-1-1h-4.6c-.89 0-1.34 1.08-.71 1.71l1.59 1.59l-4.59 4.59a.996.996 0 0 0 0 1.41c.4.38 1.03.38 1.42-.01"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M17 2a1 1 0 1 0 0 2h1.586l-4.293 4.293a1 1 0 0 0 1.414 1.414L20 5.414V7a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1zM4 18.586V17a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2H5.414l4.293-4.293a1 1 0 0 0-1.414-1.414z"
                      />
                    </svg>
                  )}
                </button>

                {/* Volume */}
                <div className="flex items-center space-x-2 group transition">
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.97 10.97 0 0 1 23 12m-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A4 4 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12"
                    />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer hidden group-hover:block transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 0;
            width: 0;
            border-radius: 50%;
            background: #f97316;
            cursor: pointer;
            border: 0px solid #ffffff;
            transition: 0.2s ease;
          }
          .slider:hover::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f97316;
            cursor: pointer;
            border: 2px solid #ffffff;
            transition: 0.2s ease;
          }
          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f97316;
            cursor: pointer;
            border: 2px solid #ffffff;
          }
          .ios-landscape-hack {
            position: fixed;
            inset: 0;
            transform: rotate(90deg);
            width: 100vh;
            height: 100vw;
            transform-origin: center;
            overflow: hidden;
            z-index: 9999;
            background: black;
          }
          :global(.fullscreen-active) {
            width: 100vw !important;
            height: 100vh !important;
          }
          :global(.fullscreen-active iframe),
          :global(.fullscreen-active > div) {
            width: 100vw !important;
            height: 100vh !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
        `}</style>
      </div>
    </div>
  );
}
