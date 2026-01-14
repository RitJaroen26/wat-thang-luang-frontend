"use client";

import Image from "next/image";
import { useState, useEffect } from "react"; // ✅ เพิ่ม hooks
import { Phone, Clock, MapPin, Coffee, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"; // ✅ เพิ่ม Icon ลูกศร

export default function Cafe() {
    
    const featuredSlides = [
        "/images/cafe/S__14139396_0.jpg", // รูปที่ 1
        "/images/cafe/S__14139395_0.jpg",                // รูปที่ 2 (สมมติว่ามีรูปอื่นๆ)
        "/images/cafe/S__14139397_0.jpg",            // รูปที่ 3
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
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
            
            {/* --- Hero Section --- */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#3E2723]">
                    <Image 
                        src="/images/S__14106626.jpg" 
                        alt="Cafe Background" 
                        fill 
                        className="object-cover opacity-60"
                        unoptimized={true}
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center mt-10 md:mt-30">
                    <span className="bg-[#D4A373] text-[#3E2723] px-4 py-1 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-4 shadow-lg">
                        โครงการเสริมสร้างรายได้
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold drop-shadow-lg mb-2">
                        DekWat Cafe
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 mb-6">
                        เด็กวัดคาเฟ่ — อร่อย อิ่มบุญ อุ่นใจ
                    </p>
                    <div className="flex gap-4">
                        <a href="tel:0889109045" className="flex items-center gap-2 bg-[#FAFAFA] text-[#3E2723] px-6 py-3 rounded-full font-bold hover:bg-[#D4A373] hover:text-white transition-all shadow-md">
                            <Phone size={20} /> 088-910-9045
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Info Bar --- */}
            <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-[#EFEBE9]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373]">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Pre-order Only</h3>
                            <p className="text-sm text-slate-500">กรุณาสั่งล่วงหน้าเพื่อความสดใหม่</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-slate-200"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373]">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">เวลาทำการ</h3>
                            <p className="text-sm text-slate-500">ส.-อา 08.00-12.00 น.</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-slate-200"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#D4A373]">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">พิกัดร้าน</h3>
                            <p className="text-sm text-slate-500">ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Menu Section --- */}
            <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
                
                {/* ✅ 1. Drinks Section (New Layout) */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#3E2723] mb-3 flex items-center justify-center gap-2">
                            <Coffee size={32} /> เมนูเครื่องดื่ม (Drinks)
                        </h2>
                        <div className="w-20 h-1 bg-[#D4A373] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* 🖼️ Left: Image Slider (5 Cols) */}
                        <div className="lg:col-span-5 sticky top-24">
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                {/* Image Display */}
                                <div className="absolute inset-0 bg-slate-200">
                                    <Image 
                                        src={featuredSlides[currentSlide]} 
                                        alt="Featured Drink" 
                                        fill 
                                        className="object-cover transition-all duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                </div>

                                {/* Text Overlay */}
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="text-sm font-light uppercase tracking-widest mb-1 text-[#D4A373]">Signature</p>
                                    <h3 className="text-3xl font-bold drop-shadow-md">เมนูแนะนำ</h3>
                                </div>

                                {/* Navigation Buttons */}
                                <button 
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {featuredSlides.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? "bg-[#D4A373] w-6" : "bg-white/50"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 📜 Right: Menu List (7 Cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Coffee Card */}
                            <Image 
                                src="/images/cafe/cafe_menu_image.png"
                                alt="menu.cafe"
                                width={550}
                                height={500}
                            />

                        </div>
                    </div>
                </div>

                {/* 2. Bakery Highlight (เหมือนเดิม) */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-[#3E2723] mb-3">
                            เบเกอรี่โฮมเมด (Bakery)
                        </h2>
                        <div className="w-20 h-1 bg-[#D4A373] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.bakery.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer border border-[#EFEBE9]">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-lg font-bold text-[#3E2723] mb-2">{item.name}</h3>
                                    <p className="text-[#D4A373] font-bold">ราคา: {item.price}</p>
                                </div>
                            </div>
                        ))}
                        
                        <div className="bg-[#FFF8E1] rounded-2xl overflow-hidden border-2 border-dashed border-[#D4A373] flex flex-col items-center justify-center p-6 min-h-[200px]">
                            <p className="text-[#5D4037] font-medium text-center">
                                มีเมนูเบเกอรี่อื่นๆ <br/>สอบถามเพิ่มเติมได้ค่ะ
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-50 md:hidden">
                <a 
                    href="tel:0889109045"
                    className="flex items-center justify-center gap-3 w-full bg-[#3E2723] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#5D4037] transition-all"
                >
                    <Phone size={20} /> โทรสั่งล่วงหน้า 088-910-9045
                </a>
            </div>

            <div className="text-center pb-10 hidden md:block">
                 <div className="inline-block bg-[#3E2723] text-white px-8 py-4 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold mb-1">สั่งออเดอร์ล่วงหน้า / Pre-order</h3>
                    <p className="text-[#D4A373] text-2xl font-bold flex items-center gap-3 justify-center">
                        <Phone size={24} /> 088-910-9045
                    </p>
                 </div>
            </div>

        </div>
    );
}