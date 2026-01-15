"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

// Combine the types into a single interface with optional properties
type MenuItem = {
    label: string;
    goto?: string;
    section?: string;
};

type MobileMenu = {
    key?: string;
    title?: string; // Add title as optional since you use it
    label?: string; // Add label as optional for direct links
    action?: () => void;
    items?: MenuItem[];
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

    // Define the menu structure directly or use the type
    const menuStructure: MobileMenu[] = [
        {
            key: "about",
            title: "เกี่ยวกับเรา",
            items: [
                { label: "ประวัติศูนย์", goto: "/about/history" },
                { label: "วิสัยทัศน์", goto: "/about/vision" },
                { label: "โครงสร้างองค์กร", goto: "/about/org-structure" },
            ]
        },
        {
            key: "services",
            title: "บริการ",
            items: [
                { label: "ตารางเรียน", section: "activities" },
                { label: "คาเฟ่เด็กวัด", goto: "/services/cafe_dekwat" },
                { label: "สมทบทุนการศึกษา", goto: "/services/donation" },
            ]
        },
        {
            key: "newsMenu",
            title: "ข่าวสาร",
            items: [
                { label: "ข่าวสารประชาสัมพันธ์", section: "news" },
                { label: "รับสมัครนักเรียน", goto: `${process.env.NEXT_PUBLIC_API_REG}` },
            ]
        },
        {
            key: "contact",
            title: "ติดต่อเรา",
            items: [
                { label: "แผนที่ศูนย์", section: "maps" },
                { label: "ช่องทางการติดต่อ", section: "contact" },
            ]
        }
    ];

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileOpen]);

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

    return (
        <>
            <div className={`fixed top-0 left-0 w-full z-[80] bg-[#212346] text-white transition-transform duration-300 ${isVisibled && !isMobileOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="max-w-7xl mx-auto px-4 py-3 md:py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src="/images/test_logo_watthangluang.png" width={42} height={42} alt="logo" className="w-10 h-10 md:w-11 md:h-11" />
                        <div className="leading-tight">
                            <h3 className="text-[10px] md:text-xs font-medium opacity-90">ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง</h3>
                            <h1 className="text-[9px] md:text-[10px] tracking-wide opacity-70">WATTHANGLOUNG BUDDHIST LEARNING CENTER</h1>
                        </div>
                    </div>

                    <div className="hidden sm:flex gap-3 text-[14px]">
                        <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_REG}`)} className="px-4 py-1.5 bg-white/10 rounded hover:bg-white/20 transition">รับสมัครนักเรียน</button>
                        <button onClick={() => router.push("/login")} className="px-4 py-1.5 bg-white/10 rounded hover:bg-white/20 transition">ระบบปฏิทินกลาง</button>
                        <span className="px-3 py-1.5 border border-white/20 rounded text-[10px]">TH</span>
                    </div>
                </div>
            </div>

            <nav 
                // className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"} ${isVisibled ? "translate-y-[64px] md:translate-y-[68px]" : "translate-y-0"}`}
                className={`
                    fixed top-0 left-0 w-full z-[100] transition-all duration-300 
                    ${isScrolled || isMobileOpen ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"} 
                    
                    /* Key Fix: If menu is open, always show navbar (translate-y-0). If closed, follow isVisibled logic */
                    ${isMobileOpen 
                        ? "translate-y-0" 
                        : (isVisibled ? "translate-y-[52px] md:translate-y-[68px]" : "translate-y-0")
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white" ref={dropdownRef}>
                    <div className="text-lg font-semibold cursor-pointer tracking-wide" onClick={() => router.push("/")}>ศพอ.วัดทางหลวง</div>

                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <button onClick={() => router.push("/")} className="hover:text-yellow-400 transition">หน้าแรก</button>
                        {menuStructure.map((menu) => (
                            <div key={menu.key} className="relative group">
                                <button className="flex items-center gap-1 hover:text-yellow-400 transition" onClick={() => menu.key && toggleDropdown(menu.key)} onMouseEnter={() => menu.key && setOpenDropdown(menu.key)}>
                                    {menu.title} <ChevronDown size={14} />
                                </button>
                                {/* Dropdown */}
                                {menu.key && openDropdown === menu.key && (
                                    <div className="absolute top-full left-0 pt-4" onMouseLeave={() => setOpenDropdown(null)}>
                                        <div className="w-56 bg-white text-slate-800 rounded-lg shadow-xl overflow-hidden py-2 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                                            {menu.items?.map((item, i) => (
                                                <button key={i} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 hover:text-yellow-600 transition-colors" onClick={() => {
                                                    setOpenDropdown(null);
                                                    if (item.goto) router.push(item.goto);
                                                    else if (item.section) scrollToSection(item.section);
                                                }}>
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:flex gap-4 text-xl">
                        <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
                        <a href="https://web.facebook.com/WATTANGLOUNGLEARN/?locale=th_TH&_rdc=1&_rdr#" className="hover:text-yellow-300"><FaFacebook /></a>
                        <a href="mailto:example@gmail.com" className="hover:text-yellow-300"><SiGmail /></a>
                    </div>

                    <button className="md:hidden z-[60] relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <div className={`md:hidden fixed inset-0 z-[80] bg-[#0B0C15] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                <div className="flex flex-col h-full pt-32 px-6 pb-10 overflow-y-auto">
                    <div className="space-y-1">
                        <button onClick={() => { setIsMobileOpen(false); router.push("/"); }} className="w-full text-left text-md font-bold text-white/90 py-4 border-b border-white/5 hover:text-yellow-400 transition-colors">
                            หน้าแรก
                        </button>

                        {menuStructure.map((menu) => (
                            <div key={menu.key} className="border-b border-white/5">
                                <button
                                    className={`w-full flex items-center justify-between text-md font-bold py-4 transition-colors ${openDropdown === menu.key ? "text-yellow-400" : "text-white/90"}`}
                                    onClick={() => setOpenDropdown(openDropdown === menu.key ? null : menu.key || null)}
                                >
                                    {menu.title}
                                    <span className={`transform transition-transform duration-300 ${openDropdown === menu.key ? "rotate-180" : ""}`}>
                                        <ChevronDown size={24} />
                                    </span>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === menu.key ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-white/10 ml-1">
                                        {menu.items?.map((item, i) => (
                                            <button key={i} className="text-left text-sm text-white/60 hover:text-white py-2 transition-colors" onClick={() => {
                                                if (item.goto) router.push(item.goto);
                                                else if (item.section) scrollToSection(item.section);
                                                setIsMobileOpen(false);
                                            }}>
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="flex flex-col gap-4 mb-8">
                            <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_REG}`)} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg">
                                ระบบรับสมัครนักเรียน
                            </button>
                            <button onClick={() => router.push("/login")} className="w-full py-3 rounded-xl bg-white/10 text-white font-medium border border-white/10">
                                ระบบปฏิทินกลาง
                            </button>
                        </div>

                        <div className="flex justify-center gap-8 text-white/50 text-md">
                            <a href="#" className="hover:text-white transition"><FaInstagram size={20} /></a>
                            <a href="#" className="hover:text-white transition"><FaFacebook size={20} /></a>
                            <a href="#" className="hover:text-white transition"><SiGmail size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}