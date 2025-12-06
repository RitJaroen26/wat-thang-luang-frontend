"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import Image from "next/image";
import ParallaxClientProvider from "./ParallaxClientProvider";

const videos = [
    {
        title: "ประมวลภาพและกิจกรรมศูนย์ ประจำปี 2567",
        thumbnail: "/images/video_thumb_1.jpg",
        url: "/videos/clip1.mp4",
        date: "12 ธันวาคม 2567"
    },
    {
        title: "กิจกรรมสวดมนต์ – ฝึกสมาธิ",
        thumbnail: "/images/LINE_ALBUM_21268_251203_1.jpg",
        url: "/videos/clip2.mp4",
        date: "20 พฤศจิกายน 2567"
    },
    {
        title: "โครงการธรรมะสู่เยาวชน",
        thumbnail: "/images/video_thumb_3.jpg",
        url: "/videos/clip3.mp4",
        date: "5 พฤศจิกายน 2567"
    }
];

export default function VideoPage() {
    return (
        <ParallaxClientProvider>
            <main className="bg-[#f3f2ef] text-[#222] min-h-screen">
                <section className="relative h-[180px] sm:h-[220px] md:h-[260px] w-full overflow-hidden">

                    <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>

                    <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 
                        text-center text-white px-4 w-full max-w-xl">

                        <Parallax speed={-5}>
                            <motion.h1
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#212346]"
                            >
                                วิดีทัศน์ศูนย์ศึกษา
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="mt-2 text-gray-700 text-sm sm:text-base md:text-lg"
                            >
                                ภาพรวมกิจกรรม – การเรียนรู้ – และพระพุทธศาสนาสู่เยาวชน
                            </motion.p>
                        </Parallax>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16">
                    <Parallax speed={-5}>
                        <div className="text-center space-y-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="text-2xl sm:text-3xl font-bold text-[#111]"
                            >
                                วิดีโอแนะนำศูนย์การศึกษาพระพุทธศาสนา
                            </motion.h2>

                            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
                        </div>
                    </Parallax>

                    <Parallax speed={-5}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9 }}
                            className="mx-auto w-full max-w-4xl rounded-3xl overflow-hidden 
                                shadow-[0_10px_40px_rgba(0,0,0,0.25)] bg-black"
                        >
                            <video
                                controls
                                className="w-full aspect-video object-cover"
                            >
                                <source src="/videos/introduction_of_watthangluang.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </Parallax>

                    <section className="space-y-8 mt-10">
                        <Parallax speed={-5}>
                            <h2 className="text-xl sm:text-2xl font-semibold text-[#111] mb-1">
                                วิดีทัศน์ทั้งหมด
                            </h2>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">
                                วิดีทัศน์กิจกรรมและการเรียนรู้ในศูนย์
                            </p>

                            <div className="
                                grid 
                                grid-cols-1 
                                sm:grid-cols-2 
                                lg:grid-cols-3 
                                gap-8 sm:gap-10
                            ">
                                {videos.map((v, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.12 }}
                                        className="group rounded-2xl overflow-hidden bg-white 
                                            shadow-md border border-gray-200 
                                            hover:shadow-xl hover:-translate-y-1 
                                            transition-all duration-300"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={v.thumbnail}
                                                fill
                                                alt={v.title}
                                                className="object-cover group-hover:scale-110 
                                                    transition-all duration-700"
                                            />

                                            <div className="
                                                absolute inset-0 bg-gradient-to-t 
                                                from-black/40 via-transparent 
                                                opacity-0 group-hover:opacity-100
                                                transition-all duration-500
                                            "></div>
                                        </div>

                                        <div className="p-4 sm:p-5">
                                            <h3 className="
                                                font-semibold text-lg text-[#222]
                                                group-hover:text-yellow-600
                                                transition
                                            ">
                                                {v.title}
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                {v.date}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Parallax>
                    </section>

                    <div className="text-center pt-8">
                        <button className="
                            px-10 sm:px-14 py-3 rounded-full 
                            bg-yellow-400 text-black font-medium shadow-md 
                            hover:bg-yellow-500 hover:shadow-lg
                            transition-all
                        ">
                            ดูวิดีโอเพิ่มเติม
                        </button>
                    </div>

                </section>
            </main>
        </ParallaxClientProvider>
    );
}

