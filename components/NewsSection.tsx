"use client";

import Image from "next/image";
import { useState } from "react";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import ParallaxClientProvider from "./ParallaxClientProvider";
import EventCalendar from "./Calendar";

// import NewsParallaxSection from "./NewsParallaxSection"; // Component ที่ไม่ได้ใช้ในการแก้ไขนี้

const tabs = ["ข่าวประชาสัมพันธ์", "ข่าวการเรียนการสอน", "กิจกรรม"];

// 3. Data Mockup (เพื่อความชัดเจนในการแสดงผล UI)
const mockData = [
    {
        title: "ประชุมผู้ปกครองภาคเรียนที่ 2 ประจำปีการศึกษา 2568",
        date: "5 ธันวาคม 2567",
        type: "ข่าวประชาสัมพันธ์",
        img: "/images/LINE_ALBUM_21268_251203_11.jpg",
    },
    {
        title: "กิจกรรมสอนธรรมะสำหรับนักเรียนใหม่ ระดับชั้นอนุบาล",
        date: "10 พฤศจิกายน 2567",
        type: "ข่าวการเรียนการสอน",
        img: "/images/LINE_ALBUM_21268_251203_2.jpg",
    },
    {
        title: "จัดงานวันมาฆบูชาและเวียนเทียนรอบอุโบสถ",
        date: "24 กุมภาพันธ์ 2568",
        type: "กิจกรรม",
        img: "/images/LINE_ALBUM_21268_251203_7.jpg",
    },
    // เพิ่มข้อมูลอื่น ๆ ตามประเภท
];

