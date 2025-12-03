// "use client";

// import Image from "next/image";

// export default function AboutPage() {
//     return (
//         <main className="min-h-screen bg-white text-gray-800">

//             <section className="relative w-full h-[280px] md:h-[380px]">
//                 <Image
//                     src="/images/center-hero.jpg"
//                     alt="ศูนย์พัฒนาเด็กเล็กวัดทางหลวง"
//                     fill
//                     className="object-cover brightness-90"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                     <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
//                         เกี่ยวกับศูนย์พัฒนาเด็กเล็ก
//                     </h1>
//                 </div>
//             </section>

//             {/* CONTENT */}
//             <section className="max-w-5xl mx-auto px-5 py-12 space-y-14">

//                 {/* ประวัติ */}
//                 <article id="history" className="space-y-4">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                         ประวัติความเป็นมา
//                     </h2>
//                     <p className="text-lg leading-relaxed text-gray-700">
//                         ศูนย์พัฒนาเด็กเล็กวัดทางหลวงก่อตั้งขึ้นเมื่อปี พ.ศ. 25xx
//                         โดยความร่วมมือระหว่างวัดทางหลวง หน่วยงานท้องถิ่น และชุมชน
//                         เพื่อให้บริการด้านการดูแลและพัฒนาเด็กปฐมวัยอายุ 2–6 ปี
//                         ภายใต้มาตรฐานการเรียนรู้ตามกระทรวงศึกษาธิการ
//                         พร้อมทั้งมีการปรับปรุงอาคาร สื่อการเรียนรู้ และสนามเด็กเล่น
//                         ให้มีความปลอดภัยและเหมาะสมต่อพัฒนาการเด็กมาอย่างต่อเนื่อง
//                     </p>
//                 </article>

//                 {/* วิสัยทัศน์ */}
//                 <article id="vision" className="space-y-4">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                         วิสัยทัศน์ (Vision)
//                     </h2>
//                     <p className="text-lg leading-relaxed text-gray-700">
//                         เป็นศูนย์พัฒนาเด็กเล็กต้นแบบที่มุ่งเสริมสร้างทักษะชีวิต
//                         และพัฒนาการรอบด้านให้เด็กเติบโตอย่างมั่นใจ
//                         ในสภาพแวดล้อมที่ปลอดภัย อบอุ่น และเป็นมิตรต่อการเรียนรู้
//                     </p>
//                 </article>

//                 {/* พันธกิจ */}
//                 <article id="mission" className="space-y-4">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                         พันธกิจ (Mission)
//                     </h2>
//                     <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
//                         <li>ส่งเสริมพัฒนาการเด็ก 4 ด้านอย่างเหมาะสมตามช่วงวัย</li>
//                         <li>จัดกิจกรรมการเรียนรู้ผ่านการเล่น (Play-based Learning)</li>
//                         <li>สร้างสภาพแวดล้อมปลอดภัยและเป็นมิตร</li>
//                         <li>ส่งเสริมความร่วมมือจากครอบครัวและชุมชน</li>
//                         <li>พัฒนาศักยภาพบุคลากรด้านเด็กปฐมวัยอย่างต่อเนื่อง</li>
//                     </ul>
//                 </article>

//                 {/* จุดเด่น */}
//                 <article id="highlights" className="space-y-8">
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                         จุดเด่นของศูนย์
//                     </h2>

//                     <div className="grid md:grid-cols-3 gap-6">
//                         <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
//                             <h3 className="text-xl font-semibold mb-2">หลักสูตรทันสมัย</h3>
//                             <p className="text-gray-700">
//                                 เน้นการเรียนรู้ผ่านการเล่น ส่งเสริมทักษะสมวัยและความคิดสร้างสรรค์
//                             </p>
//                         </div>

//                         <div className="p-6 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition">
//                             <h3 className="text-xl font-semibold mb-2">ทีมงานมืออาชีพ</h3>
//                             <p className="text-gray-700">
//                                 ครูผู้ดูแลผ่านการอบรมตามมาตรฐานกระทรวงศึกษาธิการ
//                             </p>
//                         </div>

