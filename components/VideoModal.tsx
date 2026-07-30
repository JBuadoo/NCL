"use client";

import { useEffect } from "react";

const VIDEO_SRC = "https://www.youtube.com/embed/TaXM3-qjGkk?autoplay=1";

export default function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="videoModal"
      className={`video-modal${open ? " open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Location Video Tour"
    >
      <div className="video-modal-backdrop" onClick={onClose}></div>
      <div className="video-modal-dialog">
        <button className="video-modal-close" type="button" aria-label="Close video" onClick={onClose}>
          &times;
        </button>
        <div className="video-container">
          {open ? (
            <iframe
              id="videoPlayerFrame"
              src={VIDEO_SRC}
              title="New Creation Living Video Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>
      </div>
    </div>
  );
}
