import Dashboard from "@/components/Dashboard/Dashboard";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Dashboard />
     
    </div>
  );
}
