"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import MapWithMarker from "./MapWithMarker";

export default function Maps() {
    return (
        <main className="bg-[#faf9f7] min-h-screen text-[#1D2340]" id="maps">
            <section className="max-w-5xl mx-auto px-6 pt-20 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D2340] tracking-wide">
                    ติดต่อศูนย์ศึกษาพระพุทธศาสนา
                </h1>

                <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
                    ข้อมูลการติดต่อ – ที่ตั้ง – และช่องทางการสื่อสารของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง
                </p>

                {/* เส้นทอง */}
                <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-[#c9b27c] to-[#e1d2a4] rounded-full"></div>
            </section>

            {/* ---------------- MAIN CONTENT GRID ---------------- */}
            <section className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-12">

                {/* LEFT SIDE – MAP CARD */}
                <div>
                    <div className="
                        bg-white rounded-3xl overflow-hidden shadow-xl
                        border border-[#e8e0c8]
                        hover:shadow-2xl transition-all
                    ">
                        <iframe
                            loading="lazy"
                            className="w-full h-[260px] md:h-[300px]"
                            style={{ border: 0 }}
                            allowFullScreen
                            src="
                                https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387.3585425831821!2d100.5224592!3d13.8344052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b7ba398708f%3A0x28c5ca2da6294943!2sWat%20Thang%20Luang!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth
                            "
                        ></iframe>
                    </div>

                    {/* Address Card */}
                    <div className="mt-8 bg-white rounded-2xl p-6 shadow-md border border-[#eee6d4]">
                        <h3 className="text-xl font-bold text-[#b89b5f]">
                            ที่อยู่ศูนย์
                        </h3>
                        <p className="text-gray-700 mt-3 leading-relaxed">
                            ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง  
                            <br />เลขที่ 132 ม.6 ถ.กรุงเทพฯ-นนท์ ซ.กรุงเทพฯ-นนท์ 2 ต.บางเขน อ.เมืองนนทบุรี จ.นนทบุรี
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE – CONTACT & IMAGES */}
                <div className="space-y-8">

                    {/* Contact Info */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#e8dcc4] relative overflow-hidden">

                        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"></div>

                        <h2 className="text-2xl font-bold text-[#1D2340]">
                            ช่องทางการติดต่อ
                        </h2>

                        <div className="mt-6 space-y-5">

                            <div className="flex gap-4 items-start">
                                <MapPin className="text-[#b89b5f]" size={22} />
                                <p className="text-gray-700">ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง</p>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Phone className="text-[#b89b5f]" size={22} />
                                <p className="text-gray-700">โทร: 02-123-4567</p>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Mail className="text-[#b89b5f]" size={22} />
                                <p className="text-gray-700">อีเมล: info@buddhistcenter.or.th</p>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Clock className="text-[#b89b5f]" size={22} />
                                <p className="text-gray-700">
                                    วันอาทิตย์ 08.00 – 17.00 น.  
                                    <br />วันนักขัตฤกษ์ เปิดตามประกาศ
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Decorative Images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <Image
                                src="/images/LINE_ALBUM_21268_251203_1.jpg"
                                width={500}
                                height={350}
                                alt="วัดทางหลวง"
                                className="object-cover h-[140px] w-full"
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <Image
                                src="/images/LINE_ALBUM_21268_251203_2.jpg"
                                width={500}
                                height={350}
                                alt="กิจกรรมศูนย์"
                                className="object-cover h-[140px] w-full"
                            />
                        </div>
                    </div>

                </div>

            </section>

            {/* ---------------- CTA ---------------- */}
            <section className="text-center mt-20 min-h-[100px]">
                <a
                    href="https://www.google.com/maps/place/Wat+Thang+Luang/@13.8340557,100.5225502,19z/data=!4m6!3m5!1s0x30e29b7ba398708f:0x28c5ca2da6294943!8m2!3d13.8344052!4d100.5224592!16s%2Fg%2F1pzszstm6?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    className="px-10 py-3 bg-[#b89b5f] text-white rounded-full text-lg 
                               shadow-md hover:bg-[#a68852] transition-all"
                >
                    เปิดแผนที่ใน Google Maps
                </a>
            </section>

        </main>
    );
}
