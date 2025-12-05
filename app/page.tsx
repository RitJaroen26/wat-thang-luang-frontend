import AboutSection from "@/components/AboutSection";
import HomeSection from "@/components/HomeSection";
import Introduction from "@/components/Introduction";
import Maps from "@/components/Maps";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <HomeSection />
      <Introduction />
      <NewsSection />
      <Maps />
    </div>
  );
}
