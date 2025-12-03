"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";

export default function HomeSection() {
    const [index, setIndex] = useState(0);

    const images = [
        "/images/LINE_ALBUM_21268_251203_3.jpg",
        "/images/LINE_ALBUM_21268_251203_4.jpg",
        "/images/LINE_ALBUM_21268_251203_5.jpg",
        "/images/LINE_ALBUM_21268_251203_9.jpg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen bg-cover bg-center" 
            // style={{ backgroundImage: "url('/images/LINE_ALBUM_21268_251203_3.jpg')"}} 
        > 
            {images.map((img, i) => (
                <Image
                    key={i}
                    src={img}
                    alt="slide"
                    fill
                    className={`object-cover transition-opacity duration-[1500ms] 
                        ${i === index ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            {/* <div className="absolute inset-0 bg-black/50"></div>  */}
            <div className="absolute inset-0 bg-gradient-to-b 
                from-black/70 via-black/40 to-black/20"></div>

            <div className="relative flex flex-col justify-center items-center h-full text-white text-center px-6">
                {/* <h1 className="text-5xl mt-35 font-bold leading-snug">ศูนย์การศึกษาพระพุทธศาสนา<br/>วันอาทิตย์</h1> */}
                <h1 className="text-5xl md:text-6xl mt-25 font-bold leading-tight drop-shadow-xl 
                    animate-fadeIn [text-shadow:0_0_6px_rgba(0,0,0,0.9)]">
                    ศูนย์การศึกษาพระพุทธศาสนา<br />วันอาทิตย์
                </h1>

                {/* <p className="text-2xl mt-2">วัดทางหลวง</p> */}
                <p className="text-2xl mt-3 drop-shadow-lg 
                    animate-fadeIn [text-shadow:0_0_4px_black] animation-delay-300">
                    วัดทางหลวง
                </p>

                <div className="flex items-center justify-center gap-8 mt-6 border-t border-white/60 pt-4">
                    <div className="flex items-center gap-2">
                        <span><img src="/images/calendar_image.svg" alt="" /></span>
                        <p className="animate-fadeIn [text-shadow:0_0_4px_black] animation-delay-300">เปิด <span className="text-amber-300">08.00–12.00 น.</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span><img src="/images/location_image.svg" alt="" /></span>
                        <p className="animate-fadeIn [text-shadow:0_0_4px_black] animation-delay-300">วัดทางหลวง</p>
                    </div>
                </div>

                <button className="mt-10 bg-yellow-300 hover:ng-yellow-400 text-black font-medium px-8 py-2 rounded-lg shadow-lg cursor-pointer">รายละเอียด</button>

                {/* <div className="flex gap-4 mt-20">
                    <a href="" className="hover:text-yellow-300">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="" className="hover:text-yellow-300">
                        <FaFacebook className="w-6 h-6" />
                    </a>
                    <a href="" className="hover:text-yellow-300">
                        <SiGmail className="w-6 h-6" />
                    </a>
                </div> */}
            </div>
        </div>
    )
}