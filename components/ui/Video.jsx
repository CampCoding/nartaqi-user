"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Pause, RotateCcw, RotateCw } from "lucide-react";
import cx from "../../lib/cx";

export default function VideoPlayer({ rootClassName = "", defaultPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const durationIntervalRef = useRef(null);

  // ---- NEW: iOS detection + hack state ----
  const isIOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream;

  const [iosRotateHack, setIosRotateHack] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor((seconds || 0) / 60);
    const secs = Math.floor((seconds || 0) % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
    setIsPlaying((p) => !p);
  };

  const seek = (seconds) => {
    if (!videoRef.current) return;
    const dur = duration || videoRef.current.duration || 0;
    videoRef.current.currentTime = Math.min(
      Math.max((videoRef.current.currentTime || 0) + seconds, 0),
      dur
    );
    setCurrentTime(videoRef.current.currentTime || 0);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  const updateDuration = () => {
    if (!videoRef.current) return;
    const d = videoRef.current.duration;
    if (d && !isNaN(d) && d !== Infinity) {
      setDuration(d);
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }
  };

  const handleLoadedMetadata = () => {
    updateDuration();
    if (!durationIntervalRef.current) {
      durationIntervalRef.current = setInterval(updateDuration, 100);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime || 0);
  };

  const handlePictureInPicture = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (!document.pictureInPictureElement) {
      try {
        await v.requestPictureInPicture();
      } catch (error) {
        console.error("Error entering Picture-in-Picture mode:", error);
      }
    } else {
      await document.exitPictureInPicture();
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSettings(false);
  };

  const toggleLoop = () => {
    setIsLooping((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.loop = next;
      return next;
    });
  };

  function isFullscreen() {
    return (
      document.fullscreenElement != null ||
      document.webkitFullscreenElement != null
    );
  }

  // ---- NEW: Enter/Exit fullscreen with orientation handling ----
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

      // Try to lock to landscape in supported browsers (Android/Chrome, etc.)
      try {
        if (screen.orientation?.lock) {
          await screen.orientation.lock("landscape");
        }
      } catch {
        // ignore if not supported or blocked
      }

      // iOS fallback (no orientation.lock)
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
      // ignore
    } finally {
      setIsFullScreen(false);
      setIosRotateHack(false);
      try {
        screen.orientation?.unlock?.();
      } catch {
        // ignore
      }
    }
  }

  const handleKeydown = (e) => {
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
          if (videoRef.current) videoRef.current.volume = newV;
          return newV;
        });
        break;
      case "arrowdown":
        setVolume((v) => {
          const newV = Math.max(v - 0.1, 0);
          if (videoRef.current) videoRef.current.volume = newV;
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
      case "m":
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, volume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    handleLoadedMetadata();
    const checkReady = () => updateDuration();

    vid.addEventListener("loadedmetadata", checkReady);
    vid.addEventListener("durationchange", checkReady);
    vid.addEventListener("canplay", checkReady);

    return () => {
      vid.removeEventListener("loadedmetadata", checkReady);
      vid.removeEventListener("durationchange", checkReady);
      vid.removeEventListener("canplay", checkReady);
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- NEW: keep state synced with actual fullscreen changes ----
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

  // ---- NEW: if user physically rotates to landscape on iOS, remove the hack ----
  useEffect(() => {
    const onOrientationChange = () => {
      if (isIOS && isFullScreen && window.matchMedia("(orientation: landscape)").matches) {
        setIosRotateHack(false);
      }
    };
    window.addEventListener("orientationchange", onOrientationChange);
    return () => window.removeEventListener("orientationchange", onOrientationChange);
  }, [isIOS, isFullScreen]);

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`w-full relative select-none flex items-center justify-center bg-black  shadow-2xl ${rootClassName} ${iosRotateHack ? "ios-landscape-hack" : ""}`}
      dir="ltr"
    >
      {/* Video */}
      <div
        className={cx("relative  mx-auto  cursor-pointer " , isFullScreen? "w-full" : "md:max-w-7xl")}
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
        <video
          ref={videoRef}
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          className="w-full h-full object-cover"
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleLoadedMetadata}
          loop={isLooping}
        />

      </div>
        {/* Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-14 md:w-20 h-14 md:h-20 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <circle cx={13} cy={13} r={11} fill="none" stroke="white" strokeWidth={2}></circle>
                <path fill="white" d="m17 13l-6 4V9"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Back & Forward Buttons */}
        {showControls && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(-10);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/75 transition"
            >
              <RotateCcw className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(10);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/75 transition"
            >
              <RotateCw className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </button>
          </>
        )}

        {/* Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 p-4 py-2 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
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
                      }%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                    : "#4b5563",
                }}
              />
            </div>

            <div className="flex">
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
                      ></path>
                    </svg>
                  )}
                </button>

                <div className="text-white text-sm bg-white/30 p-1 px-2 rounded-xl">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-3 relative">
                {/* Settings Dropdown */}
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
                      ></path>
                    </svg>
                  </button>
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white rounded-lg shadow-lg w-44 text-sm z-10">
                      <button
                        onClick={() => handleSpeedChange(0.5)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Speed: 0.5x
                      </button>
                      <button
                        onClick={() => handleSpeedChange(1)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Speed: 1x (Normal)
                      </button>
                      <button
                        onClick={() => handleSpeedChange(1.5)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Speed: 1.5x
                      </button>
                      <button
                        onClick={() => handleSpeedChange(2)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Speed: 2x
                      </button>
                      <button
                        onClick={toggleLoop}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        {isLooping ? "Loop: On" : "Loop: Off"}
                      </button>
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
                      ></path>
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
                      ></path>
                    </svg>
                  )}
                </button>

                {/* Picture-in-Picture */}
                <button
                  className="text-white hidden md:block hover:text-orange-400 transition-colors duration-200"
                  onClick={handlePictureInPicture}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.25 18.25h-3.5a3 3 0 0 1-3-3v-8.5a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v3.5"
                      ></path>
                      <rect width={12} height={10} x={11} y={12} fill="currentColor" rx={2}></rect>
                    </g>
                  </svg>
                </button>

                <div className="flex items-center space-x-2 group transition">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.97 10.97 0 0 1 23 12m-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A4 4 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12"
                    ></path>
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

        /* ---- NEW: iOS rotate fallback ---- */
        .ios-landscape-hack {
          position: fixed;
          inset: 0;
          transform: rotate(90deg);
          width: 100vh;  /* swap dimensions after rotate */
          height: 100vw;
          transform-origin: center;
          overflow: hidden;
          z-index: 9999;
          background: black;
        }
           @keyframes gradient {
          0% {
            background: linear-gradient(135deg, #1a0a2e, #16213e, #0f3460);
            background-size: 200% 200%;
            background-position: 0% 50%;
          }
          25% {
            background: linear-gradient(135deg, #16213e, #0f3460, #1a0a2e);
            background-size: 200% 200%;
            background-position: 100% 50%;
          }
          50% {
            background: linear-gradient(135deg, #0f3460, #1a0a2e, #16213e);
            background-size: 200% 200%;
            background-position: 50% 100%;
          }
          75% {
            background: linear-gradient(135deg, #16213e, #1a0a2e, #0f3460);
            background-size: 200% 200%;
            background-position: 50% 0%;
          }
          100% {
            background: linear-gradient(135deg, #1a0a2e, #16213e, #0f3460);
            background-size: 200% 200%;
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 15s ease infinite alternate;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
