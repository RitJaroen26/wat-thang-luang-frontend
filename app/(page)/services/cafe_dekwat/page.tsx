"use client";

import Image from "next/image";
import { useState, useEffect } from "react"; // ✅ เพิ่ม hooks
import { Phone, Clock, MapPin, Coffee, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"; // ✅ เพิ่ม Icon ลูกศร

export default function Cafe() {

    const featuredSlides = [
        "/images/cafe/S__14139396_0.jpg", // รูปที่ 1
        "/images/cafe/S__14139395_0.jpg",                // รูปที่ 2 (สมมติว่ามีรูปอื่นๆ)
        "/images/cafe/S__14139397_0.jpg",            // รูปที่ 3
        "/images/cafe/S__14139398_0.jpg",            // รูปที่ 3
    ];

    // State สำหรับควบคุมสไลด์
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto Slide ทุก 4 วินาที
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [featuredSlides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    };

    // ข้อมูลเมนู
    const menuItems = {
        coffee: [
            { name: "กาแฟดำ (Black Coffee)", price: 40 },
            { name: "กาแฟเย็น (Iced Coffee)", price: 40 },
            { name: "กาแฟนม (Milk Coffee)", price: 40 },
            { name: "กาแฟลาเต้ (Latte)", price: 45 },
            { name: "กาแฟมอคค่า (Mocha)", price: 45 },
        ],
        tea: [
            { name: "ชาเย็น (Iced Tea)", price: 40 },
            { name: "ชาไทยนมสด (Thai Milk Tea)", price: 45 },
            { name: "ชาดำเย็น (Iced Black Tea)", price: 40 },
            { name: "ชาเขียว (Green Tea)", price: 40 },
        ],
        others: [
            { name: "โกโก้เย็น (Iced Cocoa)", price: 40 },
            { name: "โกโก้สตรอเบอร์รี่ (Strawberry Cocoa)", price: 45 },
        ],
        bakery: [
            { name: "ทาร์ตไข่ (Egg Tart)", price: "สอบถาม", image: "/images/tad_egg.jpg" },
        ]
    };

    // Component ย่อยสำหรับรายการ (ลดโค้ดซ้ำ)
    const MenuItemRow = ({ name, price }: { name: string, price: number | string }) => (
        <li className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2 last:border-0 last:pb-0">
            <span className="text-slate-700 font-medium text-lg">{name}</span>
            <span className="text-[#D4A373] font-bold text-xl">{price}.-</span>
        </li>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-24 md:pb-20">

            {/* --- Hero Section --- */}
            <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#3E2723]">
                    <Image
                        src="/images/S__14106626.jpg"
                        alt="Cafe Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                        unoptimized={true}
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center mt-8 sm:mt-0">
                    <span className="bg-[#D4A373] text-[#3E2723] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase mb-4 shadow-lg animate-in fade-in zoom-in duration-700">
                        โครงการเสริมสร้างรายได้
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold drop-shadow-lg mb-3 animate-in slide-in-from-bottom-4 duration-700">
                        DekWat Cafe
                    </h1>
                    <p className="text-base sm:text-xl lg:text-2xl font-light opacity-90 mb-8 max-w-lg mx-auto">
                        เด็กวัดคาเฟ่ — อร่อย อิ่มบุญ อุ่นใจ
                    </p>
                    <div className="flex gap-4">
                        <a href="tel:0889109045" className="flex items-center gap-2 bg-[#FAFAFA] text-[#3E2723] px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold hover:bg-[#D4A373] hover:text-white transition-all shadow-md text-sm sm:text-base">
                            <Phone size={18} className="sm:w-5 sm:h-5" />
                            <span>088-910-9045</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Info Bar --- */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 border border-[#EFEBE9]">

                    {/* Item 1 */}
                    <div className="flex items-center gap-4 w-full md:w-auto border-b md:border-b-0 border-slate-100 pb-4 md:pb-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373] shrink-0">
                            <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base sm:text-lg text-[#3E2723]">Pre-order Only</h3>
                            <p className="text-xs sm:text-sm text-slate-500">กรุณาสั่งล่วงหน้าเพื่อความสดใหม่</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-200"></div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-4 w-full md:w-auto border-b md:border-b-0 border-slate-100 pb-4 md:pb-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373] shrink-0">
                            <Clock size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base sm:text-lg text-[#3E2723]">เวลาทำการ</h3>
                            <p className="text-xs sm:text-sm text-slate-500">ส.-อา 08.00-12.00 น.</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-200"></div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373] shrink-0">
                            <MapPin size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base sm:text-lg text-[#3E2723]">พิกัดร้าน</h3>
                            <p className="text-xs sm:text-sm text-slate-500 truncate max-w-[200px] sm:max-w-none">ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Menu Section --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">

                {/* 1. Drinks Section */}
                <div>
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-bold text-[#3E2723] mb-3 flex items-center justify-center gap-3">
                            <Coffee className="w-8 h-8 sm:w-10 sm:h-10" /> เมนูเครื่องดื่ม
                        </h2>
                        <div className="w-16 sm:w-24 h-1.5 bg-[#D4A373] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                        {/* 🖼️ Image Slider (แสดงเต็มในมือถือ / Sticky ใน Desktop) */}
                        <div className="lg:col-span-5 order-1 lg:order-1 sticky top-24 z-10">
                            <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-4 border-white">
                                <div className="absolute inset-0 bg-slate-200">
                                    <Image
                                        src={featuredSlides[currentSlide]}
                                        alt="Featured Drink"
                                        fill
                                        className="object-cover transition-all duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                                </div>

                                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white">
                                    <p className="text-xs sm:text-sm font-light uppercase tracking-widest mb-1 text-[#D4A373]">Recommend</p>
                                    <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-md">เมนูแนะนำ</h3>
                                </div>

                                <button onClick={prevSlide} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all"><ChevronLeft size={24} /></button>
                                <button onClick={nextSlide} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all"><ChevronRight size={24} /></button>

                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {featuredSlides.map((_, idx) => (
                                        <div key={idx} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${idx === currentSlide ? "bg-[#D4A373] w-4 sm:w-6" : "bg-white/50"}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 📜 Menu List */}
                        <div className="lg:col-span-7 space-y-8">
                            <Image
                                src="/images/cafe/cafe_menu_image.png"
                                alt="menu.cafe"
                                width={550}
                                height={500}
                            />

                        </div>
                    </div>
                </div>

                {/* 2. Bakery Highlight */}
                <div>
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-bold text-[#3E2723] mb-3">เบเกอรี่โฮมเมด</h2>
                        <div className="w-16 sm:w-24 h-1.5 bg-[#D4A373] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {menuItems.bakery.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer border border-[#EFEBE9] flex flex-col">
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6 text-center flex-grow flex flex-col justify-center bg-white relative z-10">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#3E2723] mb-2">{item.name}</h3>
                                    <p className="text-[#D4A373] font-bold text-base sm:text-lg">ราคา: {item.price}</p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-[#FFF8E1] rounded-2xl overflow-hidden border-2 border-dashed border-[#D4A373] flex flex-col items-center justify-center p-8 min-h-[200px]">
                            <p className="text-[#5D4037] font-medium text-center text-sm sm:text-base leading-relaxed">
                                มีเมนูเบเกอรี่อื่นๆ <br />สอบถามเพิ่มเติมได้ค่ะ
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- Footer / CTA (Mobile Fixed Bottom) --- */}
            <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 z-30 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <a href="tel:0889109045" className="flex items-center justify-center gap-3 w-full bg-[#3E2723] text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-all">
                    <Phone size={20} className="animate-pulse" /> โทรสั่งล่วงหน้า 088-910-9045
                </a>
            </div>

            {/* --- Footer CTA (Desktop) --- */}
            <div className="text-center pb-12 hidden md:block">
                <div className="inline-block bg-[#3E2723] text-white px-10 py-5 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2 opacity-90">สั่งออเดอร์ล่วงหน้า / Pre-order</h3>
                    <p className="text-[#D4A373] text-3xl font-bold flex items-center gap-3 justify-center">
                        <Phone size={28} /> 088-910-9045
                    </p>
                </div>
            </div>

        </div>
    );
}