const primaryColor = "#B89B5F"; // สีทอง/น้ำตาลอ่อน
const secondaryColor = "#1D2340"; // สีกรมท่า/น้ำเงินเข้ม

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState("ข่าวประชาสัมพันธ์");

    const filteredData = mockData.filter(item => item.type === activeTab);

    return (
        <ParallaxClientProvider>
            <main className="relative overflow-hidden bg-white min-h-screen">
                <ParallaxBanner
                    className="h-[700px]"
                    layers={[
                        {
                            image: "/images/S__13099032_0.jpg",
                            speed: -25,
                        },
                        {
                            children: <div className="absolute inset-0 bg-black/80"></div>,
                            speed: 0,
                        },
                        {
                            speed: -10,
                            children: (
                                <>
                                    {/* <div className="absolute top-40 left-1/2 -translate-x-1/2 text-center text-white w-full pb-16">
                                        <h1 className="text-6xl font-extrabold drop-shadow-lg tracking-wide">
                                            ข่าวสาร & กิจกรรม
                                        </h1>
                                        <p className="mt-3 text-lg text-gray-200 font-light">
                                            อัปเดตความเคลื่อนไหวล่าสุดของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์
                                        </p>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-4 mt-45 items-center">
                                        <div className="relative hidden md:flex flex-1 w-full h-[360px] rounded-3xl overflow-hidden shadow-2xl">
                                            <Image
                                                src="/images/LINE_ALBUM_21268_251203_3.jpg"
                                                fill
                                                alt="Featured news..."
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                            <div className="absolute bottom-10 left-8 text-white">
                                                <span className="text-xs tracking-widest bg-[#B89B5F] px-3 py-1 rounded-full uppercase">
                                                    {activeTab}
                                                </span>
                                                <h2 className="text-3xl font-bold mt-3 leading-snug">
                                                    เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568
                                                </h2>
                                                <p className="text-sm mt-2 text-gray-200">12 ธันวาคม 2567</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 justify-center items-start">
                                            <div className="scale-[0.70] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                                                <EventCalendar />
                                            </div>
                                        </div>


                                    </div> */}
                                    
                                    <div className="relative w-full h-full pt-12 md:pt-24 pb-20 max-w-7xl mx-auto px-6 mt-20">

                                        {/* 1. HEADLINE: จัดให้อยู่ด้านบนของ Container */}
                                        <div className="text-center text-white">
                                            <h1 className="text-6xl font-extrabold drop-shadow-lg tracking-wide">
                                                ข่าวสาร & กิจกรรม
                                            </h1>
                                            <p className="mt-3 text-lg text-gray-200 font-light">
                                                อัปเดตความเคลื่อนไหวล่าสุดของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์
                                            </p>
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-8 mt-16 items-start justify-center">
                                            <div className="relative hidden md:block w-full lg:w-3/5 xl:w-[60%] h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                                                <Image
                                                    src="/images/LINE_ALBUM_21268_251203_3.jpg"
                                                    fill
                                                    alt="Featured news..."
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                                <div className="absolute bottom-8 left-8 text-white max-w-md">
                                                    <span className="text-xs tracking-widest bg-[#B89B5F] px-3 py-1 rounded-full uppercase">
                                                        ข่าวประชาสัมพันธ์
                                                    </span>
                                                    <h2 className="text-3xl font-bold mt-3 leading-snug">
                                                        เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568
                                                    </h2>
                                                    <p className="text-sm mt-2 text-gray-200">12 ธันวาคม 2567</p>
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-2/5 xl:w-[40%] flex justify-center lg:justify-start items-start">
                                                <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl w-full max-w-sm lg:max-w-none">
                                                    <div className="w-full">
                                                        <EventCalendar />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </>
                            ),
                        },
                    ]}
                />

                <section className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap gap-4 justify-center">

                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                             px-8 py-2.5 rounded-full text-sm tracking-wide transition-all
                             border shadow-sm z-30
                             ${activeTab === tab
                                    ? "bg-[#b89b5f] text-white border-[#b89b5f] shadow-lg"
                                    : "bg-white text-[#6b6b6b] border-[#ded2b4] hover:bg-[#f3ece0]"
                                }
                         `}
                        >
                            {tab}
                        </button>
                    ))}
                </section>

                <section className="max-w-6xl mx-auto px-6 mt-16 space-y-20">
                    <Parallax speed={-5}>
                        <div className="relative flex flex-1 md:hidden h-[360px] rounded-3xl overflow-hidden shadow-2x">
                            <Image
                                src="/images/LINE_ALBUM_21268_251203_3.jpg"
                                fill
                                alt="Featured news..."
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            <div className="absolute bottom-10 left-8 text-white">
                                <span className="text-xs tracking-widest bg-[#B89B5F] px-3 py-1 rounded-full uppercase">
                                    {activeTab}
                                </span>
                                <h2 className="text-3xl font-bold mt-3 leading-snug">
                                    เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568
                                </h2>
                                <p className="text-sm mt-2 text-gray-200">12 ธันวาคม 2567</p>
                            </div>
                        </div>
                    </Parallax>

                    <div>
                        <h2 className={`text-3xl font-bold text-[${secondaryColor}] mb-10 border-b-2 border-gray-300 pb-2`}>
                            {activeTab === "กิจกรรม" ? "อัลบั้มกิจกรรม/อีเว้นท์ทั้งหมด" : "รายการข่าวสารล่าสุด"}
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredData.map((item, i) => (
                                // Parallax สำหรับ Card แต่ละใบ (เลื่อนขึ้นช้าๆ)
                                <Parallax key={i} speed={-(1 + i * 0.5)}>
                                    <div
                                        className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={item.img}
                                                fill
                                                alt={item.title}
                                                className="object-cover group-hover:scale-105 transition-all duration-500"
                                            />
                                            <span className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full bg-[${primaryColor}]/80`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className={`font-bold text-xl text-[${secondaryColor}] group-hover:text-[${primaryColor}] transition-colors`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                                            <button className={`mt-4 text-sm font-semibold text-[${primaryColor}] hover:underline`}>
                                                อ่านรายละเอียด →
                                            </button>
                                        </div>
                                    </div>
                                </Parallax>
                            ))}
                        </div>
                    </div>

                    {activeTab === "กิจกรรม" && (
                        <section className="mt-24 pb-20">
                            <h2 className={`text-3xl font-bold mb-10 text-[${secondaryColor}]`}>ปฏิทิน & ไทม์ไลน์กิจกรรมสำคัญ</h2>

                            <Parallax speed={5}>
                                <div className="border-l-4 border-dashed border-[#dcd1b3] ml-3 space-y-12">
                                    {/* Timeline Item */}
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative pl-12 bg-white p-5 rounded-xl shadow-lg border-l-4 border-[#b89b5f] -ml-[2px]">
                                            <div className={`w-6 h-6 bg-[${primaryColor}] rounded-full absolute -left-[14px] top-4 border-4 border-white shadow-md`}></div>
                                            <h3 className="text-xl font-bold text-[#2d2924]">
                                                กิจกรรมวันอาสาฬหบูชา (7:00 - 12:00)
                                            </h3>
                                            <p className="text-sm font-semibold text-[#8a7147] mt-1">15 กรกฎาคม 2568</p>
                                            <p className="text-base text-gray-600 mt-2">
                                                กิจกรรมเวียนเทียน, ฟังธรรม และฝึกสมาธิร่วมกัน ณ อุโบสถของวัด ...
                                            </p>
                                            <a href="#" className={`text-sm mt-3 inline-block font-semibold text-[${secondaryColor}] hover:text-[${primaryColor}]`}>ลงทะเบียน/ดูรายละเอียด →</a>
                                        </div>
                                    ))}
                                </div>
                            </Parallax>
                        </section>
                    )}

                </section>

                <Parallax speed={10} className={`py-20 bg-[${secondaryColor}] text-center text-white`}>
                    <button className={`mt-8 px-12 py-3.5 bg-[${primaryColor}] rounded-full shadow-xl hover:bg-[#a58852] transition font-bold text-lg`}>
                        ดูข่าวทั้งหมด
                    </button>
                </Parallax>

            </main>
        </ParallaxClientProvider>
    );
}

