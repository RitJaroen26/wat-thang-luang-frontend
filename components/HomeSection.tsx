"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeSection() {
    const [index, setIndex] = useState(0);

    const images = [
        "/images/LINE_ALBUM_21268_251203_3.jpg",
        "/images/LINE_ALBUM_21268_251203_4.jpg",
        "/images/LINE_ALBUM_21268_251203_5.jpg",
        "/images/LINE_ALBUM_21268_251203_8.jpg",
        "/images/LINE_ALBUM_21268_251203_7.jpg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 7000);

        return () => clearInterval(timer);
    }, []);

    const goToDetails = () => {
        const section = document.getElementById("introduction");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            className="
                relative w-full h-[100vh] 
                pt-[180px] md:pt-[110px] 
                overflow-hidden
            "
        >
            {images.map((img, i) => (
                <Image
                    key={i}
                    src={img}
                    alt="slide"
                    fill
                    priority={i === 0}
                    className={`
                        object-cover transition-opacity 
                        duration-[1800ms] ease-out 
                        ${i === index ? "opacity-100" : "opacity-0"}
                    `}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b 
                from-black/70 via-black/40 to-black/10 pointer-events-none">
            </div>

            <div className="relative h-full flex flex-col items-center justify-center 
                text-white text-center px-6">

                <h1 className="
                    text-2xl md:text-5xl font-extrabold 
                    leading-tight md:leading-snug 
                    drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)]
                    animate-fadeIn
                ">
                    ศูนย์การศึกษาพระพุทธศาสนาวันอาทิตย์{" "}วัดทางหลวง
                </h1>

                <p className="
                    text-xl md:text-2xl mt-4 font-light
                    drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]
                    animate-fadeIn animation-delay-200
                ">
                    ศูนย์ต้นแบบ(โดดเด่น) จังหวัดนนทบุรี กรมการศาสนา กระทรวงวัฒนธรรม
                </p>

                <div className="
                    flex flex-col md:flex-row 
                    items-center justify-center 
                    gap-6 mt-8 pt-4 
                    border-t border-white/40
                ">
                    <div className="flex items-center gap-2">
                        <img src="/images/calendar_image.svg" className="w-6" />
                        <p className="text-lg drop-shadow-sm">
                            เปิด <span className="text-amber-300">08.00–12.00 น.</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/images/location_image.svg" className="w-6" />
                        <p className="text-lg drop-shadow-sm">
                            วัดทางหลวง
                        </p>
                    </div>
                </div>

                <button
                    className="
                        mt-10 px-10 py-3 rounded-lg font-semibold 
                        bg-amber-300 text-black 
                        shadow-xl hover:bg-amber-400 
                        transition-all duration-200 cursor-pointer
                    "
                    onClick={goToDetails}
                >
                    รายละเอียด
                </button>
            </div>
        </section>
    );
}
