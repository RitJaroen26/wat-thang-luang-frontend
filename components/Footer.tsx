"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="relative bg-[#0e1120] text-gray-300 pt-24 pb-12 overflow-hidden">

            {/* Decorative gradient blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[130px] rounded-full"></div>

            {/* Top highlight line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 opacity-60"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 relative z-10">

                {/* BRANDING — BIG ZONE */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/test_logo_watthangluang.png"
                            width={75}
                            height={75}
                            alt="logo"
                            className="rounded-full bg-white p-1 shadow-[0px_0px_20px_rgba(255,255,255,0.2)]"
                        />

                        <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                            ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์{" "}วัดทางหลวง
                        </h3>
                    </div>

                    <p className="text-[15px] text-gray-400 leading-relaxed max-w-md">
                        สร้างรากฐานแห่งความดี ด้วยธรรมะ คุณธรรม และปัญญา  
                        พัฒนาเยาวชนสู่อนาคตที่มั่นคงด้วยหลักพระพุทธศาสนา  
                        ผ่านการเรียนรู้ที่ทันสมัยและอบอุ่นในชุมชนวัดทางหลวง
                    </p>

                    {/* Soft underline */}
                    <div className="w-24 h-[1.5px] bg-gradient-to-r from-yellow-400 to-transparent"></div>
                </div>

                {/* NAVIGATION */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-5 tracking-wide">
                        เมนูหลัก
                    </h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            "หน้าแรก",
                            "เกี่ยวกับศูนย์",
                            "วิสัยทัศน์–พันธกิจ",
                            "โครงสร้างองค์กร",
                            "ข่าวสารและประชาสัมพันธ์",
                            "กิจกรรม",
                            "ติดต่อเรา",
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="hover:text-yellow-300 transition-all cursor-pointer hover:translate-x-1"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* PROGRAMS */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-5 tracking-wide">
                        ด้านการเรียนรู้
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-yellow-300 transition cursor-pointer hover:translate-x-1">หลักสูตรธรรมศึกษา</li>
                        <li className="hover:text-yellow-300 transition cursor-pointer hover:translate-x-1">อบรมคุณธรรม–จริยธรรม</li>
                        <li className="hover:text-yellow-300 transition cursor-pointer hover:translate-x-1">กิจกรรมฝึกสมาธิ</li>
                        <li className="hover:text-yellow-300 transition cursor-pointer hover:translate-x-1">โครงการเยาวชนพุทธบุตร</li>
                        <li className="hover:text-yellow-300 transition cursor-pointer hover:translate-x-1">กิจกรรมจิตอาสา</li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-5 tracking-wide">
                        ติดต่อศูนย์
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-yellow-300 mt-1" />
                            <p>
                                วัดทางหลวง ตำบลบางเขน  
                                อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000
                                
                            </p>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-yellow-300" />
                            08X-XXX-XXXX
                        </li>

                        <li className="flex items-center gap-3">
                            <SiGmail className="text-yellow-300" />
                            watthangluang.center@gmail.com
                        </li>
                    </ul>

                    {/* HOURS */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-white mb-3 tracking-wide">
                            เวลาทำการ
                        </h4>
                        <p className="text-sm text-gray-400">
                            วันอาทิตย์  
                            <br />
                            <span className="text-white font-medium text-[15px]">
                                08:00 – 12:00 น.
                            </span>
                        </p>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex gap-5 text-xl mt-6">
                        <a className="hover:text-yellow-300 transition cursor-pointer hover:scale-110"><FaInstagram /></a>
                        <a className="hover:text-yellow-300 transition cursor-pointer hover:scale-110"><FaFacebookF /></a>
                        <a className="hover:text-yellow-300 transition cursor-pointer hover:scale-110"><SiGmail /></a>
                    </div>
                </div>
            </div>

            {/* BOTTOM COPYRIGHT */}
            <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700/40 pt-4 text-center text-[13px] text-gray-500">
                © {new Date().getFullYear()}{" "}
                ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง — All rights reserved.
            </div>

        </footer>
    );
}
