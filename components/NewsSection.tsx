"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import ParallaxClientProvider from "./ParallaxClientProvider";
import EventCalendar from "./Calendar";
import Link from "next/link";
import { api } from "@/libs/axios";
import NewsDetailView from "@/components/NewsDetailView";

// Interface สำหรับข้อมูลข่าว
interface Post {
    id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image_url: string | null;
    type: 'news' | 'announcement';
    is_pinned: boolean;
    created_at: string;
}

const tabs = ["ทั้งหมด", "ข่าวประชาสัมพันธ์", "ข่าวการเรียนการสอน", "กิจกรรม"];
const primaryColor = "#B89B5F";
const secondaryColor = "#1D2340";

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const [viewingPostId, setViewingPostId] = useState<number | null>(null);

    // State สำหรับ Pinned Post Slideshow
    const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);
    const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);

    // Fetch Data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/api/public/posts');
                const allPosts = res.data;
                setPosts(allPosts);

                // กรองเอาเฉพาะข่าวที่ปักหมุดมาทำสไลด์
                const pinned = allPosts.filter((p: Post) => p.is_pinned);
                setPinnedPosts(pinned.length > 0 ? pinned : allPosts.slice(0, 3)); // ถ้าไม่มีปักหมุดเลย ให้เอา 3 ข่าวล่าสุดมาโชว์แทน
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Auto Slide Logic (เปลี่ยนทุก 5 วินาที)
    useEffect(() => {
        if (pinnedPosts.length <= 1) return; // ถ้ามีข่าวเดียวไม่ต้องสไลด์

        const interval = setInterval(() => {
            setCurrentPinnedIndex((prev) => (prev + 1) % pinnedPosts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [pinnedPosts]);

    // Filter Logic สำหรับ Grid ด้านล่าง
    const filteredPosts = posts.filter(post => {
        if (activeTab === "ทั้งหมด") return true;
        if (activeTab === "ข่าวประชาสัมพันธ์") return post.type === 'announcement';
        if (activeTab === "ข่าวกิจกรรม") return post.type === 'news';
        return true;
    });

    // ดึงข่าวปัจจุบันที่จะแสดงใน Pinned Section
    const currentPinned = pinnedPosts[currentPinnedIndex];

    return (
        <ParallaxClientProvider>
            <main className="relative overflow-hidden bg-white min-h-screen">

                {/* --- HEADER PARALLAX --- */}
                <ParallaxBanner className="h-[750px] md:h-[700px]" layers={[
                    { image: "/images/S__13099032_0.jpg", speed: -25 },
                    { children: <div className="absolute inset-0 bg-black/80"></div>, speed: 0 },
                    {
                        speed: -10, children: (
                            <div className="relative w-full h-full pt-12 md:pt-24 pb-20 max-w-7xl mx-auto px-6 mt-10 md:mt-20">

                                {/* Headline */}
                                <div className="text-center text-white mb-12">
                                    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-wide">ข่าวสาร & กิจกรรม</h1>
                                    <p className="mt-3 text-base md:text-lg text-gray-200 font-light">อัปเดตความเคลื่อนไหวล่าสุดของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์</p>
                                </div>

                                {/* --- 🔥 SLIDESHOW SECTION (Featured News) --- */}
                                {currentPinned && (
                                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center animate-in fade-in duration-700">

                                        {/* Slide Content */}
                                        <div className="relative w-full lg:w-3/5 xl:w-[65%] h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">

                                            {/* Image Slide with Transition */}
                                            {pinnedPosts.map((post, index) => (
                                                <div
                                                    key={post.id}
                                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentPinnedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                        }`}
                                                    onClick={() => setViewingPostId(post.id)}
                                                >
                                                    <Link href={`/news&annoucement/${post.id}`} className="block w-full h-full relative">
                                                        <Image
                                                            src={post.image_url || "/images/placeholder.jpg"}
                                                            fill
                                                            alt={post.title}
                                                            className="object-cover transition-transform duration-[5000ms] ease-out scale-100 hover:scale-110" // Zoom effect
                                                            unoptimized={true}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                                        {/* Text Content */}
                                                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                                                            <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest bg-[#B89B5F] px-3 py-1 rounded-full uppercase shadow-md mb-3">
                                                                {post.type === 'news' ? 'ข่าวสาร' : 'ประชาสัมพันธ์'}
                                                            </span>
                                                            <h2 className="text-2xl md:text-4xl font-bold leading-snug drop-shadow-md line-clamp-2 hover:text-[#B89B5F] transition-colors">
                                                                {post.title}
                                                            </h2>
                                                            <p className="hidden md:block text-sm md:text-base mt-2 text-gray-300 line-clamp-2 font-light">
                                                                {post.excerpt || "คลิกเพื่ออ่านรายละเอียดเพิ่มเติม..."}
                                                            </p>
                                                            <p className="text-xs mt-4 text-gray-400 flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 bg-[#B89B5F] rounded-full"></span>
                                                                {new Date(post.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}

                                            {/* Dots Indicators */}
                                            <div className="absolute top-6 right-6 flex gap-2 z-20">
                                                {pinnedPosts.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentPinnedIndex(idx)}
                                                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all shadow-sm ${idx === currentPinnedIndex ? 'bg-[#B89B5F] w-6 md:w-8' : 'bg-white/50 hover:bg-white'
                                                            }`}

                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Calendar (Sidebar) */}
                                        <div className="hidden lg:flex w-full lg:w-2/5 xl:w-[35%] justify-center lg:justify-start items-start">
                                            <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl w-full border border-white/20">
                                                <EventCalendar />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* ------------------------------------------- */}

                            </div>
                        )
                    }]}
                />

                {viewingPostId ? (
                    // 🟢 VIEW MODE: แสดงรายละเอียดข่าว
                    <section className="max-w-7xl mx-auto px-6 mt-10 pb-20 min-h-screen">
                        <NewsDetailView
                            postId={viewingPostId}
                            onBack={() => setViewingPostId(null)} // กดปุ่มย้อนกลับ ให้ set เป็น null เพื่อกลับหน้า list
                        />
                    </section>
                ) : (
                    <>
                        <section className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap gap-3 justify-center">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 md:px-8 md:py-2.5 rounded-full text-sm font-medium tracking-wide transition-all border shadow-sm z-30 ${activeTab === tab ? "bg-[#b89b5f] text-white border-[#b89b5f] shadow-lg scale-105" : "bg-white text-[#6b6b6b] border-[#ded2b4] hover:bg-[#f3ece0]"}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </section>

                        {/* --- News Grid List --- */}
                        <section className="max-w-7xl mx-auto px-6 mt-16 space-y-20 pb-20">
                            <div>
                                <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-100">
                                    <div className="w-1.5 h-8 bg-[#B89B5F] rounded-full"></div>
                                    <h2 className={`text-2xl md:text-3xl font-bold text-[${secondaryColor}]`}>
                                        {activeTab === "กิจกรรม" ? "อัลบั้มกิจกรรม" : "ข่าวสารล่าสุด"}
                                    </h2>
                                </div>

                                {loading ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-[400px] bg-gray-100 rounded-2xl animate-pulse"></div>
                                        ))}
                                    </div>
                                ) : filteredPosts.length === 0 ? (
                                    <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                        ไม่พบข้อมูลข่าวสารในหมวดหมู่นี้
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {filteredPosts.map((item, i) => (
                                            <Parallax key={item.id} speed={-(1 + (i % 3) * 0.5)}>
                                                <Link href={`/news&annoucement/${item.id}`} className="block group h-full">
                                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">

                                                        {/* Card Image */}
                                                        <div className="relative h-56 overflow-hidden">
                                                            <Image
                                                                src={item.image_url || "/images/placeholder.jpg"}
                                                                fill
                                                                alt={item.title}
                                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                                unoptimized={true}
                                                            />
                                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

                                                            <span className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded-full bg-[#1D2340]/90 backdrop-blur-sm shadow-sm tracking-wide">
                                                                {item.type === 'news' ? 'NEWS' : 'PR'}
                                                            </span>

                                                            {item.is_pinned && (
                                                                <span className="absolute top-4 right-4 bg-[#B89B5F] text-white p-1.5 rounded-full shadow-md" title="ปักหมุด">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" /><line x1="12" y1="17" x2="12" y2="22" /></svg>
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Card Content */}
                                                        <div className="p-6 flex flex-col flex-grow">
                                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                                                {new Date(item.created_at).toLocaleDateString('th-TH', { dateStyle: 'medium' })}
                                                            </div>

                                                            <h3 className="font-bold text-lg text-[#1D2340] group-hover:text-[#B89B5F] transition-colors line-clamp-2 mb-3 leading-tight">
                                                                {item.title}
                                                            </h3>

                                                            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow font-light leading-relaxed">
                                                                {item.excerpt || "ไม่มีรายละเอียดเพิ่มเติม"}
                                                            </p>

                                                            <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                                                                <span className="text-xs font-semibold text-[#B89B5F] group-hover:underline">อ่านต่อ</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B89B5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Parallax>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        <Parallax speed={10} className="py-20 bg-[#1D2340] text-center text-white">
                            <button className="mt-8 px-12 py-3.5 bg-[#B89B5F] rounded-full shadow-xl hover:bg-[#a58852] hover:scale-105 transition-all font-bold text-lg">
                                ดูข่าวทั้งหมด
                            </button>
                        </Parallax>
                    </>
                )}

                {/* --- Tabs Selection --- */}

            </main>
        </ParallaxClientProvider>
    );
}





