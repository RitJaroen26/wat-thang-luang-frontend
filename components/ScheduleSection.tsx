"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/libs/axios";
import { Calendar, ZoomIn, Loader2, AlertCircle } from "lucide-react";

interface Schedule {
    id: number;
    url: string;
    title?: string;
}

export default function ScheduleSection() {
    const [scheduleImage, setScheduleImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // ดึงข้อมูลจาก API
                const res = await api.get('/api/public/schedules');
                
                // ตรวจสอบว่ามีข้อมูลหรือไม่
                if (res.data && res.data.length > 0) {
                    setScheduleImage(res.data[0].url); // ใช้ภาพล่าสุด
                } else {
                    setScheduleImage(null);
                }
            } catch (err) {
                console.error("Failed to load schedule:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center bg-slate-50">
                <Loader2 className="animate-spin text-[#B89B5F]" size={40} />
            </div>
        );
    }

    if (!scheduleImage && !error) return null; // ถ้าไม่มีตาราง ไม่ต้องแสดง Section นี้

    return (
        <section className="py-16 md:py-24 bg-white" id="schedule-section">
            <div className="max-w-6xl mx-auto px-6 -mt-20 block md:hidden">
                
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B89B5F]/10 text-[#B89B5F] text-sm font-bold mb-4 animate-in fade-in zoom-in duration-500">
                        <Calendar size={18} />
                        <span>ตารางเรียน & กิจกรรม</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D2340] mb-4">
                        ปฏิทินกำหนดการ
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-light">
                        ตรวจสอบตารางเรียนและกิจกรรมล่าสุด เพื่อเตรียมความพร้อมสำหรับการเรียนรู้ในแต่ละสัปดาห์
                    </p>
                </div>

                {/* Content Area */}
                <div className="flex justify-center">
                    {error ? (
                        <div className="flex flex-col items-center gap-3 text-slate-400 py-10 bg-white p-8 rounded-3xl border border-dashed border-slate-200 w-full max-w-lg text-center">
                            <AlertCircle size={48} className="opacity-50 text-red-400" />
                            <p>ไม่สามารถโหลดข้อมูลตารางเรียนได้ในขณะนี้</p>
                        </div>
                    ) : (
                        <div className="relative group w-full max-w-4xl">
                            {/* กรอบรูปภาพที่มีเงาและมุมโค้งสวยงาม */}
                            <div
                                className="flex justify-center"
                                onClick={() => window.open(scheduleImage!, '_blank')}
                            >
                                <Image
                                    src={scheduleImage!}
                                    alt="Class Schedule"
                                    className="transition-transform shadow-md rounded-lg duration-700 group-hover:scale-105"
                                    unoptimized={true}
                                    width={400}
                                    height={400}
                                />
                                
                                {/* Overlay & Button */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm text-[#1D2340] px-6 py-3 rounded-full text-base font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-lg">
                                        <ZoomIn size={20} className="text-[#B89B5F]" /> คลิกเพื่อดูภาพขยาย
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-xs md:text-sm text-slate-400 flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                        ตารางอาจมีการเปลี่ยนแปลงตามความเหมาะสม
                    </p>
                </div>

            </div>
        </section>
    );
}