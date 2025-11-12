"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
  PinterestShareButton,
} from "react-share";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Share2,
  X as CloseIcon,
  MessageCircle, // used as WhatsApp glyph
  Send, // used as Telegram glyph
  Globe, // used as Reddit glyph (fallback brandless)
  Pin,
  Share, // used as Pinterest glyph
} from "lucide-react"; // X (Twitter) icon
import { BottomDrawer } from "../ui/BottomDrawer";

/**
 * ShareBottomDrawer (JSX version)
 * - Bottom sheet with social share buttons + Copy Link + Native Web Share.
 * - JSX (no TypeScript), Tailwind CSS, react-share, react-icons.
 *
 * Props:
 *  - open: boolean
 *  - onClose: function
 *  - url: string (required)
 *  - title?: string
 *  - summary?: string (used for Email body, etc.)
 *  - image?: string (used for Pinterest)
 */
export default function ShareBottomDrawer({
  open,
  onClose,
  url,
  title = "",
  summary = "",
  image,
}) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback: temporary textarea
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: summary, url });
      } catch (e) {
        // user cancelled — ignore
      }
    } else {
      copyLink();
    }
  };

  // Button descriptor: share component + label + icon
  const items = [
    {
      key: "facebook",
      label: "Facebook",
      Button: FacebookShareButton,
      icon: <Facebook className="h-5 w-5" aria-hidden />,
      props: { url, quote: title },
    },
    {
      key: "twitter",
      label: "X (Twitter)",
      Button: TwitterShareButton,
      icon: <Twitter className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      Button: LinkedinShareButton,
      icon: <Linkedin className="h-5 w-5" aria-hidden />,
      props: { url, title, summary },
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      Button: WhatsappShareButton,
      icon: <MessageCircle className="h-5 w-5" aria-hidden />,
      props: { url, title, separator: " — " },
    },
    {
      key: "telegram",
      label: "Telegram",
      Button: TelegramShareButton,
      icon: <Send className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "reddit",
      label: "Reddit",
      Button: RedditShareButton,
      icon: <Globe className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "pinterest",
      label: "Pinterest",
      Button: PinterestShareButton,
      icon: <Pin className="h-5 w-5" aria-hidden />,
      props: { media: image || url, url, description: title },
    },
    {
      key: "email",
      label: "Email",
      Button: EmailShareButton,
      icon: <Mail className="h-5 w-5" aria-hidden />,
      props: { url, subject: title, body: summary },
    },
    {
      key: "copy",
      label: copied ? "Copied!" : "Copy link",
      Button: null,
      icon: <LinkIcon className="h-5 w-5" aria-hidden />,
      onClick: copyLink,
    },
    {
      key: "native",
      label: "Share…",
      Button: null,
      icon: <Share2 className="h-5 w-5" aria-hidden />,
      onClick: nativeShare,
    },
  ];

  return (
    <BottomDrawer open={open} setOpen={onClose}>
      <div className=" bg-white ">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Share this</h3>
            <p className="text-xs text-gray-500 line-clamp-1">{title || url}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <CloseIcon aria-hidden />
          </button>
        </div>

        {/* Grid of buttons */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {items.map(({ key, label, Button, icon, props, onClick }) => (
            <div key={key} className="flex flex-col items-center">
              {Button ? (
                <Button {...(props || {})}>
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
                    aria-label={label}
                  >
                    {icon}
                  </span>
                </Button>
              ) : (
                <button
                  onClick={onClick}
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
                >
                  {icon}
                </button>
              )}
              <span className="mt-1.5 text-center text-[11px] text-gray-700">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer URL preview + copy duplication for desktop */}
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border bg-gray-50 px-3 py-2">
          <span className="truncate text-xs text-gray-700" title={url}>
            {url}
          </span>
          <button
            onClick={copyLink}
            className="shrink-0 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium hover:bg-gray-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </BottomDrawer>
  );
}

/**
 * Example usage (place in your component):
 *
 * const [open, setOpen] = useState(false);
 * <button onClick={() => setOpen(true)}>Share</button>
 * <ShareBottomDrawer
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   url={typeof window !== 'undefined' ? window.location.href : 'https://example.com'}
 *   title="Awesome article"
 *   summary="Short description for the share message."
 *   image="https://example.com/cover.jpg" // optional (Pinterest)
 * />
 */
