"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisibled, setIsVisibled] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const lastScrollY = useRef(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setOpenDropdown(null);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            setIsScrolled(currentY > 20);

            if (currentY > lastScrollY.current && currentY > 80) {
                setIsVisibled(false);
            } else {
                setIsVisibled(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const scrollToSection = (id: string) => {

        if (pathname !== "/") {
            router.push(`/#${id}`);
            setOpenDropdown(null);
            return;
        }

        const el = document.getElementById(id);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
        setOpenDropdown(null);
    };

    const dropdownPanelBase =
        "absolute top-full left-0 mt-3 w-64 rounded-xl bg-white/95 text-slate-900 shadow-xl ring-1 ring-slate-900/5 overflow-hidden py-2";

    const dropdownItemBase =
        "block w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition";

    const dropdownLabel = (menu: string) =>
        `inline-flex items-center gap-1 text-[15px] font-medium tracking-wide transition 
         ${openDropdown === menu ? "text-yellow-300" : "text-white hover:text-yellow-300"}`;


    return (
        <>
            {/* TOP BAR */}
            <div
                className={`fixed top-0 left-0 w-full z-60 bg-[#212346] text-white text-sm 
                    flex flex-col md:flex-row items-center justify-between px-10 py-2
                    transition-all duration-300 ${isVisibled ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/test_logo_watthangluang.png"
                        width={40}
                        height={40}
                        alt="watthangluang"
                    />
                    <div>
                        <h3>ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง</h3>
                        <h1>WATTANGLOUNG BUDDHIST LEARNING CENTER</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex">
                        <button
                            className="px-4 py-2 cursor-pointer rounded-md text-white 
                                transition-all duration-200 text-[12px] md:text-[16px]"
                            onClick={() => {
                                setOpenDropdown(null);
                                router.push("/login");
                            }}
                        >
                            ระบบรับสมัครนักเรียน
                        </button>

                        <button
                            className="px-4 py-2 cursor-pointer rounded-md text-white 
                                transition-all duration-200 text-[12px] md:text-[16px]"
                            onClick={() => {
                                setOpenDropdown(null);
                                router.push("/login");
                            }}
                        >
                            ระบบปฏิทินกลาง
                        </button>
                    </div>

                    {/* ระบบภาษา */}
                    <div>
                        <p className="px-3 py-1 border border-white/40 rounded-md text-xs cursor-pointer hover:bg-white/10 transition">
                            TH
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                    ${isScrolled ? "bg-black/70 backdrop-blur-lg shadow-lg" : ""}
                    ${isVisibled ? "translate-y-14" : "translate-y-0"}`}
            >
                <div
                    className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 text-white"
                    ref={dropdownRef}
                >
                    <h1
                        className="text-xl font-semibold cursor-pointer"
                        onClick={() => {
                            setOpenDropdown(null);
                            router.push("/");
                        }}
                    >
                        ศพอ.วัดทางหลวง
                    </h1>

                    <div className="hidden md:flex gap-8 text-lg">
                        {/* หน้าแรก */}
                        <button
                            className="hover:text-yellow-300 transition cursor-pointer"
                            onClick={() => {
                                setOpenDropdown(null);
                                router.push("/");
                            }}
                        >
                            หน้าแรก
                        </button>

                        {/* เกี่ยวกับเรา */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("about")}
                                className="hover:text-yellow-300 transition cursor-pointer"
                            >
                                เกี่ยวกับเรา
                            </button>

                            {openDropdown === "about" && (
                                <div 
                                    // className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48"
                                    className={dropdownPanelBase}
                                >
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                        onClick={() => {
                                            setOpenDropdown(null);
                                            router.push(`/about/history`);
                                        }}
                                    >
                                        ประวัติศูนย์
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                        onClick={() => {
                                            setOpenDropdown(null);
                                            router.push(`/about/vision`);
                                        }}
                                    >
                                        วิสัยทัศน์
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                        onClick={() => {
                                            setOpenDropdown(null);
                                            router.push(`/about/org-structure`)
                                        }}
                                    >
                                        โครงสร้างองค์กร
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                        onClick={() => scrollToSection("staff")}
                                    >
                                        บุคลากร
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* กลุ่มบริหารงาน */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("adminGroup")}
                                className="hover:text-yellow-300 transition cursor-pointer"
                            >
                                กลุ่มบริหารงาน
                            </button>

                            {openDropdown === "adminGroup" && (
                                <div 
                                    // className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-64"
                                    className={dropdownPanelBase}
                                >
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("academic")}
                                    >
                                        บริหารงานวิชาการ
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("personnel")}
                                    >
                                        บริหารงานบุคคล
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("budget")}
                                    >
                                        บริหารงานงบประมาณ
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("general")}
                                    >
                                        บริหารงานทั่วไป
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* บริการ */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("services")}
                                className="hover:text-yellow-300 transition cursor-pointer"
                            >
                                บริการ
                            </button>

                            {openDropdown === "services" && (
                                <div 
                                    // className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-60"
                                    className={dropdownPanelBase}
                                >
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("activities")}
                                    >
                                        ตารางเรียน
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("food")}
                                    >
                                        ตารางอาหารกลางวัน
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("parent-guide")}
                                    >
                                        คู่มือผู้ปกครอง
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("rules")}
                                    >
                                        ระเบียบการรับเด็ก
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ข่าวสาร */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("newsMenu")}
                                className="hover:text-yellow-300 transition cursor-pointer"
                            >
                                ข่าวสาร
                            </button>

                            {openDropdown === "newsMenu" && (
                                <div 
                                    // className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-64"
                                    className={dropdownPanelBase}
                                >
                                    <button
                                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                                        onClick={() => scrollToSection("newsMain")}
                                    >
                                        ข่าวสารประชาสัมพันธ์
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                                        onClick={() => scrollToSection("news")}
                                    >
                                        ข่าวสารการเรียนการสอน
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                                        onClick={() => scrollToSection("announce")}
                                    >
                                        ประกาศศูนย์
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                                        onClick={() => scrollToSection("activity")}
                                    >
                                        ภาพกิจกรรม
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                                        onClick={() => scrollToSection("admission")}
                                    >
                                        รับสมัครนักเรียน
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ติดต่อเรา */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("contact")}
                                className="hover:text-yellow-300 transition cursor-pointer"
                            >
                                ติดต่อเรา
                            </button>

                            {openDropdown === "contact" && (
                                <div 
                                    // className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48"
                                    className={dropdownPanelBase}
                                >
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("map")}
                                    >
                                        แผนที่ศูนย์
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("contactForm")}
                                    >
                                        แบบฟอร์มติดต่อ
                                    </button>
                                    <button
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                        onClick={() => scrollToSection("contactInfo")}
                                    >
                                        ช่องทางการติดต่อ
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-yellow-300">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-yellow-300">
                            <FaFacebook />
                        </a>
                        <a href="mailto:example@gmail.com" className="hover:text-yellow-300">
                            <SiGmail />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}