"use client";

import { useRef, useState } from "react";
import { Tag } from "antd";

export default function CursorLabelSection({ label = "", children, stop }) {
  const wrapRef = useRef(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const onMove = (e) => {
    if (stop) {
      return;
    }
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();

    // cursor position relative to the section
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;

    // optional: keep it inside bounds with a small margin
    const pad = 12;
    x = Math.max(pad, Math.min(r.width - pad, x));
    y = Math.max(pad, Math.min(r.height - pad, y));

    setPos({ x, y });
  };

  return (
    <section
      ref={wrapRef}
      onMouseEnter={() => stop ? null : setShow(true)}
      onMouseLeave={() => stop ? null : setShow(false)}
      onMouseMove={onMove}
      style={{
        position: "relative",
      }}
    >

      {children}

      {show && (
        <div
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            transform: "translate(12px, 12px)", // offset so it doesn't sit under cursor
            pointerEvents: "none", // IMPORTANT: don't block mouse
            zIndex: 10,
          }}
        >
          {/* Use any AntD component inside */}
          <Tag style={{ fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
            {label}
          </Tag>
        </div>
      )}
    </section>
  );
}