//                         <div className="p-6 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition">
//                             <h3 className="text-xl font-semibold mb-2">ปลอดภัยและอบอุ่น</h3>
//                             <p className="text-gray-700">
//                                 อาคารและพื้นที่กิจกรรมออกแบบตามหลักความปลอดภัยของเด็กเล็ก
//                             </p>
//                         </div>
//                     </div>
//                 </article>
//             </section>
//         </main>
//     );
// }

"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="bg-gradient-to-b from-white to-gray-50 text-gray-800">

            {/* HERO SECTION */}
            <section className="relative h-[380px] md:h-[450px] w-full">
                <Image
                    src="/images/center-hero.jpg"
                    fill
                    alt="ศูนย์พัฒนาเด็กเล็กวัดทางหลวง"
                    className="object-cover rounded-b-3xl"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
                            เกี่ยวกับเรา
                        </h1>
                        <p className="mt-4 text-lg text-gray-200">
                            ศูนย์พัฒนาเด็กเล็กวัดทางหลวง — เสริมสร้างอนาคตด้วยหัวใจ
                        </p>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="max-w-6xl mx-auto px-6 py-14 space-y-20">

                {/* ประวัติความเป็นมา */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                            ประวัติความเป็นมา
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            ศูนย์พัฒนาเด็กเล็กวัดทางหลวงก่อตั้งขึ้นเมื่อปี พ.ศ. 25xx 
                            โดยชุมชนวัดทางหลวงร่วมกับองค์กรปกครองส่วนท้องถิ่น 
                            เพื่อเป็นพื้นที่ปลอดภัยสำหรับเด็กอายุ 2–6 ปี 
                            ในการเรียนรู้ผ่านการเล่นและกิจกรรมพัฒนาศักยภาพรอบด้าน
                            ด้วยทีมครูผู้เชี่ยวชาญด้านปฐมวัยและสภาพแวดล้อมที่อบอุ่น
                        </p>
                    </div>

                    {/* ภาพประวัติ */}
                    <div className="relative">
                        <Image
                            src="/images/about-history.jpg"
                            width={600}
                            height={400}
                            alt="ประวัติศูนย์"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                </div>

                {/* วิสัยทัศน์ – mission */}
                <div className="bg-white/70 backdrop-blur-md shadow-lg p-10 rounded-3xl border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Vision */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">วิสัยทัศน์</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                มุ่งเป็นศูนย์พัฒนาเด็กเล็กต้นแบบ 
                                ที่เน้นการพัฒนาทักษะชีวิตและการเรียนรู้ผ่านประสบการณ์จริง 
                                เพื่อให้เด็กเติบโตอย่างมั่นใจทั้งด้านร่างกาย อารมณ์ สังคม และสติปัญญา
                            </p>
                        </div>

                        {/* Mission */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">พันธกิจ</h2>
                            <ul className="space-y-3 text-lg text-gray-600">
                                <li>• ส่งเสริมพัฒนาการเด็กทั้ง 4 ด้าน</li>
                                <li>• จัดการเรียนรู้แบบ play-based learning</li>
                                <li>• สภาพแวดล้อมปลอดภัยและเป็นมิตร</li>
                                <li>• ทำงานร่วมกับผู้ปกครองและชุมชน</li>
                                <li>• พัฒนาศักยภาพครูผู้ดูแลเด็กอย่างต่อเนื่อง</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* จุดเด่นของศูนย์ */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        จุดเด่นของศูนย์พัฒนาเด็กเล็ก
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="p-7 border bg-white shadow-sm rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">หลักสูตรทันสมัย</h3>
                            <p className="text-gray-600">
                                เน้นการเรียนรู้ผ่านการเล่น พร้อมพัฒนาการและทักษะสมวัย
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-7 border bg-white shadow-sm rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">ครูผู้เชี่ยวชาญ</h3>
                            <p className="text-gray-600">
                                บุคลากรผ่านการอบรมด้านปฐมวัยตามกระทรวงศึกษาธิการ
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-7 border bg-white shadow-sm rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">ปลอดภัยสูงสุด</h3>
                            <p className="text-gray-600">
                                อาคาร อุปกรณ์ และสนามเด็กเล่นออกแบบตามมาตรฐานความปลอดภัย
                            </p>
                        </div>

                    </div>
                </div>

            </section>
        </main>
    );
}
