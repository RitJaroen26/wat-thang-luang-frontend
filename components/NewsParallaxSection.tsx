"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewsParallaxSection({
    image = "/images/LINE_ALBUM_21268_251203_3.jpg",
    height = "360px",
    children
}: {
    image?: string;
    height?: string;
    children?: React.ReactNode;
}) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY * 0.35);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height }}
        >
            {/* PARALLAX BACKGROUND */}
            <div
                className="absolute inset-0 -z-10"
                style={{ transform: `translateY(${offsetY}px)` }}
            >
                <Image
                    src={image}
                    alt="Parallax Background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent -z-10" />

            {/* CONTENT AREA */}
            <div className="relative z-10 h-full flex items-center justify-center">
                {children}
            </div>
        </section>
    );
}
