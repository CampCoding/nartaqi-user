"use client";

import { useRef, useState, useEffect } from "react";
import { Tag } from "antd";

export default function CursorLabelSection({ label = "", children, stop }) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // ✅ Detect touch device to disable cursor label on mobile/tablet
  useEffect(() => {
    const checkTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);
  }, []);

  const onMove = (e) => {
    if (stop || isTouchDevice) return;
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;

    const pad = 12;
    x = Math.max(pad, Math.min(r.width - pad, x));
    y = Math.max(pad, Math.min(r.height - pad, y));

    setPos({ x, y });
  };

  return (
    <section
      ref={wrapRef}
      onMouseEnter={() => (stop || isTouchDevice ? null : setShow(true))}
      onMouseLeave={() => (stop || isTouchDevice ? null : setShow(false))}
      onMouseMove={onMove}
      style={{ position: "relative" }}
    >
      {children}

      {show && !isTouchDevice && (
        <div
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            transform: "translate(12px, 12px)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Tag
            style={{
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              fontSize: "12px",
            }}
          >
            {label}
          </Tag>
        </div>
      )}
    </section>
  );
}