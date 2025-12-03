import AboutSection from "@/components/AboutSection";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <HomeSection />
      <NewsSection />
    </div>
  );
}
