import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // Get user information and check session validity
    const user = await supabase.auth.getUser()
    const userEmail = user.data.user?.email;

    // Protected routes
    if (request.nextUrl.pathname === "/dashboard" && user.error) {
      let res = NextResponse.redirect(new URL("/", request.nextUrl.origin));
      res.cookies.set("AuthError", "SigninFirst");
      console.log("Redirecting to home, AuthError: SigninFirst");
      return res;
    }

    if (request.nextUrl.pathname === "/dashboard" && !userEmail?.match(/.*@iiitkottayam\.ac\.in$/)) {
      let res = NextResponse.redirect(new URL("/", request.nextUrl.origin));
      res.cookies.set("AuthError", "EnterCollegeEmail");
      console.log("Redirecting to home, AuthError: EnterCollegeEmail");
      return res;
    }

    if (!user.error) {
      if(request.nextUrl.pathname === "/") {
        if (userEmail?.match(/.*@iiitkottayam\.ac\.in$/)) {
          let res = NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
          res.cookies.set("AuthError", "");
          console.log("Redirecting to dashboard");
          return res;
        }
        let res = NextResponse.next()
        res.cookies.set("AuthError", "EnterCollegeEmail");
        console.log("Redirecting to home, AuthError: EnterCollegeEmail");
        return res;
      }
      if(request.nextUrl.pathname === "/dashboard"){
        let res = NextResponse.next()
        res.cookies.set("AuthError", "");
        console.log("Redirecting to dashboard");
        return res;
      }
    }

    return response;
  } catch (e) {
    console.error("Error in updateSession:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
