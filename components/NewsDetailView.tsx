"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/libs/axios";
import { Calendar, User, ArrowLeft, Eye, Paperclip, FileText, Download, ImageIcon, X } from "lucide-react";

// Interface (เหมือนเดิม)
interface PostImage { id: number; image_path: string; url: string; }
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

interface NewsDetailViewProps {
    postId: number;
    onBack: () => void;
}

export default function NewsDetailView({ postId, onBack }: NewsDetailViewProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                // เรียก API Public
                const res = await api.get(`/api/public/posts/${postId}`);
                setPost(res.data);
                
                // (Optional) Scroll ไปที่จุดเริ่มต้นของเนื้อหา
                const contentElement = document.getElementById("news-content-start");
                if (contentElement) {
                    contentElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (postId) fetchPost();
    }, [postId]);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-[#B89B5F] rounded-full animate-spin"></div>
                    <p className="text-gray-400 animate-pulse">กำลังโหลดเนื้อหา...</p>
                </div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div id="news-content-start" className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Header Image & Back Button */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-slate-100">
                {post.image_url && (
                    <Image src={post.image_url} alt={post.title} fill className="object-cover" unoptimized />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <button 
                    onClick={onBack}
                    className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-[#B89B5F] hover:text-white transition-all shadow-lg"
                >
                    <ArrowLeft size={18} /> ย้อนกลับ
                </button>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <span className="inline-block px-3 py-1 bg-[#B89B5F] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                        {post.type === 'news' ? 'ข่าวสาร' : 'ประชาสัมพันธ์'}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-extrabold leading-snug drop-shadow-md">
                        {post.title}
                    </h1>
                </div>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Content (Left) */}
                <div className="lg:col-span-8">
                    {/* Meta Data */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2"><Calendar size={16} className="text-[#B89B5F]"/> {new Date(post.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}</div>
                        <div className="flex items-center gap-2"><User size={16} className="text-[#B89B5F]"/> {post.author || "Admin"}</div>
                        <div className="flex items-center gap-2"><Eye size={16} className="text-[#B89B5F]"/> {post.view_count.toLocaleString()} views</div>
                    </div>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <div className="bg-[#FAF8F3] border-l-4 border-[#B89B5F] p-6 rounded-r-xl mb-8">
                            <p className="text-lg font-medium text-[#5A4D3B] italic leading-relaxed">"{post.excerpt}"</p>
                        </div>
                    )}

                    {/* HTML Content */}
                    <div className="prose prose-lg prose-slate max-w-none text-gray-600 font-light leading-loose break-words">
                        {post.content ? (
                            <div dangerouslySetInnerHTML={{ __html: post.content }} className="[&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5" />
                        ) : (
                            <span className="text-gray-400 italic text-center block py-10">- ไม่มีรายละเอียดเนื้อหา -</span>
                        )}
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Gallery */}
                    {post.gallery && post.gallery.length > 0 && (
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-[#B89B5F]"/> อัลบั้มภาพ</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {post.gallery.map((img, index) => (
                                    <div key={img.id} onClick={() => setSelectedImage(img.url)} className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${index === 0 ? 'col-span-2 aspect-video' : ''}`}>
                                        <Image src={img.url} alt="" fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attachment */}
                    {post.attachment_url && (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Paperclip size={18} className="text-[#B89B5F]"/> เอกสารแนบ</h3>
                            <a href={post.attachment_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#B89B5F]/10 hover:border-[#B89B5F] border border-transparent transition-all group">
                                <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center shrink-0"><FileText size={20}/></div>
                                <div className="flex-1 min-w-0"><p className="text-sm font-bold text-slate-700 truncate">{post.attachment_name || "ดาวน์โหลด"}</p><p className="text-xs text-gray-400">PDF File</p></div>
                                <Download size={18} className="text-gray-400 group-hover:text-[#B89B5F]"/>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-3 rounded-full"><X size={32}/></button>
                    <div className="relative w-full max-w-6xl h-[85vh]"><Image src={selectedImage} alt="" fill className="object-contain" unoptimized /></div>
                </div>
            )}
        </div>
    );
}