"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Copy, CheckCircle2, Heart, GraduationCap,
    QrCode, AlertCircle, Building2, X, UploadCloud, Loader2
} from "lucide-react";
import { api } from "@/libs/axios";
import Swal from "sweetalert2";

export default function DonationUser() {
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        amount: "",
        note: "",
        slip_image: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Bank Information
    const bankInfo = {
        bankName: "ธนาคารกรุงไทย",
        accountName: "ศูนย์การเรียนรู้ทางวัฒนธรรมวัดทางหลวง",
        accountNumber: "108-0-94700-0",
        branch: "สาขานนทบุรี"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(bankInfo.accountNumber.replace(/-/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });

        try {
            await api.post('/api/public/donations', data);

            Swal.fire({
                icon: 'success',
                title: 'แจ้งโอนเงินเรียบร้อย',
                text: 'เจ้าหน้าที่จะตรวจสอบข้อมูลโดยเร็วที่สุด',
                timer: 2000,
                showConfirmButton: false
            });

            // Reset form and close modal
            setFormData({ first_name: "", last_name: "", email: "", phone: "", amount: "", note: "", slip_image: null });
            setIsModalOpen(false);

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถส่งข้อมูลได้ โปรดลองใหม่อีกครั้ง'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600 pb-10 md:pb-20">

            {/* --- Hero Section --- */}
            <div className="bg-[#1D2340] text-white py-12 md:py-16 px-4 md:px-6 text-center relative overflow-hidden h-[450px] md:h-[500px] flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-3 md:space-y-4 mt-25">
                    <span className="inline-block px-3 py-1 bg-[#B89B5F] text-white text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                        Donation
                    </span>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                        ร่วมเป็นส่วนหนึ่งในการ<span className="text-[#B89B5F]">สร้างโอกาส</span>ทางการศึกษา
                    </h1>
                    <p className="text-slate-300 font-light text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                        เงินบริจาคของท่านจะนำไปใช้เพื่อทุนการศึกษา อุปกรณ์การเรียน และพัฒนาศูนย์ศึกษาพระพุทธศาสนา
                    </p>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                    {/* Left Column: Bank & Payment Info (7 cols) */}
                    <div className="lg:col-span-7 space-y-4 md:space-y-6">

                        {/* Bank Account Card */}
                        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50 p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
                                    <Building2 className="text-[#B89B5F] w-5 h-5 md:w-6 md:h-6 hidden md:block" /> ทุกการร่วมบุญสามารถลดหย่อนภาษีได้ ผ่านระบบสรรพากรโดยตรง ร่วมบุญผ่านบัญชีธนาคารกรุงไทย
                                </h3>
                            </div>
                            <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                                <div>
                                    <p className="text-xs md:text-sm text-slate-400 mb-1">ชื่อบัญชี</p>
                                    <p className="text-base md:text-lg font-bold text-slate-800 break-words leading-tight">{bankInfo.accountName}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-center sm:text-left">
                                        <p className="text-xs md:text-sm text-slate-400 mb-1">เลขที่บัญชี</p>
                                        <p className="text-2xl md:text-3xl font-mono font-bold text-[#1D2340] tracking-wider">
                                            {bankInfo.accountNumber}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 ${copied
                                                ? "bg-emerald-500 text-white"
                                                : "bg-white border border-slate-200 hover:border-[#B89B5F] hover:text-[#B89B5F]"
                                            }`}
                                    >
                                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                        {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                                    </button>
                                </div>

                                <div className="text-xs md:text-sm text-slate-500 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#B89B5F] rounded-full"></span>
                                    สาขา: {bankInfo.branch}
                                </div>
                            </div>
                        </div>

                        {/* QR Code Card */}
                        <div className="h-130 overflow-hidden text-white flex flex-col justify-center sm:flex-row items-center gap-6 md:gap-8">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_QR_CODE_DONATION_IMAGE}`}
                                alt="qr_code_donation"
                                width={400}
                                height={300}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Right Column: Instructions & Contact (5 cols) */}
                    <div className="lg:col-span-5 space-y-4 md:space-y-6">

                        {/* Process Info */}
                        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
                            <h3 className="font-bold text-base md:text-lg text-slate-800 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-[#B89B5F]" /> ขั้นตอนการแจ้งหลักฐาน
                            </h3>
                            <ul className="space-y-5 md:space-y-6 relative border-l-2 border-slate-100 ml-3 pl-6 md:pl-8">
                                <li className="relative">
                                    <span className="absolute -left-[33px] md:-left-[41px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">1</span>
                                    <h4 className="font-bold text-slate-700 text-sm md:text-base">โอนเงินเข้าบัญชี</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">ตามรายละเอียดด้านซ้ายมือ</p>
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[33px] md:-left-[41px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">2</span>
                                    <h4 className="font-bold text-slate-700 text-sm md:text-base">ส่งหลักฐานการโอน</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">ส่งสลิปโอนเงิน แจ้งชื่อ-นามสกุล ผ่านช่องทางต่างๆ</p>
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[33px] md:-left-[41px] top-0 w-6 h-6 bg-[#B89B5F] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">3</span>
                                    <h4 className="font-bold text-slate-700 text-sm md:text-base">รับใบอนุโมทนาบัตร</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">เจ้าหน้าที่จะตรวจสอบและจัดส่งให้ภายใน 7 วันทำการ</p>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-[#1D2340] text-white font-bold text-sm md:text-base hover:bg-[#2a325a] transition-all shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer active:scale-95"
                            >
                                <UploadCloud size={20} className="md:w-6 md:h-6" />
                                ส่งสลิปผ่านระบบ
                            </button>

                            <a
                                href="#" // Replace with actual Line Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-[#06C755] text-white font-bold text-sm md:text-base hover:bg-[#05b54d] transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95"
                            >
                                <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full"></div>
                                ส่งสลิปผ่าน LINE
                            </a>
                            <a
                                href="#" // Replace with actual Facebook Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-[#1877F2] text-white font-bold text-sm md:text-base hover:bg-[#166fe5] transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95"
                            >
                                <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full"></div>
                                ส่งสลิปผ่าน Facebook
                            </a>
                        </div>

                        {/* Note */}
                        <div className="bg-orange-50 border border-orange-100 rounded-xl md:rounded-2xl p-4 flex gap-3 items-start">
                            <AlertCircle className="text-orange-500 shrink-0 mt-0.5 w-5 h-5" />
                            <p className="text-[10px] md:text-xs text-orange-700 leading-relaxed">
                                <span className="font-bold">หมายเหตุ:</span> ทางศูนย์ฯ ไม่มีนโยบายให้โอนเงินเข้าบัญชีส่วนบุคคล บัญชีรับบริจาคต้องเป็นชื่อ "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง" เท่านั้น
                            </p>
                        </div>

                    </div>
                </div>

                {/* --- Impact Section --- */}
                <div className="mt-12 md:mt-20 text-center max-w-4xl mx-auto px-4">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 md:mb-8">เงินบริจาคของท่านไปไหน?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {[
                            { icon: <GraduationCap size={24} className="md:w-7 md:h-7" />, color: "indigo", title: "ทุนการศึกษา", desc: "มอบโอกาสให้นักเรียนที่ขาดแคลนทุนทรัพย์" },
                            { icon: <Building2 size={24} className="md:w-7 md:h-7" />, color: "orange", title: "พัฒนาอาคารสถานที่", desc: "ซ่อมแซมห้องเรียนและปรับปรุงภูมิทัศน์" },
                            { icon: <Heart size={24} className="md:w-7 md:h-7" />, color: "pink", title: "กิจกรรมส่งเสริมคุณธรรม", desc: "สนับสนุนค่ายพุทธบุตรและกิจกรรมวันสำคัญ" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-${item.color}-50 text-${item.color}-600`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-slate-700 text-sm md:text-base">{item.title}</h4>
                                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- ✅ Modal Form Section --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl relative z-50 animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto flex flex-col">

                        {/* Header */}
                        <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-100 sticky top-0 bg-white z-20">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800">แจ้งหลักฐานการโอนเงิน</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-5 md:p-8">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">ชื่อ <span className="text-red-500">*</span></label>
                                    <input required type="text" className="w-full p-2.5 md:p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all text-sm md:text-base"
                                        value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} placeholder="ชื่อจริง" />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">นามสกุล <span className="text-red-500">*</span></label>
                                    <input required type="text" className="w-full p-2.5 md:p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all text-sm md:text-base"
                                        value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} placeholder="นามสกุล" />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                                    <input required type="tel" className="w-full p-2.5 md:p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all text-sm md:text-base"
                                        value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="08xxxxxxxx" />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">อีเมล (ถ้ามี)</label>
                                    <input type="email" className="w-full p-2.5 md:p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all text-sm md:text-base"
                                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" />
                                </div>
                                <div className="space-y-1.5 md:space-y-2 sm:col-span-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">จำนวนเงินที่โอน (บาท) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input required type="number" min="1" className="w-full p-2.5 md:p-3 pl-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none text-base md:text-lg font-medium transition-all"
                                            value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} placeholder="0.00" />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs md:text-sm font-bold">THB</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2 sm:col-span-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-700">หลักฐานการโอน (สลิป) <span className="text-red-500">*</span></label>
                                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 md:p-8 text-center hover:bg-slate-50 hover:border-[#B89B5F] cursor-pointer transition-all bg-white group">
                                        <input required type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={e => e.target.files && setFormData({ ...formData, slip_image: e.target.files[0] })} />
                                        <div className="flex flex-col items-center gap-2 md:gap-3 text-slate-400 group-hover:text-[#B89B5F] transition-colors">
                                            <div className="p-2 md:p-3 bg-slate-100 rounded-full group-hover:bg-[#B89B5F]/10">
                                                <UploadCloud size={24} className="md:w-8 md:h-8" />
                                            </div>
                                            <span className="text-xs md:text-sm font-medium truncate max-w-[200px] md:max-w-full">
                                                {formData.slip_image ? (
                                                    <span className="text-emerald-600 font-bold flex items-center justify-center gap-2">
                                                        <CheckCircle2 size={16} /> {formData.slip_image.name}
                                                    </span>
                                                ) : "คลิกเพื่ออัปโหลดรูปภาพสลิป"}
                                            </span>
                                            <span className="text-[10px] md:text-xs text-slate-400">รองรับ JPG, PNG ขนาดไม่เกิน 5MB</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-2 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 md:py-4 bg-[#1D2340] text-white rounded-xl font-bold text-base md:text-lg hover:bg-[#2a325a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" /> กำลังส่งข้อมูล...
                                            </>
                                        ) : "ยืนยันการแจ้งโอน"}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}