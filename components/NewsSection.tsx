"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import ParallaxClientProvider from "./ParallaxClientProvider";
import Link from "next/link";
import { api } from "@/libs/axios";
import NewsDetailView from "@/components/NewsDetailView";
import { Loader2, Calendar as CalendarIcon, ZoomIn } from "lucide-react";

// Interface สำหรับข้อมูลข่าว
interface Post {
    id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image_url: string | null;
    type: 'news' | 'announcement' | 'activity';
    is_pinned: boolean;
    created_at: string;
}

// ✅ แก้ไข Interface ให้ตรงกับ Backend
interface Schedule {
    id: number;
    url: string; // เปลี่ยนจาก image_url เป็น url
}

const tabs = ["ทั้งหมด", "ข่าวประชาสัมพันธ์", "ข่าวสารอื่นๆ", "กิจกรรม"];
const primaryColor = "#B89B5F";
const secondaryColor = "#1D2340";
const POSTS_PER_PAGE = 6;

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewingPostId, setViewingPostId] = useState<number | null>(null);

    const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);
    const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);
    
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
    const [scheduleImage, setScheduleImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 1. Fetch Posts
                const res = await api.get('/api/public/posts');
                const allPosts = res.data;
                setPosts(allPosts);

                const pinned = allPosts.filter((p: Post) => p.is_pinned);
                setPinnedPosts(pinned.length > 0 ? pinned : allPosts.slice(0, 3));

                // 2. Fetch Schedule (แก้ไขการดึงค่า)
                const scheduleRes = await api.get('/api/public/schedules');
                if (scheduleRes.data && scheduleRes.data.length > 0) {
                    // ✅ ใช้ property .url ตามที่ ScheduleController ส่งมา
                    setScheduleImage(scheduleRes.data[0].url); 
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        setVisibleCount(POSTS_PER_PAGE);
    }, [activeTab]);

    useEffect(() => {
        if (pinnedPosts.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentPinnedIndex((prev) => (prev + 1) % pinnedPosts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [pinnedPosts]);

    const filteredPosts = posts.filter(post => {
        if (activeTab === "ทั้งหมด") return true;
        if (activeTab === "ข่าวประชาสัมพันธ์") return post.type === 'announcement';
        if (activeTab === "ข่าวสารอื่นๆ") return post.type === 'news';
        if (activeTab === "กิจกรรม") return post.type === 'activity';
        return true;
    });

    const displayedPosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + POSTS_PER_PAGE);
    };

    const currentPinned = pinnedPosts[currentPinnedIndex];

    return (
        <ParallaxClientProvider>
            <main className="relative overflow-hidden bg-white min-h-screen" id="news">

                <ParallaxBanner className="h-[750px] md:h-[700px]" layers={[
                    { image: "/images/S__13099032_0.jpg", speed: -25 },
                    { children: <div className="absolute inset-0 bg-black/80"></div>, speed: 0 },
                    {
                        speed: -10, children: (
                            <div className="relative w-full h-full pt-36 md:pt-24 pb-20 max-w-7xl mx-auto px-6 mt-10 md:mt-20">
                                <div className="text-center text-white mb-12">
                                    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-wide">ข่าวสาร & กิจกรรม</h1>
                                    <p className="mt-3 text-base md:text-lg text-gray-200 font-light">อัปเดตความเคลื่อนไหวล่าสุดของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์</p>
                                </div>

                                {currentPinned && (
                                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center animate-in fade-in duration-700">
                                        
                                        {/* Slideshow */}
                                        <div className="relative w-full lg:w-3/5 xl:w-[65%] h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
                                            {pinnedPosts.map((post, index) => (
                                                <div
                                                    key={post.id}
                                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentPinnedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                                    onClick={() => setViewingPostId(post.id)}
                                                >
                                                    <div className="block w-full h-full relative">
                                                        <Image
                                                            src={post.image_url || "/images/placeholder.jpg"}
                                                            fill
                                                            alt={post.title}
                                                            className="object-cover transition-transform duration-[5000ms] ease-out scale-100 hover:scale-110"
                                                            unoptimized={true}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
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
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="absolute top-6 right-6 flex gap-2 z-20">
                                                {pinnedPosts.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentPinnedIndex(idx); }}
                                                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all shadow-sm ${idx === currentPinnedIndex ? 'bg-[#B89B5F] w-6 md:w-8' : 'bg-white/50 hover:bg-white'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* ✅ Section แสดงตารางกิจกรรม */}
                                        <div className="hidden lg:flex w-full lg:w-2/5 xl:w-[35%] flex-col gap-4 h-80">
                                            <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/20 w-full relative overflow-hidden group">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-xl font-bold text-[#1D2340] flex items-center gap-2">
                                                        <CalendarIcon className="text-[#B89B5F]" /> ตารางกิจกรรม
                                                    </h3>
                                                    <span className="text-[10px] bg-[#B89B5F]/10 text-[#B89B5F] px-2 py-1 rounded-full">
                                                        Latest
                                                    </span>
                                                </div>
                                                
                                                {scheduleImage ? (
                                                    <div 
                                                        onClick={() => window.open(scheduleImage, '_blank')}
                                                    >
                                                        <Image 
                                                            src={scheduleImage} 
                                                            alt="Schedule" 
                                                            className="transition-transform duration-700" 
                                                            unoptimized={true}
                                                            width={500}
                                                            height={500}
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                            <div className="bg-white/90 text-[#1D2340] px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2 shadow-lg">
                                                                <ZoomIn size={16}/> ดูภาพขยาย
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="aspect-[4/5] w-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
                                                        <CalendarIcon size={40} className="opacity-50"/>
                                                        <span className="text-sm">ยังไม่มีตารางกิจกรรม</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )
                    }
                ]} />

                {viewingPostId ? (
                    <section className="max-w-7xl mx-auto px-6 mt-10 pb-20 min-h-screen">
                        <NewsDetailView
                            postId={viewingPostId}
                            onBack={() => setViewingPostId(null)}
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

                        <section className="max-w-7xl mx-auto px-6 mt-16 space-y-20 pb-10">
                            <div>
                                <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-100">
                                    <div className="w-1.5 h-8 bg-[#B89B5F] rounded-full"></div>
                                    <h2 className={`text-2xl md:text-3xl font-bold text-[${secondaryColor}]`}>
                                        {activeTab === "กิจกรรม" ? "อัลบั้มกิจกรรม" : "ข่าวและประชาสัมพันธ์"}
                                    </h2>
                                </div>

                                {loading ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {[1, 2, 3].map(i => <div key={i} className="h-[400px] bg-gray-100 rounded-2xl animate-pulse"></div>)}
                                    </div>
                                ) : filteredPosts.length === 0 ? (
                                    <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                        ไม่พบข้อมูลข่าวสารในหมวดหมู่นี้
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {displayedPosts.map((item, i) => (
                                            <Parallax key={item.id} speed={-(1 + (i % 3) * 0.5)}>
                                                <div 
                                                    onClick={() => setViewingPostId(item.id)} 
                                                    className="block group h-full cursor-pointer"
                                                >
                                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                                                        <div className="relative h-56 overflow-hidden">
                                                            <Image src={item.image_url || "/images/placeholder.jpg"} fill alt={item.title} className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized={true} />
                                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                                            <span className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded-full bg-[#1D2340]/90 backdrop-blur-sm shadow-sm tracking-wide">{item.type === 'news' ? 'NEWS' : 'PR'}</span>
                                                            {item.is_pinned && <span className="absolute top-4 right-4 bg-[#B89B5F] text-white p-1.5 rounded-full shadow-md">📌</span>}
                                                        </div>
                                                        <div className="p-6 flex flex-col flex-grow">
                                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium">
                                                                <span>🗓️</span> {new Date(item.created_at).toLocaleDateString('th-TH', { dateStyle: 'medium' })}
                                                            </div>
                                                            <h3 className="font-bold text-lg text-[#1D2340] group-hover:text-[#B89B5F] transition-colors line-clamp-2 mb-3 leading-tight">{item.title}</h3>
                                                            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow font-light leading-relaxed">{item.excerpt || "ไม่มีรายละเอียดเพิ่มเติม"}</p>
                                                            <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                                                                <span className="text-xs font-semibold text-[#B89B5F] group-hover:underline">อ่านต่อ</span>
                                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Parallax>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {hasMore && !loading && (
                            <div className="pb-20 text-center">
                                <button 
                                    onClick={handleLoadMore}
                                    className="px-12 py-3.5 bg-[#B89B5F] text-white rounded-full shadow-xl hover:bg-[#a58852] hover:scale-105 transition-all font-bold text-lg flex items-center gap-2 mx-auto"
                                >
                                    ดูข่าวสารเพิ่มเติม <Loader2 className="animate-spin w-4 h-4 hidden group-active:block"/>
                                </button>
                            </div>
                        )}

                        {!hasMore && filteredPosts.length > 0 && (
                            <div className="pb-20 text-center text-gray-400 text-sm">
                                — แสดงข่าวทั้งหมดแล้ว —
                            </div>
                        )}
                    </>
                )}
            </main>
        </ParallaxClientProvider>
    );
}

// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Parallax, ParallaxBanner } from "react-scroll-parallax";
// import ParallaxClientProvider from "./ParallaxClientProvider";
// import EventCalendar from "./Calendar";
// import Link from "next/link";
// import { api } from "@/libs/axios";
// import NewsDetailView from "@/components/NewsDetailView";
// import { Loader2, Calendar as CalendarIcon, ZoomIn } from "lucide-react";

// // Interface สำหรับข้อมูลข่าว
// interface Post {
//     id: number;
//     title: string;
//     excerpt?: string;
//     content?: string;
//     image_url: string | null;
//     type: 'news' | 'announcement' | 'activity';
//     is_pinned: boolean;
//     created_at: string;
// }

// interface Schedule {
//     id: number;
//     image_url: string;
// }

// const tabs = ["ทั้งหมด", "ข่าวประชาสัมพันธ์", "ข่าวสารอื่นๆ", "กิจกรรม"];
// const primaryColor = "#B89B5F";
// const secondaryColor = "#1D2340";
// const POSTS_PER_PAGE = 6; // ✅ จำนวนข่าวที่จะแสดงต่อครั้ง

// export default function NewsPage() {
//     const [activeTab, setActiveTab] = useState("ทั้งหมด");
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState(true);

//     const [viewingPostId, setViewingPostId] = useState<number | null>(null);

//     // State สำหรับ Pinned Post Slideshow
//     const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);
//     const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]);

//     // ✅ State สำหรับ Pagination (Load More)
//     const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
//     const [scheduleImage, setScheduleImage] = useState<string | null>(null);
//     // Fetch Data
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await api.get('/api/public/posts');
//                 const allPosts = res.data;
//                 setPosts(allPosts);

//                 const pinned = allPosts.filter((p: Post) => p.is_pinned);
//                 setPinnedPosts(pinned.length > 0 ? pinned : allPosts.slice(0, 3));

//                 const scheduleRes = await api.get('/api/public/schedules');
//                 if (Array.isArray(scheduleRes.data) && scheduleRes.data.length > 0) {
//                     // ✅ Use .url property as defined in ScheduleController map function
//                     setScheduleImage(scheduleRes.data[0].url);
//                 }
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);



//     // Reset visible count when tab changes
//     useEffect(() => {
//         setVisibleCount(POSTS_PER_PAGE);
//     }, [activeTab]);

//     // Auto Slide Logic
//     useEffect(() => {
//         if (pinnedPosts.length <= 1) return;
//         const interval = setInterval(() => {
//             setCurrentPinnedIndex((prev) => (prev + 1) % pinnedPosts.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [pinnedPosts]);

//     // Filter Logic
//     const filteredPosts = posts.filter(post => {
//         if (activeTab === "ทั้งหมด") return true;
//         if (activeTab === "ข่าวประชาสัมพันธ์") return post.type === 'announcement';
//         if (activeTab === "ข่าวสารอื่นๆ") return post.type === 'news'; // แก้ไข string ให้ตรงกับ Tab
//         if (activeTab === "กิจกรรม") return post.type === 'activity'; // สมมติว่า type เดียวกัน
//         return true;
//     });

//     // ✅ ตัด array ตามจำนวนที่ต้องการแสดง
//     const displayedPosts = filteredPosts.slice(0, visibleCount);

//     // ✅ เช็คว่ายังมีข่าวเหลือให้โหลดอีกไหม
//     const hasMore = visibleCount < filteredPosts.length;

//     const handleLoadMore = () => {
//         setVisibleCount(prev => prev + POSTS_PER_PAGE);
//     };

//     const currentPinned = pinnedPosts[currentPinnedIndex];

//     return (
//         <ParallaxClientProvider>
//             <main className="relative overflow-hidden bg-white min-h-screen" id="news">

//                 {/* --- HEADER PARALLAX (Code เดิม) --- */}
//                 <ParallaxBanner className="h-[750px] md:h-[700px]" layers={[
//                     { image: "/images/S__13099032_0.jpg", speed: -25 },
//                     { children: <div className="absolute inset-0 bg-black/80"></div>, speed: 0 },
//                     {
//                         speed: -10, children: (
//                             <div className="relative w-full h-full pt-12 md:pt-24 pb-20 max-w-7xl mx-auto px-6 mt-10 md:mt-20">
//                                 <div className="text-center text-white mb-12">
//                                     <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-wide">ข่าวสาร & กิจกรรม</h1>
//                                     <p className="mt-3 text-base md:text-lg text-gray-200 font-light">อัปเดตความเคลื่อนไหวล่าสุดของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์</p>
//                                 </div>

//                                 {/* Slideshow Section (Code เดิม) */}
//                                 {currentPinned && (
//                                     <div className="flex flex-col lg:flex-row gap-8 items-start justify-center animate-in fade-in duration-700">
//                                         <div className="relative w-full lg:w-3/5 xl:w-[65%] h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
//                                             {pinnedPosts.map((post, index) => (
//                                                 <div
//                                                     key={post.id}
//                                                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentPinnedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                                                     onClick={() => setViewingPostId(post.id)}
//                                                 >
//                                                     <div className="block w-full h-full relative">
//                                                         <Image
//                                                             src={post.image_url || "/images/placeholder.jpg"}
//                                                             fill
//                                                             alt={post.title}
//                                                             className="object-cover transition-transform duration-[5000ms] ease-out scale-100 hover:scale-110"
//                                                             unoptimized={true}
//                                                         />
//                                                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
//                                                         <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
//                                                             <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest bg-[#B89B5F] px-3 py-1 rounded-full uppercase shadow-md mb-3">
//                                                                 {post.type === 'news' ? 'ข่าวสาร' : 'ประชาสัมพันธ์'}
//                                                             </span>
//                                                             <h2 className="text-2xl md:text-4xl font-bold leading-snug drop-shadow-md line-clamp-2 hover:text-[#B89B5F] transition-colors">
//                                                                 {post.title}
//                                                             </h2>
//                                                             <p className="hidden md:block text-sm md:text-base mt-2 text-gray-300 line-clamp-2 font-light">
//                                                                 {post.excerpt || "คลิกเพื่ออ่านรายละเอียดเพิ่มเติม..."}
//                                                             </p>
//                                                             <p className="text-xs mt-4 text-gray-400 flex items-center gap-2">
//                                                                 <span className="w-1.5 h-1.5 bg-[#B89B5F] rounded-full"></span>
//                                                                 {new Date(post.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                             <div className="absolute top-6 right-6 flex gap-2 z-20">
//                                                 {pinnedPosts.map((_, idx) => (
//                                                     <button
//                                                         key={idx}
//                                                         onClick={(e) => { e.stopPropagation(); setCurrentPinnedIndex(idx); }}
//                                                         className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all shadow-sm ${idx === currentPinnedIndex ? 'bg-[#B89B5F] w-6 md:w-8' : 'bg-white/50 hover:bg-white'}`}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         {/* <div className="hidden lg:flex w-full lg:w-2/5 xl:w-[35%] justify-center lg:justify-start items-start">
//                                             <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl w-full border border-white/20">
//                                                 <EventCalendar />
//                                             </div>
//                                         </div> */}

//                                         <div className="hidden lg:flex w-full lg:w-2/5 xl:w-[35%] flex-col gap-4">
//                                             <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/20 w-full relative overflow-hidden group">
//                                                 {/* Title */}
//                                                 <div className="flex items-center justify-between mb-4">
//                                                     <h3 className="text-xl font-bold text-[#1D2340] flex items-center gap-2">
//                                                         <CalendarIcon className="text-[#B89B5F]" /> ตารางกิจกรรม
//                                                     </h3>
//                                                     <span className="text-[10px] bg-[#B89B5F]/10 text-[#B89B5F] px-2 py-1 rounded-full">
//                                                         Latest
//                                                     </span>
//                                                 </div>

//                                                 {/* Image Area */}
//                                                 {scheduleImage ? (
//                                                     <div
//                                                         className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-slate-200"
//                                                         onClick={() => window.open(scheduleImage, '_blank')}
//                                                     >
//                                                         <Image
//                                                             src={scheduleImage}
//                                                             alt="Schedule"
//                                                             fill
//                                                             className="object-cover transition-transform duration-700"
//                                                             unoptimized={true}
//                                                         />
//                                                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
//                                                             <div className="bg-white/90 text-[#1D2340] px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2 shadow-lg">
//                                                                 <ZoomIn size={16} /> ดูภาพขยาย
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="aspect-[4/5] w-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
//                                                         <CalendarIcon size={40} className="opacity-50" />
//                                                         <span className="text-sm">ยังไม่มีตารางกิจกรรม</span>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )
//                     }
//                 ]} />

//                 {viewingPostId ? (
//                     <section className="max-w-7xl mx-auto px-6 mt-10 pb-20 min-h-screen">
//                         <NewsDetailView
//                             postId={viewingPostId}
//                             onBack={() => setViewingPostId(null)}
//                         />
//                     </section>
//                 ) : (
//                     <>
//                         <section className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap gap-3 justify-center">
//                             {tabs.map((tab) => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => setActiveTab(tab)}
//                                     className={`px-6 py-2 md:px-8 md:py-2.5 rounded-full text-sm font-medium tracking-wide transition-all border shadow-sm z-30 ${activeTab === tab ? "bg-[#b89b5f] text-white border-[#b89b5f] shadow-lg scale-105" : "bg-white text-[#6b6b6b] border-[#ded2b4] hover:bg-[#f3ece0]"}`}
//                                 >
//                                     {tab}
//                                 </button>
//                             ))}
//                         </section>

//                         <section className="max-w-7xl mx-auto px-6 mt-16 space-y-20 pb-10">
//                             <div>
//                                 <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-100">
//                                     <div className="w-1.5 h-8 bg-[#B89B5F] rounded-full"></div>
//                                     <h2 className={`text-2xl md:text-3xl font-bold text-[${secondaryColor}]`}>
//                                         {activeTab === "กิจกรรม" ? "อัลบั้มกิจกรรม" : "ข่าวและประชาสัมพันธ์"}
//                                     </h2>
//                                 </div>

//                                 {loading ? (
//                                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//                                         {[1, 2, 3].map(i => <div key={i} className="h-[400px] bg-gray-100 rounded-2xl animate-pulse"></div>)}
//                                     </div>
//                                 ) : filteredPosts.length === 0 ? (
//                                     <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
//                                         ไม่พบข้อมูลข่าวสารในหมวดหมู่นี้
//                                     </div>
//                                 ) : (
//                                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//                                         {displayedPosts.map((item, i) => (
//                                             <Parallax key={item.id} speed={-(1 + (i % 3) * 0.5)}>
//                                                 <div
//                                                     onClick={() => setViewingPostId(item.id)}
//                                                     className="block group h-full cursor-pointer"
//                                                 >
//                                                     <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
//                                                         <div className="relative h-56 overflow-hidden">
//                                                             <Image src={item.image_url || "/images/placeholder.jpg"} fill alt={item.title} className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized={true} />
//                                                             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
//                                                             <span className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded-full bg-[#1D2340]/90 backdrop-blur-sm shadow-sm tracking-wide">{item.type === 'news' ? 'ข่าวสาร' : 'ประชาสัมพันธ์'}</span>
//                                                             {item.is_pinned && <span className="absolute top-4 right-4 bg-[#B89B5F] text-white p-1.5 rounded-full shadow-md">📌</span>}
//                                                         </div>
//                                                         <div className="p-6 flex flex-col flex-grow">
//                                                             <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium">
//                                                                 <span>🗓️</span> {new Date(item.created_at).toLocaleDateString('th-TH', { dateStyle: 'medium' })}
//                                                             </div>
//                                                             <h3 className="font-bold text-lg text-[#1D2340] group-hover:text-[#B89B5F] transition-colors line-clamp-2 mb-3 leading-tight">{item.title}</h3>
//                                                             <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow font-light leading-relaxed">{item.excerpt || "ไม่มีรายละเอียดเพิ่มเติม"}</p>
//                                                             <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
//                                                                 <span className="text-xs font-semibold text-[#B89B5F] group-hover:underline">อ่านต่อ</span>
//                                                                 <span className="group-hover:translate-x-1 transition-transform">→</span>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </Parallax>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </section>

//                         {/* ✅ Load More Button Section */}
//                         {hasMore && !loading && (
//                             <div className="pb-20 text-center">
//                                 <button
//                                     onClick={handleLoadMore}
//                                     className="px-12 py-3.5 bg-[#B89B5F] text-white rounded-full shadow-xl hover:bg-[#a58852] hover:scale-105 transition-all font-bold text-lg flex items-center gap-2 mx-auto"
//                                 >
//                                     ดูข่าวสารเพิ่มเติม <Loader2 className="animate-spin w-4 h-4 hidden group-active:block" />
//                                 </button>
//                             </div>
//                         )}

//                         {!hasMore && filteredPosts.length > 0 && (
//                             <div className="pb-20 text-center text-gray-400 text-sm">
//                                 — แสดงข่าวทั้งหมดแล้ว —
//                             </div>
//                         )}
//                     </>
//                 )}
//             </main>
//         </ParallaxClientProvider>
//     );
// }