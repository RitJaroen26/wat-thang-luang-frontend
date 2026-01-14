"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/libs/axios";
import { 
    Calendar, User, ArrowLeft, Eye, Paperclip, 
    FileText, Download, ImageIcon, X, Share2, Home, ChevronRight 
} from "lucide-react";
import ParallaxClientProvider from "@/components/ParallaxClientProvider"; // หรือ Layout หลักของคุณ

// Interface ให้ตรงกับ API Response
interface PostImage {
    id: number;
    image_path: string;
    url: string;
}

interface Post {
    id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image_url: string | null;
    attachment_url: string | null;
    attachment_name: string | null;
    type: 'news' | 'announcement';
    author?: string;
    created_at: string;
    updated_at: string;
    view_count: number;
    gallery?: PostImage[];
}

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // สำหรับ Lightbox

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // เรียก API Public (ต้องแน่ใจว่า Backend เปิด route นี้แล้ว)
                const res = await api.get(`/api/public/posts/${params.id}`);
                setPost(res.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchPost();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#ded2b4] border-t-[#B89B5F] rounded-full animate-spin"></div>
                    <p className="text-[#B89B5F] animate-pulse font-medium">กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                    <FileText size={48} className="text-gray-300"/>
                </div>
                <h1 className="text-2xl font-bold text-[#1D2340] mb-2">ไม่พบเนื้อหาข่าว</h1>
                <button onClick={() => router.back()} className="text-[#B89B5F] hover:underline mt-2">ย้อนกลับไปหน้าหลัก</button>
            </div>
        );
    }

    return (
        <ParallaxClientProvider>
            <div className="min-h-screen bg-[#FDFBF7] font-sans pb-20">
                
                {/* --- 1. HERO BANNER SECTION --- */}
                <div className="relative h-[350px] md:h-[450px] w-full bg-[#1D2340] overflow-hidden">
                    {post.image_url ? (
                        <Image 
                            src={post.image_url} 
                            alt={post.title} 
                            fill 
                            className="object-cover opacity-60 mix-blend-overlay" 
                            unoptimized 
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <ImageIcon size={120} className="text-white"/>
                        </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D2340] via-[#1D2340]/60 to-transparent"></div>
                    
                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16 max-w-7xl mx-auto">
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <span className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider mb-4 shadow-lg text-white ${
                                post.type === 'news' ? 'bg-[#B89B5F]' : 'bg-orange-500'
                            }`}>
                                {post.type === 'news' ? 'ข่าวสาร' : 'ประชาสัมพันธ์'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md max-w-4xl">
                                {post.title}
                            </h1>
                            
                            {/* Breadcrumb on Banner */}
                            <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm mt-6 font-light">
                                <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/')}>
                                    <Home size={14}/> หน้าหลัก
                                </span>
                                <ChevronRight size={14}/>
                                <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors" onClick={() => router.back()}>
                                    ข่าวสารและกิจกรรม
                                </span>
                                <ChevronRight size={14}/>
                                <span className="text-[#B89B5F] truncate max-w-[150px] md:max-w-xs">{post.title}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. MAIN CONTENT AREA --- */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-10 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                        
                        {/* LEFT COLUMN (8/12): เนื้อหาหลัก */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                                
                                {/* Meta Data */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-[#B89B5F]" />
                                            {new Date(post.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User size={18} className="text-[#B89B5F]" />
                                            {post.author || "Admin"}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye size={18} className="text-[#B89B5F]" />
                                            {post.view_count.toLocaleString()} ครั้ง
                                        </div>
                                    </div>
                                    
                                    {/* Share Button (Optional UI) */}
                                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#1D2340] transition-colors text-sm font-medium">
                                        <Share2 size={16}/> แชร์
                                    </button>
                                </div>

                                {/* Excerpt (บทนำ) */}
                                {post.excerpt && (
                                    <div className="bg-[#FAF8F3] border-l-4 border-[#B89B5F] p-6 rounded-r-xl mb-10 relative overflow-hidden">
                                        <div className="absolute top-2 right-4 text-[#B89B5F]/10">
                                            <ImageIcon size={64}/>
                                        </div>
                                        <p className="text-lg font-medium text-[#5A4D3B] italic leading-relaxed relative z-10">
                                            "{post.excerpt}"
                                        </p>
                                    </div>
                                )}

                                {/* Main HTML Content */}
                                <div className="prose prose-lg prose-slate max-w-none text-gray-600 font-light leading-loose break-words">
                                    {post.content ? (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: post.content }} 
                                            className="
                                                [&>p]:mb-6 
                                                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6
                                                [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6
                                                [&>h2]:text-[#1D2340] [&>h2]:font-bold [&>h2]:mt-8
                                                [&>h3]:text-[#1D2340] [&>h3]:font-bold [&>h3]:mt-6
                                                [&>img]:rounded-2xl [&>img]:shadow-md [&>img]:my-8 [&>img]:w-full
                                                [&>blockquote]:border-l-4 [&>blockquote]:border-[#B89B5F] [&>blockquote]:pl-4 [&>blockquote]:italic
                                                [&>a]:text-[#B89B5F] [&>a]:underline hover:[&>a]:text-[#a58852]
                                            "
                                        />
                                    ) : (
                                        <span className="text-gray-400 italic text-center block py-10">- ไม่มีรายละเอียดเนื้อหา -</span>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* RIGHT COLUMN (4/12): Sidebar Gallery & Attachments */}
                        <div className="lg:col-span-4 space-y-8">
                            
                            {/* 1. Gallery Section (อัลบั้มรูป) */}
                            {post.gallery && post.gallery.length > 0 && (
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
                                    <div className="p-5 bg-[#1D2340] text-white flex items-center justify-between">
                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                            <ImageIcon size={20} className="text-[#B89B5F]" /> อัลบั้มภาพ
                                        </h3>
                                        <span className="bg-[#B89B5F] text-[#1D2340] text-xs font-bold px-2 py-0.5 rounded-full">
                                            {post.gallery.length}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="grid grid-cols-2 gap-3">
                                            {post.gallery.map((img, index) => (
                                                <div 
                                                    key={img.id} 
                                                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all border border-gray-100 ${index === 0 ? 'col-span-2 aspect-[16/10]' : ''}`}
                                                    onClick={() => setSelectedImage(img.url)}
                                                >
                                                    <Image 
                                                        src={img.url} 
                                                        alt={`Gallery ${index}`} 
                                                        fill 
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                                        unoptimized
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-300" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 2. Attachment Section (เอกสารแนบ) */}
                            {post.attachment_url && (
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B89B5F]"></div>
                                    <h3 className="font-bold text-[#1D2340] text-lg mb-4 flex items-center gap-2">
                                        <Paperclip size={20} className="text-[#B89B5F]" /> เอกสารที่เกี่ยวข้อง
                                    </h3>
                                    <a 
                                        href={post.attachment_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 hover:border-[#B89B5F] hover:shadow-md transition-all group-hover:bg-white"
                                    >
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-red-100">
                                            <FileText size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-700 truncate group-hover:text-[#B89B5F] transition-colors">
                                                {post.attachment_name || "ดาวน์โหลดไฟล์เอกสาร"}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">คลิกเพื่อเปิดอ่าน (PDF)</p>
                                        </div>
                                        <Download size={20} className="text-gray-300 group-hover:text-[#B89B5F]" />
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* --- 3. LIGHTBOX MODAL --- */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 z-[100] bg-[#1D2340]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-50">
                            <X size={32} />
                        </button>
                        <div 
                            className="relative w-full max-w-6xl h-[85vh] animate-in zoom-in-95 duration-300" 
                            onClick={e => e.stopPropagation()}
                        >
                            <Image 
                                src={selectedImage} 
                                alt="Full size" 
                                fill 
                                className="object-contain" 
                                unoptimized 
                            />
                        </div>
                    </div>
                )}

            </div>
        </ParallaxClientProvider>
    );
}