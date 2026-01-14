// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { 
//     Copy, CheckCircle2, Heart, GraduationCap, 
//     QrCode, AlertCircle, Building2 
// } from "lucide-react";
// import { api } from "@/libs/axios";
// import Swal from "sweetalert2";

// export default function DonationUser() {
//     const [copied, setCopied] = useState(false);

//     // ข้อมูลบัญชีธนาคาร (ตัวอย่าง)
//     const bankInfo = {
//         bankName: "ธนาคารกรุงไทย",
//         accountName: "ศูนย์การเรียนรู้ทางวัฒนธรรมวัดทางหลวง",
//         accountNumber: "108-0-94700-0", 
//         branch: "สาขานนทบุรี"
//     };

//     const handleCopy = () => {
//         navigator.clipboard.writeText(bankInfo.accountNumber.replace(/-/g, ''));
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     const [formData, setFormData] = useState({
//         first_name: "", last_name: "", email: "", phone: "", amount: "", note: "", slip_image: null as File | null
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             if (value) data.append(key, value);
//         });

//         try {
//             await api.post('/api/public/donations', data);
//             Swal.fire({ icon: 'success', title: 'แจ้งโอนเงินเรียบร้อย', text: 'เจ้าหน้าที่จะตรวจสอบข้อมูลโดยเร็วที่สุด', timer: 2000 });
//             setFormData({ first_name: "", last_name: "", email: "", phone: "", amount: "", note: "", slip_image: null });
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: 'ไม่สามารถส่งข้อมูลได้ โปรดลองใหม่อีกครั้ง' });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
            
//             {/* --- Hero Section --- */}
//             <div className="bg-[#1D2340] text-white py-16 px-6 text-center relative overflow-hidden h-[450px]">
//                 <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
//                 <div className="relative z-10 max-w-3xl mx-auto space-y-4 mt-30">
//                     <span className="inline-block px-3 py-1 bg-[#B89B5F] text-white text-xs font-bold rounded-full uppercase tracking-wider">
//                         Donation
//                     </span>
//                     <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
//                         ร่วมเป็นส่วนหนึ่งในการ<span className="text-[#B89B5F]">สร้างโอกาส</span>ทางการศึกษา
//                     </h1>
//                     <p className="text-slate-300 font-light text-lg">
//                         เงินบริจาคของท่านจะนำไปใช้เพื่อทุนการศึกษา อุปกรณ์การเรียน และพัฒนาศูนย์ศึกษาพระพุทธศาสนา
//                     </p>
//                 </div>
//             </div>

//             {/* --- Main Content --- */}
//             <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 relative z-20">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//                     {/* Left Column: Bank & Payment Info (7 cols) */}
//                     <div className="lg:col-span-7 space-y-6">
                        
//                         {/* Bank Account Card */}
//                         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
//                             <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
//                                 <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 w-120">
//                                     ทุกการร่วมบุญสามารถลดหย่อนภาษีได้ ผ่านระบบสรรพากรโดยตรง ร่วมบุญผ่าน {bankInfo.bankName}
//                                 </h3>
//                             </div>
//                             <div className="p-8 space-y-6">
//                                 <div>
//                                     <p className="text-sm text-slate-400 mb-1">ชื่อบัญชี</p>
//                                     <p className="text-lg font-bold text-slate-800">{bankInfo.accountName}</p>
//                                 </div>
                                
//                                 <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
//                                     <div>
//                                         <p className="text-sm text-slate-400 mb-1">เลขที่บัญชี</p>
//                                         <p className="text-3xl font-mono font-bold text-[#1D2340] tracking-wider">
//                                             {bankInfo.accountNumber}
//                                         </p>
//                                     </div>
//                                     <button 
//                                         onClick={handleCopy}
//                                         className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
//                                             copied 
//                                             ? "bg-emerald-500 text-white" 
//                                             : "bg-white border border-slate-200 hover:border-[#B89B5F] hover:text-[#B89B5F]"
//                                         }`}
//                                     >
//                                         {copied ? <CheckCircle2 size={18}/> : <Copy size={18}/>}
//                                         {copied ? "คัดลอกแล้ว" : "คัดลอก"}
//                                     </button>
//                                 </div>

