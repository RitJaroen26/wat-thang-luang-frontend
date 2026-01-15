"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="bg-gray-50 text-gray-800">
            <section className="relative h-[160px] md:h-[180px] w-full">
                <Image
                    src="/images/LINE_ALBUM_21268_251203_11.jpg"
                    fill
                    alt="วัดทางหลวง"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center"></div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
                <div className="space-y-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
                            ประวัติความเป็นมา
                        </h2>
                        <div className="w-20 mx-auto mt-3 h-1 bg-blue-900 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-14 items-center">
                        <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                            <p>
                                ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง  
                                ก่อตั้งขึ้นเมื่อ 
                                <span className="font-semibold text-gray-900"> พ.ศ. 2501 </span>
                                จากความตั้งใจร่วมกันของคณะสงฆ์ คณะกรรมการวัด 
                                และพุทธศาสนิกชนในชุมชน ที่ต้องการให้วัดเป็นสถานที่ปลูกฝังคุณธรรม 
                                และหลักธรรมทางพระพุทธศาสนาแก่เด็กและเยาวชนอย่างเป็นระบบ
                            </p>

                            <p>
                                ในระยะเริ่มต้น ศูนย์ฯ ใช้พื้นที่ศาลาการเปรียญของวัดเป็นห้องเรียนธรรมะ  
                                จัดกิจกรรมสวดมนต์ ฟังธรรม เล่านิทานธรรมะ และฝึกสมาธิอย่างเรียบง่าย 
                                เน้นให้เด็กและเยาวชนค่อย ๆ ซึมซับหลักธรรมผ่านกิจกรรมที่เข้าใจง่าย 
                                เหมาะสมกับวัย และไม่ห่างเหินจากวิถีของชุมชน
                            </p>

                            <p>
                                ต่อมาเมื่อมีเด็กและเยาวชนเข้าร่วมจำนวนมากขึ้น ศูนย์ฯ ได้พัฒนารูปแบบการเรียนรู้ 
                                แบ่งระดับตามช่วงวัย วางโครงสร้างหลักสูตรธรรมศึกษาเบื้องต้น 
                                ควบคู่กับกิจกรรมส่งเสริมคุณธรรม เช่น ความกตัญญู ความมีวินัย 
                                การรู้จักแบ่งปัน และการทำงานร่วมกับผู้อื่น
                            </p>

                            <p>
                                ปัจจุบัน ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง 
                                เป็นแหล่งเรียนรู้ทางพระพุทธศาสนาที่สำคัญของชุมชน 
                                ทำหน้าที่หล่อหลอมเยาวชนให้เติบโตอย่างสมดุลทั้งด้านจิตใจ สติปัญญา 
                                และคุณธรรม พร้อมเป็นกำลังที่ดีของสังคมในอนาคต
                            </p>
                        </div>

                        <div className="relative">
                            <Image
                                src="/images/LINE_ALBUM_21268_251203_24.jpg"
                                width={600}
                                height={400}
                                alt="ประวัติศูนย์"
                                className="rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION: SYMBOL ---------------------------------- */}
                <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-14 items-center">

                        <div className="relative">
                            <Image
                                src="/images/logo_image.jpg"
                                width={600}
                                height={400}
                                alt="ตราศูนย์"
                                className="rounded-2xl shadow-lg bg-white p-4"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                ความหมายตราประจำศูนย์
                            </h2>
                            <div className="w-20 mt-3 h-1 bg-blue-900 rounded-full"></div>

                            <div className="space-y-4 mt-5 text-lg leading-relaxed text-gray-700">
                                <p>
                                    ตราสัญลักษณ์ของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง 
                                    ออกแบบขึ้นเพื่อสะท้อนอัตลักษณ์ของศูนย์ฯ 
                                    ที่มุ่งพัฒนาทั้งด้านปัญญา คุณธรรม และการรักษาวัฒนธรรมไทยไว้ควบคู่กัน
                                </p>

                                <p>
                                    <span className="font-semibold text-gray-900">ธรรมจักร</span>  
                                    {" "}สื่อถึงพระธรรมคำสอนของพระพุทธเจ้า 
                                    ที่หมุนเวียนเผยแพร่ไปอย่างไม่หยุดยั้ง เปรียบดังภารกิจของศูนย์ฯ 
                                    ในการนำหลักธรรมไปสู่เด็กและเยาวชนรุ่นแล้วรุ่นเล่า
                                </p>

                                <p>
                                    <span className="font-semibold text-gray-900">ดอกบัว</span>  
                                    {" "}หมายถึงจิตใจที่บริสุทธิ์และปัญญาที่ค่อย ๆ เบิกบาน 
                                    เปรียบเหมือนเด็กและเยาวชนที่ได้รับการอบรมบ่มเพาะด้วยพระธรรม 
                                    จนเติบโตเป็นผู้มีคุณธรรมและรู้เท่าทันโลก
                                </p>

                                <p>
                                    ข้อความคติธรรม 
                                    <span className="font-semibold text-gray-900">
                                        {" "}“ปัญญา โลกสฺมิ ปฏิฏฺฐา”
                                    </span>{" "}
                                    แปลว่า “ปัญญาเป็นแสงสว่างของโลก” 
                                    คือหัวใจของการดำเนินงานของศูนย์ฯ 
                                    ที่มุ่งเน้นให้ผู้เรียนพัฒนาความรู้ควบคู่กับความดีงาม 
                                    ส่วนวงลายไทยโดยรอบสะท้อนรากเหง้าของศิลปวัฒนธรรมไทย 
                                    และการเป็นศูนย์กลางของชุมชนที่พร้อมโอบอุ้มเยาวชนด้วยความรักและเมตตา
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900">
                        จุดเด่นของศูนย์
                    </h2>
                    <div className="w-20 mx-auto mt-3 h-1 bg-blue-900 rounded-full"></div>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="p-7 border bg-white shadow-md rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">หลักสูตรเหมาะสมกับวัย</h3>
                            <p className="text-gray-600">
                                เน้นธรรมะพื้นฐาน การสวดมนต์ ฝึกสมาธิ 
                                และกิจกรรมเสริมคุณธรรมที่เด็กเข้าใจได้จริง
                            </p>
                        </div>

                        <div className="p-7 border bg-white shadow-md rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">กิจกรรมหลากหลาย</h3>
                            <p className="text-gray-600">
                                พัฒนาความกล้าแสดงออก การทำงานร่วมกัน 
                                ความรับผิดชอบ และการช่วยเหลือผู้อื่น
                            </p>
                        </div>

                        <div className="p-7 border bg-white shadow-md rounded-2xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-2">ร่วมพัฒนากับชุมชน</h3>
                            <p className="text-gray-600">
                                วัด โรงเรียน ผู้ปกครอง และชุมชน 
                                ทำงานร่วมกันเพื่อให้เด็กได้รับการดูแลอย่างรอบด้าน
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}
