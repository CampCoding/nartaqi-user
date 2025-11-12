// middleware.js  (at project root)
import { NextResponse } from "next/server";

export function middleware(req) {
  // const isAuthed = true 
  // const url = req.nextUrl;

  // const blockedForAuthed = url.pathname.startsWith("/course/")
  // return true

  // if (isAuthed && blockedForAuthed) {
  //   console.log("not available")
  //   url.pathname = "/"; // destination for logged-in users
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/course/:path*"],
};