//                                 <div className="text-sm text-slate-500 flex items-center gap-2">
//                                     <span className="w-2 h-2 bg-[#B89B5F] rounded-full"></span>
//                                     สาขา: {bankInfo.branch}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* QR Code Card */}
//                         <div className="bg-[#1D2340] rounded-3xl shadow-xl overflow-hidden text-white p-8 flex flex-col md:flex-row items-center gap-8">
//                             <div className="bg-white p-4 rounded-2xl shadow-inner max-w-[200px] w-full">
//                                 {/* ⚠️ ใส่รูป QR Code จริงที่นี่ */}
//                                 <div className="aspect-square bg-slate-200 relative rounded-lg overflow-hidden flex items-center justify-center text-slate-400">
//                                     <QrCode size={64} />
//                                     {/* <Image src="/images/donation-qr.jpg" fill alt="QR Code" className="object-cover" /> */}
//                                 </div>
//                             </div>
//                             <div className="flex-1 text-center md:text-left space-y-3">
//                                 <h3 className="text-xl font-bold text-[#B89B5F]">E-Donation / PromptPay</h3>
//                                 <p className="text-slate-300 font-light text-sm leading-relaxed">
//                                     สามารถสแกน QR Code ผ่านแอปพลิเคชันธนาคารเพื่อบริจาคได้ทันที (ลดหย่อนภาษีได้ตามเงื่อนไขกรมสรรพากร)
//                                 </p>
//                                 <div className="pt-2">
//                                     <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300">
//                                         รองรับทุกธนาคาร
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                     {/* Right Column: Instructions & Contact (5 cols) */}
//                     <div className="lg:col-span-5 space-y-6">
                        
//                         {/* Process Info */}
//                         <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
//                             <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
//                                 <CheckCircle2 className="text-[#B89B5F]" /> ขั้นตอนการแจ้งหลักฐาน
//                             </h3>
//                             <ul className="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-8">
//                                 <li className="relative">
//                                     <span className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">1</span>
//                                     <h4 className="font-bold text-slate-700">โอนเงินเข้าบัญชี</h4>
//                                     <p className="text-sm text-slate-500 mt-1">ตามรายละเอียดด้านซ้ายมือ</p>
//                                 </li>
//                                 <li className="relative">
//                                     <span className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">2</span>
//                                     <h4 className="font-bold text-slate-700">ส่งหลักฐานการโอน</h4>
//                                     <p className="text-sm text-slate-500 mt-1">ส่งสลิปโอนเงิน แจ้งชื่อ-นามสกุล และที่อยู่ ผ่านช่องทาง Line หรือ Facebook</p>
//                                 </li>
//                                 <li className="relative">
//                                     <span className="absolute -left-[39px] top-0 w-6 h-6 bg-[#B89B5F] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">3</span>
//                                     <h4 className="font-bold text-slate-700">รับใบอนุโมทนาบัตร</h4>
//                                     <p className="text-sm text-slate-500 mt-1">เจ้าหน้าที่จะดำเนินการตรวจสอบและจัดส่งให้ภายใน 7 วันทำการ</p>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Contact Buttons */}
//                         <div className="grid grid-cols-1 gap-3">
//                             <a 
//                                 href="https://line.me/ti/p/..." // ใส่ Link Line
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#1D2340] text-white font-bold hover:bg-[#05b54d] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
//                             >
                                
//                                 ส่งสลิปผ่านระบบ
//                             </a>
//                             <a 
//                                 href="https://line.me/ti/p/..." // ใส่ Link Line
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#06C755] text-white font-bold hover:bg-[#05b54d] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
//                             >
//                                 <Image src="/images/line-icon.png" width={24} height={24} alt="Line" className="brightness-0 invert" /> 
//                                 ส่งสลิปผ่าน LINE
//                             </a>
//                             <a 
//                                 href="https://facebook.com/..." // ใส่ Link Facebook
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#1877F2] text-white font-bold hover:bg-[#166fe5] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
//                             >
//                                 <Image src="/images/facebook-icon.png" width={24} height={24} alt="Facebook" className="brightness-0 invert" />
//                                 ส่งสลิปผ่าน Facebook
//                             </a>
//                         </div>

//                         {/* Note */}
//                         <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3 items-start">
//                             <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
//                             <p className="text-xs text-orange-700 leading-relaxed">
//                                 <span className="font-bold">หมายเหตุ:</span> ทางศูนย์ฯ ไม่มีนโยบายให้โอนเงินเข้าบัญชีส่วนบุคคล บัญชีรับบริจาคต้องเป็นชื่อ "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง" เท่านั้น
//                             </p>
//                         </div>

//                     </div>
//                 </div>

//                 {/* --- Impact Section (Optional) --- */}
//                 <div className="mt-16 text-center max-w-4xl mx-auto px-6">
//                     <h3 className="text-2xl font-bold text-slate-800 mb-8">เงินบริจาคของท่านไปไหน?</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
//                             <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
//                                 <GraduationCap size={28}/>
//                             </div>
//                             <h4 className="font-bold text-slate-700">ทุนการศึกษา</h4>
//                             <p className="text-sm text-slate-500">มอบโอกาสให้นักเรียนที่ขาดแคลนทุนทรัพย์</p>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
//                             <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
//                                 <Building2 size={28}/>
//                             </div>
//                             <h4 className="font-bold text-slate-700">พัฒนาอาคารสถานที่</h4>
//                             <p className="text-sm text-slate-500">ซ่อมแซมห้องเรียนและปรับปรุงภูมิทัศน์</p>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
//                             <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center">
//                                 <Heart size={28}/>
//                             </div>
//                             <h4 className="font-bold text-slate-700">กิจกรรมส่งเสริมคุณธรรม</h4>
//                             <p className="text-sm text-slate-500">สนับสนุนค่ายพุทธบุตรและกิจกรรมวันสำคัญ</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import { 
    Copy, CheckCircle2, Heart, GraduationCap, 
    QrCode, AlertCircle, Building2, X, UploadCloud, Loader2 
} from "lucide-react";
import { api } from "@/libs/axios"; // Ensure this path is correct for your setup
import Swal from "sweetalert2";

