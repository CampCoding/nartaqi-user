"use client"

import React from 'react'
import ShareModal from './ShareModal';
import { useDispatch } from 'react-redux';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { closeVideoModal } from '../utils/Store/Slices/videoModalSlice';
import VideoPlayerModal from './VideoPlayerModal';

const Shared = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCloseVideoModal = React.useCallback(() => {
    dispatch(closeVideoModal());
    // شيل watch/video/vimeo_id/youtube_id من الرابط
    const next = new URLSearchParams(searchParams.toString());
    next.delete("watch");
    next.delete("video");
    next.delete("vimeo_id");
    next.delete("youtube_id");

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [dispatch, router, pathname, searchParams]);


  return (
    <div>
      <ShareModal />    
      <VideoPlayerModal onClose={handleCloseVideoModal} />
 
    </div>
  )
}

export default Shared
