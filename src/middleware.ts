import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    // Track analytics event
    console.log("analytics event");
    try {
      analytics.track("pageview", {
        page: "/",
        country: req.geo?.country,
      });
    } catch (e) {
      console.error(e);
    }
    return NextResponse.next();
  }
  // No explicit return for non-root paths (optional)
}

export const matcher = {
  matcher: "/",
};
