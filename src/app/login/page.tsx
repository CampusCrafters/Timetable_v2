"use client"
import GoogleSignOut from "@/utils/auth/signout";

export default function Home() {

  return (
    <div className="min-h-screen">
      <button className="bg-white w-full h-min-screen"  onClick={GoogleSignOut}>Sign Out</button>
    </div>
  );
}
