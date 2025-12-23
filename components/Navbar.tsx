"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";

type DesktopMenuItem = {
    label: string;
    goto?: string;
    section?: string;
};

type MobileSubItem = {
    label: string;
    goto?: string;
    section?: string;
};

type MobileMenu = {
    key?: string;
    label: string;
    action?: () => void;
    items?: MobileSubItem[];
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisibled, setIsVisibled] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const lastScrollY = useRef(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    const mobileMenu: MobileMenu[] = [
        { label: "หน้าแรก", action: () => router.push("/") },
        {
            key: "about",
            label: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                { label: "บุคลากร", section: "staff" },
            ]
        },
        {
            key: "about",
            label: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                { label: "บุคลากร", section: "staff" },
            ]
        },
        {
            key: "about",
            label: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                { label: "บุคลากร", section: "staff" },
            ]
        },
        {
            key: "about",
            label: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                { label: "บุคลากร", section: "staff" },
            ]
        },
        {
            key: "about",
            label: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                { label: "บุคลากร", section: "staff" },
            ]
        }
    ];

    const mobileRouteMap: Record<string, string> = {
        "ประวัติศูนย์": "/about/history",
        "วิสัยทัศน์": "/about/vision",
        "โครงสร้างองค์กร": "/about/org-structure",
        "บุคลากร": "/#staff",

        "บริหารงานวิชาการ": "/#academic",
        "บริหารงานบุคคล": "/#personnel",
        "บริหารงานงบประมาณ": "/#budget",
        "บริหารงานทั่วไป": "/#general",

        "ตารางเรียน": "/#activities",
        "จองห้องสัมมนา": "/#rules",
        "ออกบูธกิจกรรม": "/#rules",
        "สมทบทุนการศึกษา": "/#rules",

        "ข่าวประชาสัมพันธ์": "/#newsMain",
        "ข่าวการเรียนการสอน": "/#news",
        "ประกาศศูนย์": "/#announce",
        "ภาพกิจกรรม": "/#activity",
        "รับสมัครนักเรียน": "/#admission",

        "แผนที่ศูนย์": "/#map",
        "แบบฟอร์มติดต่อ": "/#contactForm",
        "ช่องทางการติดต่อ": "/#contactInfo",
    };

    useEffect(() => {
        setOpenDropdown(null);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
        setOpenDropdown(null);
    };

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
            <div
                className={`
        fixed top-0 left-0 w-full z-60 bg-[#212346] text-white
        transition-all duration-300 backdrop-blur-md
        ${isVisibled ? "translate-y-0" : "-translate-y-full"}
    `}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col md:flex-row 
                     items-center justify-between gap-3 md:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4 text-center md:text-left">
                        <Image
                            src="/images/test_logo_watthangluang.png"
                            width={42}
                            height={42}
                            alt="watthangluang"
                            className="w-10 h-10 sm:w-11 sm:h-11"
                        />
                        <div className="leading-tight">
                            <h3 className="text-[10px] sm:text-xs md:text-sm font-medium">
                                ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง
                            </h3>
                            <h1 className="text-[9px] sm:text-[11px] md:text-sm tracking-wide opacity-90">
                                WATTANGLOUNG BUDDHIST LEARNING CENTER
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                        <div className="flex gap-2 sm:gap-4 items-center">
                            <button
                                className="
                                    px-3 py-1.5 sm:px-4 sm:py-2 
                                    rounded-md text-white bg-white/10 hover:bg-white/20
                                    transition-all duration-200 text-[10px] sm:text-sm md:text-[15px]
                                    shadow-sm border border-white/10 cursor-pointer
                                "
                                onClick={() => {
                                    setOpenDropdown(null);
                                    router.push(`${process.env.NEXT_PUBLIC_API_REG}`);
                                }}
                            >
                                ระบบรับสมัครนักเรียน
                            </button>

                            <button
                                className="
                                    px-3 py-1.5 sm:px-4 sm:py-2 
                                    rounded-md text-white bg-white/10 hover:bg-white/20
                                    transition-all duration-200 text-[10px] sm:text-sm md:text-[15px]
                                    shadow-sm border border-white/10 cursor-pointer
                                "
                                onClick={() => {
                                    setOpenDropdown(null);
                                    router.push("/login");
                                }}
                            >
                                ระบบปฏิทินกลาง
                            </button>

                            <div>
                                <p className="
                                    px-2.5 py-1 sm:px-3 sm:py-1.5 
                                    border border-white/40 rounded-md 
                                    text-[10px] sm:text-xs cursor-pointer
                                    hover:bg-white/10 transition
                                ">
                                    TH
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <nav
                // className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                //     ${isScrolled ? "bg-black/70 md:backdrop-blur-lg md:shadow-lg" : ""}
                //     ${isVisibled ? "translate-y-26 md:translate-y-16" : "translate-y-0"}`}

                className={`
                    fixed top-0 left-0 w-full z-50 transition-all duration-300
                            
                    /* 📱 Mobile: always black */
                    bg-black/80 backdrop-blur-md
                            
                    /* 🖥 Desktop: override mobile bg */
                    md:${isScrolled
                        ? "bg-black/70 backdrop-blur-lg shadow-lg"
                        : ""
                    }
                
                    ${isVisibled
                        ? "translate-y-[95px] md:translate-y-[64px]"
                        : "translate-y-0"
                    }
                `}
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
                        <button
                            className="hover:text-yellow-300 transition cursor-pointer"
                            onClick={() => {
                                setOpenDropdown(null);
                                router.push("/");
                            }}
                        >
                            หน้าแรก
                        </button>

                        {[
                            {
                                key: "about",
                                title: "เกี่ยวกับเรา",
                                items: [
                                    { label: "ประวัติศูนย์", goto: "/about/history" },
                                    { label: "วิสัยทัศน์", goto: "/about/vision" },
                                    { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                                    { label: "บุคลากร", section: "staff" },
                                ]
                            },
                            {
                                key: "adminGroup",
                                title: "กลุ่มบริหารงาน",
                                items: [
                                    { label: "บริหารงานวิชาการ", section: "academic" },
                                    { label: "บริหารงานบุคคล", section: "personnel" },
                                    { label: "บริหารงานงบประมาณ", section: "budget" },
                                    { label: "บริหารงานทั่วไป", section: "general" },
                                ]
                            },
                            {
                                key: "services",
                                title: "บริการ",
                                items: [
                                    { label: "ตารางเรียน", section: "activities" },
                                    { label: "การจองห้องสัมมนา", section: "rules" },
                                    { label: "ออกบูธกิจกรรม/ร้านค้า", section: "rules" },
                                    { label: "สมทบทุนการศึกษา", section: "rules" },
                                ]
                            },
                            {
                                key: "newsMenu",
                                title: "ข่าวสาร",
                                items: [
                                    { label: "ข่าวสารประชาสัมพันธ์", section: "newsMain" },
                                    { label: "ข่าวสารการเรียนการสอน", section: "news" },
                                    { label: "ประกาศศูนย์", section: "announce" },
                                    { label: "ภาพกิจกรรม", section: "activity" },
                                    { label: "รับสมัครนักเรียน", section: "admission" },
                                ]
                            },
                            {
                                key: "contact",
                                title: "ติดต่อเรา",
                                items: [
                                    { label: "แผนที่ศูนย์", section: "map" },
                                    { label: "แบบฟอร์มติดต่อ", section: "contactForm" },
                                    { label: "ช่องทางการติดต่อ", section: "contactInfo" },
                                ]
                            }
                        ].map((menu) => (
                            <div className="relative" key={menu.key}>
                                <button
                                    onClick={() => toggleDropdown(menu.key)}
                                    className="hover:text-yellow-300 transition cursor-pointer"
                                >
                                    {menu.title}
                                </button>

                                {openDropdown === menu.key && (
                                    <div className={dropdownPanelBase}>
                                        {menu.items.map((item, i) => (
                                            <button
                                                key={i}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                onClick={() => {
                                                    setOpenDropdown(null);
                                                    if (item.goto) router.push(item.goto);
                                                    else scrollToSection(item.section || "");
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* SOCIAL ICONS (DESKTOP ONLY) */}
                    <div className="hidden md:flex gap-4 text-xl">
                        <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
                        <a href="https://web.facebook.com/WATTANGLOUNGLEARN/?locale=th_TH&_rdc=1&_rdr#" className="hover:text-yellow-300"><FaFacebook /></a>
                        <a href="mailto:example@gmail.com" className="hover:text-yellow-300"><SiGmail /></a>
                    </div>

                    {/* HAMBURGER (MOBILE) */}
                    <button
                        className="md:hidden text-3xl"
                        onClick={() => {
                            setIsMobileOpen((prev) => !prev);
                            setOpenDropdown(null);
                        }}
                    >
                        {isMobileOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* MOBILE MENU PANEL */}
                {isMobileOpen && (
                    <div className="md:hidden bg-black/80 backdrop-blur-xl text-white px-6 py-4 space-y-3 animate-slideDown">
                        <button
                            className="w-full text-left py-2 border-b border-white/10 flex justify-between items-center"
                            onClick={() => {
                                setOpenDropdown(null);
                                router.push("/");
                            }}
                        >
                            หน้าแรก
                        </button>

                        {[
                            {
                                key: "about",
                                title: "เกี่ยวกับเรา",
                                items: [
                                    { label: "ประวัติศูนย์", goto: "/about/history" },
                                    { label: "วิสัยทัศน์", goto: "/about/vision" },
                                    { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
                                    { label: "บุคลากร", section: "staff" },
                                ]
                            },
                            {
                                key: "adminGroup",
                                title: "กลุ่มบริหารงาน",
                                items: [
                                    { label: "บริหารงานวิชาการ", section: "academic" },
                                    { label: "บริหารงานบุคคล", section: "personnel" },
                                    { label: "บริหารงานงบประมาณ", section: "budget" },
                                    { label: "บริหารงานทั่วไป", section: "general" },
                                ]
                            },
                            {
                                key: "services",
                                title: "บริการ",
                                items: [
                                    { label: "ตารางเรียน", section: "activities" },
                                    { label: "การจองห้องสัมมนา", section: "rules" },
                                    { label: "ออกบูธกิจกรรม/ร้านค้า", section: "rules" },
                                    { label: "สมทบทุนการศึกษา", section: "rules" },
                                ]
                            },
                            {
                                key: "newsMenu",
                                title: "ข่าวสาร",
                                items: [
                                    { label: "ข่าวสารประชาสัมพันธ์", section: "newsMain" },
                                    { label: "ข่าวสารการเรียนการสอน", section: "news" },
                                    { label: "ประกาศศูนย์", section: "announce" },
                                    { label: "ภาพกิจกรรม", section: "activity" },
                                    { label: "รับสมัครนักเรียน", section: "admission" },
                                ]
                            },
                            {
                                key: "contact",
                                title: "ติดต่อเรา",
                                items: [
                                    { label: "แผนที่ศูนย์", section: "map" },
                                    { label: "แบบฟอร์มติดต่อ", section: "contactForm" },
                                    { label: "ช่องทางการติดต่อ", section: "contactInfo" },
                                ]
                            }
                        ].map((menu) => (
                            <div key={`${menu.key}`}>
                                <button
                                    className="w-full text-left py-2 border-b border-white/10 flex justify-between items-center"
                                    onClick={() => {
                                        setOpenDropdown(
                                            openDropdown === (menu.key)
                                                ? null
                                                : (menu.key)
                                        );
                                    }}
                                >
                                    {menu.title}

                                    {menu.items && (
                                        <span className="text-lg">
                                            {openDropdown === (menu.key ?? menu.title) ? "-" : "+"}
                                        </span>
                                    )}
                                </button>

                                {menu.items && openDropdown === (menu.key ?? menu.title) && (
                                    <div className="pl-4 pt-1 pb-2 space-y-1 text-md text-gray-300">
                                        {menu.items.map((sub, j) => (
                                            <button
                                                key={`${sub.label}-${j}`}
                                                className="block w-full text-left py-1 hover:text-yellow-300"
                                                onClick={() => {
                                                    setOpenDropdown(null);
                                                    setIsMobileOpen(false);

                                                    if (sub.goto) router.push(sub.goto);
                                                    else if (sub.section) router.push(`/#${sub.section}`);
                                                }}
                                            >
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-6 gap-8 text-xl transition">
                            <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
                            <a href="#" className="hover:text-yellow-300"><FaFacebook /></a>
                            <a href="mailto:example@gmail.com" className="hover:text-yellow-300"><SiGmail /></a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}


// {/* <div className="md:hidden bg-black/80 backdrop-blur-xl text-white px-6 py-4 space-y-3 animate-slideDown">
//                         {mobileMenu.map((menu) => (
//                             <div key={menu.key ?? menu.label}>

//                                 {/* Parent button */}
//                                 <button
//                                     className="w-full text-left py-2 border-b border-white/10 flex justify-between items-center"
//                                     onClick={() => toggleDropdown(menu.key ?? menu.label)}
//                                 >
//                                     {menu.label}
//                                     {menu.items && (
//                                         <span className="text-lg">
//                                             {openDropdown === (menu.key || menu.label) ? "−" : "+"}
//                                         </span>
//                                     )}
//                                 </button>

//                                 {/* Sub items */}
//                                 {menu.items && openDropdown === (menu.key ?? menu.label) && (
//                                     <div className="pl-4 pt-1 pb-2 space-y-1 text-sm text-gray-300">
//                                         {menu.items.map((sub, j) => (
//                                             <button
//                                                 key={j}
//                                                 className="block w-full text-left py-1 hover:text-yellow-300"
//                                             >
//                                                 {sub}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}

//                         {/* SOCIAL ICONS MOBILE */}
//                         <div className="flex gap-6 text-2xl pt-4">
//                             <FaInstagram className="hover:text-yellow-300" />
//                             <FaFacebook className="hover:text-yellow-300" />
//                             <SiGmail className="hover:text-yellow-300" />
//                         </div>
//                     </div> */}