export default function DonationUser() {
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility

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
        accountName: "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง",
        accountNumber: "123-4-56789-0", 
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
            // Replace with your actual API endpoint
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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
            
            {/* --- Hero Section --- */}
            <div className="bg-[#1D2340] text-white py-16 px-6 text-center relative overflow-hidden h-[450px]">
                {/* ... (Hero content remains same) ... */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-4 mt-20 md:mt-32">
                    <span className="inline-block px-3 py-1 bg-[#B89B5F] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        Donation
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                        ร่วมเป็นส่วนหนึ่งในการ<span className="text-[#B89B5F]">สร้างโอกาส</span>ทางการศึกษา
                    </h1>
                    <p className="text-slate-300 font-light text-lg">
                        เงินบริจาคของท่านจะนำไปใช้เพื่อทุนการศึกษา อุปกรณ์การเรียน และพัฒนาศูนย์ศึกษาพระพุทธศาสนา
                    </p>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Bank & Payment Info (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Bank Account Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                             {/* ... (Bank Card content remains same) ... */}
                             <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    <Building2 className="text-[#B89B5F]" /> โอนเงินผ่านบัญชีธนาคาร
                                </h3>
                                {/* Placeholder for Bank Logo */}
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div> 
                            </div>
                            <div className="p-8 space-y-6">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">ชื่อบัญชี</p>
                                    <p className="text-lg font-bold text-slate-800">{bankInfo.accountName}</p>
                                </div>
                                
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-400 mb-1">เลขที่บัญชี</p>
                                        <p className="text-3xl font-mono font-bold text-[#1D2340] tracking-wider">
                                            {bankInfo.accountNumber}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={handleCopy}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                                            copied 
                                            ? "bg-emerald-500 text-white" 
                                            : "bg-white border border-slate-200 hover:border-[#B89B5F] hover:text-[#B89B5F]"
                                        }`}
                                    >
                                        {copied ? <CheckCircle2 size={18}/> : <Copy size={18}/>}
                                        {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                                    </button>
                                </div>

                                <div className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#B89B5F] rounded-full"></span>
                                    สาขา: {bankInfo.branch}
                                </div>
                            </div>
                        </div>

                        {/* QR Code Card */}
                        <div className="bg-[#1D2340] rounded-3xl shadow-xl overflow-hidden text-white p-8 flex flex-col md:flex-row items-center gap-8">
                             {/* ... (QR Code content remains same) ... */}
                             <div className="bg-white p-4 rounded-2xl shadow-inner max-w-[200px] w-full">
                                <div className="aspect-square bg-slate-200 relative rounded-lg overflow-hidden flex items-center justify-center text-slate-400">
                                    <QrCode size={64} />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-3">
                                <h3 className="text-xl font-bold text-[#B89B5F]">E-Donation / PromptPay</h3>
                                <p className="text-slate-300 font-light text-sm leading-relaxed">
                                    สามารถสแกน QR Code ผ่านแอปพลิเคชันธนาคารเพื่อบริจาคได้ทันที (ลดหย่อนภาษีได้ตามเงื่อนไขกรมสรรพากร)
                                </p>
                                <div className="pt-2">
                                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300">
                                        รองรับทุกธนาคาร
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Instructions & Contact (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Process Info */}
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                             {/* ... (Process content remains same) ... */}
                             <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-[#B89B5F]" /> ขั้นตอนการแจ้งหลักฐาน
                            </h3>
                            <ul className="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-8">
                                <li className="relative">
                                    <span className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">1</span>
                                    <h4 className="font-bold text-slate-700">โอนเงินเข้าบัญชี</h4>
                                    <p className="text-sm text-slate-500 mt-1">ตามรายละเอียดด้านซ้ายมือ</p>
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[39px] top-0 w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">2</span>
                                    <h4 className="font-bold text-slate-700">ส่งหลักฐานการโอน</h4>
                                    <p className="text-sm text-slate-500 mt-1">ส่งสลิปโอนเงิน แจ้งชื่อ-นามสกุล และที่อยู่ ผ่านช่องทาง Line หรือ Facebook</p>
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[39px] top-0 w-6 h-6 bg-[#B89B5F] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">3</span>
                                    <h4 className="font-bold text-slate-700">รับใบอนุโมทนาบัตร</h4>
                                    <p className="text-sm text-slate-500 mt-1">เจ้าหน้าที่จะดำเนินการตรวจสอบและจัดส่งให้ภายใน 7 วันทำการ</p>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            {/* ✅ Modified Button to Open Modal */}
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#1D2340] text-white font-bold hover:bg-[#2a325a] transition-all shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                            >
                                <UploadCloud size={24} />
                                ส่งสลิปผ่านระบบ
                            </button>

                            <a 
                                href="#" // Replace with actual Line Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#06C755] text-white font-bold hover:bg-[#05b54d] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Placeholder for Line Icon */}
                                <div className="w-6 h-6 bg-white/20 rounded-full"></div> 
                                ส่งสลิปผ่าน LINE
                            </a>
                            <a 
                                href="#" // Replace with actual Facebook Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#1877F2] text-white font-bold hover:bg-[#166fe5] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Placeholder for Facebook Icon */}
                                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                                ส่งสลิปผ่าน Facebook
                            </a>
                        </div>

                        {/* Note */}
                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3 items-start">
                            <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                            <p className="text-xs text-orange-700 leading-relaxed">
                                <span className="font-bold">หมายเหตุ:</span> ทางศูนย์ฯ ไม่มีนโยบายให้โอนเงินเข้าบัญชีส่วนบุคคล บัญชีรับบริจาคต้องเป็นชื่อ "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง" เท่านั้น
                            </p>
                        </div>

                    </div>
                </div>

                {/* --- Impact Section --- */}
                <div className="mt-16 text-center max-w-4xl mx-auto px-6">
                     {/* ... (Impact section content remains same) ... */}
                     <h3 className="text-2xl font-bold text-slate-800 mb-8">เงินบริจาคของท่านไปไหน?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                <GraduationCap size={28}/>
                            </div>
                            <h4 className="font-bold text-slate-700">ทุนการศึกษา</h4>
                            <p className="text-sm text-slate-500">มอบโอกาสให้นักเรียนที่ขาดแคลนทุนทรัพย์</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                                <Building2 size={28}/>
                            </div>
                            <h4 className="font-bold text-slate-700">พัฒนาอาคารสถานที่</h4>
                            <p className="text-sm text-slate-500">ซ่อมแซมห้องเรียนและปรับปรุงภูมิทัศน์</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center">
                                <Heart size={28}/>
                            </div>
                            <h4 className="font-bold text-slate-700">กิจกรรมส่งเสริมคุณธรรม</h4>
                            <p className="text-sm text-slate-500">สนับสนุนค่ายพุทธบุตรและกิจกรรมวันสำคัญ</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- ✅ Modal Form Section --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-20">
                            <h3 className="text-xl font-bold text-slate-800">แจ้งหลักฐานการโอนเงิน</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">ชื่อ <span className="text-red-500">*</span></label>
                                    <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all" 
                                        value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} placeholder="ชื่อจริง" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">นามสกุล <span className="text-red-500">*</span></label>
                                    <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all" 
                                        value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} placeholder="นามสกุล" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                                    <input required type="tel" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all" 
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="08xxxxxxxx" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">อีเมล (ถ้ามี)</label>
                                    <input type="email" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none transition-all" 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">จำนวนเงินที่โอน (บาท) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input required type="number" min="1" className="w-full p-3 pl-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#B89B5F] outline-none text-lg font-medium transition-all" 
                                            value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">THB</span>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">หลักฐานการโอน (สลิป) <span className="text-red-500">*</span></label>
                                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-[#B89B5F] cursor-pointer transition-all bg-white group">
                                        <input required type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={e => e.target.files && setFormData({...formData, slip_image: e.target.files[0]})} />
                                        <div className="flex flex-col items-center gap-3 text-slate-400 group-hover:text-[#B89B5F] transition-colors">
                                            <div className="p-3 bg-slate-100 rounded-full group-hover:bg-[#B89B5F]/10">
                                                <UploadCloud size={32} />
                                            </div>
                                            <span className="text-sm font-medium">
                                                {formData.slip_image ? (
                                                    <span className="text-emerald-600 font-bold flex items-center gap-2">
                                                        <CheckCircle2 size={16}/> {formData.slip_image.name}
                                                    </span>
                                                ) : "คลิกเพื่ออัปโหลดรูปภาพสลิป"}
                                            </span>
                                            <span className="text-xs text-slate-400">รองรับ JPG, PNG ขนาดไม่เกิน 5MB</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="md:col-span-2 mt-2">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="w-full py-4 bg-[#1D2340] text-white rounded-xl font-bold text-lg hover:bg-[#2a325a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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