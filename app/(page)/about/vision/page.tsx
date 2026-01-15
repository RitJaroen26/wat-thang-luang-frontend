"use client";

import Image from "next/image";

export default function MandateVisionPage() {
    return (
        <main className="bg-gray-50 text-gray-800 min-h-screen">

            {/* HERO ---------------------------------------------------- */}
            <section className="relative h-[160px] md:h-[180px] w-full">
                <Image
                    src="/images/LINE_ALBUM_21268_251203_11.jpg"
                    fill
                    alt="ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {/* <div className="max-w-6xl mx-auto px-6">
                        
                    </div> */}
                </div>
            </section>

            {/* MAIN CONTENT ------------------------------------------- */}
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">

                {/* SECTION: อำนาจหน้าที่ -------------------------------- */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-1.5 bg-blue-900 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                อำนาจหน้าที่ของศูนย์
                            </h2>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                ขอบเขตการดำเนินงานและบทบาทของศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                1. ด้านการจัดการเรียนรู้พระพุทธศาสนา
                            </h3>
                            <ul className="space-y-2 text-gray-700 leading-relaxed text-[15px]">
                                <li>• จัดการเรียนการสอนหลักธรรมทางพระพุทธศาสนาที่เหมาะสมกับช่วงวัย</li>
                                <li>• ส่งเสริมการสวดมนต์ ทำวัตร และการฝึกสมาธิอย่างสม่ำเสมอ</li>
                                <li>• พัฒนาหลักสูตรธรรมศึกษาให้เข้าใจง่ายและนำไปใช้ได้ในชีวิตประจำวัน</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                2. ด้านการพัฒนาเด็กและเยาวชน
                            </h3>
                            <ul className="space-y-2 text-gray-700 leading-relaxed text-[15px]">
                                <li>• ส่งเสริมพฤติกรรมที่ดีงาม มีวินัย มีความรับผิดชอบ และรู้จักเสียสละ</li>
                                <li>• จัดกิจกรรมเสริมทักษะชีวิต การทำงานเป็นทีม และการแก้ปัญหาอย่างสร้างสรรค์</li>
                                <li>• ให้การดูแล แนะนำ และเป็นที่ปรึกษาในด้านคุณธรรมและจิตใจ</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                3. ด้านบริหารจัดการศูนย์
                            </h3>
                            <ul className="space-y-2 text-gray-700 leading-relaxed text-[15px]">
                                <li>• วางแผน จัดระบบ และบริหารจัดการงานด้านการเรียนการสอนและกิจกรรมของศูนย์</li>
                                <li>• บริหารทรัพยากร บุคลากร และอุปกรณ์การเรียนการสอนให้เกิดประโยชน์สูงสุด</li>
                                <li>• ประสานงานกับวัด โรงเรียน หน่วยงานราชการ และชุมชนในพื้นที่</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                4. ด้านทำนุบำรุงพระพุทธศาสนาและชุมชน
                            </h3>
                            <ul className="space-y-2 text-gray-700 leading-relaxed text-[15px]">
                                <li>• สืบสานประเพณีและวัฒนธรรมไทยที่เกี่ยวข้องกับพระพุทธศาสนา</li>
                                <li>• เป็นศูนย์กลางการเชื่อมโยงระหว่างวัด เด็ก เยาวชน ผู้ปกครอง และชุมชน</li>
                                <li>• สนับสนุนกิจกรรมชุมชนด้านศีลธรรมและคุณภาพชีวิตอย่างต่อเนื่อง</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION: วิสัยทัศน์ – พันธกิจ -------------------------- */}
                <section className="grid md:grid-cols-2 gap-10 items-start">
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            วิสัยทัศน์ (Vision)
                        </h2>
                        <div className="w-16 h-1 bg-blue-900 rounded-full mb-5" />
                        <p className="text-lg text-gray-700 leading-relaxed">
                            “เป็นศูนย์กลางการเรียนรู้พระพุทธศาสนาที่ปลูกฝังคุณธรรมและปัญญา
                            พัฒนาเด็กและเยาวชนให้เติบโตเป็นคนดี มีวินัย และเป็นกำลังที่มีคุณภาพของสังคม”
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            พันธกิจ (Mission)
                        </h2>
                        <div className="w-16 h-1 bg-blue-900 rounded-full mb-5" />
                        <ul className="space-y-3 text-lg text-gray-700 leading-relaxed">
                            <li>• พัฒนาคุณธรรม จริยธรรม และทักษะชีวิตแก่เด็กและเยาวชน</li>
                            <li>• จัดการเรียนรู้พระพุทธศาสนาอย่างถูกต้อง เหมาะสม และเข้าใจง่าย</li>
                            <li>• สืบสานประเพณีและวัฒนธรรมไทยที่เกี่ยวข้องกับพระพุทธศาสนา</li>
                            <li>• ส่งเสริมความร่วมมือระหว่างวัด โรงเรียน ผู้ปกครอง และชุมชน</li>
                            <li>• พัฒนาศักยภาพครูอาสาและบุคลากรของศูนย์อย่างต่อเนื่อง</li>
                        </ul>
                    </div>
                </section>

                {/* SECTION: เป้าประสงค์ ----------------------------------- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-1.5 bg-blue-900 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                เป้าประสงค์ของศูนย์
                            </h2>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                ผลลัพธ์เชิงรูปธรรมที่ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวงมุ่งหวังให้เกิดขึ้น
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-2">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                1. เยาวชนมีคุณธรรมและวินัย
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ผู้เรียนมีความกตัญญู มีวินัย รับผิดชอบตนเอง เคารพผู้อื่น 
                                และสามารถประพฤติตนตามหลักศีลธรรมได้อย่างเหมาะสม
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                2. เข้าใจและนำหลักธรรมไปใช้ในชีวิต
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                เด็กและเยาวชนสามารถเชื่อมโยงหลักธรรมที่เรียน 
                                กับสถานการณ์ในชีวิตประจำวัน และใช้เป็นแนวทางในการตัดสินใจ
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                3. เสริมสร้างความสัมพันธ์ที่ดีในชุมชน
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ศูนย์ฯ เป็นพื้นที่เชื่อมโยงระหว่างวัด โรงเรียน ผู้ปกครอง และชุมชน 
                                ทำให้เกิดการทำงานร่วมกันอย่างเกื้อกูล
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                4. เป็นต้นแบบศูนย์การเรียนรู้พระพุทธศาสนา
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                พัฒนาศูนย์ฯ ให้มีระบบการเรียนรู้ การจัดกิจกรรม และการบริหารจัดการ 
                                ที่สามารถเป็นต้นแบบให้กับศูนย์อื่น ๆ ได้
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION: ค่านิยม -------------------------------------- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-1.5 bg-blue-900 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                ค่านิยมของศูนย์
                            </h2>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                หลักคิดและทัศนคติร่วมกันที่ยึดถือในการทำงานและการจัดการเรียนรู้ของศูนย์
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mt-4">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center">
                            <p className="text-lg font-semibold text-blue-900 tracking-wide mb-2">
                                เมตตา
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                มีน้ำใจ เอื้อเฟื้อเผื่อแผ่ ดูแลเด็ก เยาวชน และผู้ปกครองด้วยความอบอุ่น
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center">
                            <p className="text-lg font-semibold text-blue-900 tracking-wide mb-2">
                                วินัย
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                ยึดมั่นในระเบียบแบบแผน ตรงต่อเวลา รับผิดชอบหน้าที่ที่ได้รับมอบหมาย
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center">
                            <p className="text-lg font-semibold text-blue-900 tracking-wide mb-2">
                                ปัญญา
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                ส่งเสริมการคิดวิเคราะห์ การเรียนรู้อย่างมีเหตุผล 
                                และการนำธรรมะไปใช้แก้ปัญหาในชีวิต
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 text-center">
                            <p className="text-lg font-semibold text-blue-900 tracking-wide mb-2">
                                ร่วมมือ
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                ทำงานร่วมกันระหว่างวัด ครูอาสา ผู้ปกครอง และชุมชน 
                                ด้วยความสามัคคีและเคารพซึ่งกันและกัน
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION: ยุทธศาสตร์ ----------------------------------- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-1.5 bg-blue-900 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                ยุทธศาสตร์การพัฒนาศูนย์
                            </h2>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                ทิศทางและแนวทางสำคัญในการขับเคลื่อนการดำเนินงานของศูนย์อย่างยั่งยืน
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ยุทธศาสตร์ที่ 1
                            </h3>
                            <p className="font-medium text-gray-800 mb-2">
                                พัฒนาคุณภาพการจัดการเรียนรู้ทางพระพุทธศาสนา
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ปรับปรุงหลักสูตรและกิจกรรมการเรียนการสอนให้เหมาะสมกับเด็กยุคปัจจุบัน 
                                ใช้สื่อและเทคนิคการสอนที่หลากหลาย เข้าใจง่าย และเน้นการนำหลักธรรมไปใช้ได้จริง
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ยุทธศาสตร์ที่ 2
                            </h3>
                            <p className="font-medium text-gray-800 mb-2">
                                เสริมสร้างคุณธรรมพื้นฐานแก่เยาวชน
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                จัดกิจกรรมที่ปลูกฝังความกตัญญู วินัย ความซื่อสัตย์ เมตตา และการช่วยเหลือผู้อื่น 
                                ผ่านการปฏิบัติจริงและการทำงานเป็นกลุ่ม
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ยุทธศาสตร์ที่ 3
                            </h3>
                            <p className="font-medium text-gray-800 mb-2">
                                พัฒนาศูนย์ให้เป็นพื้นที่ปลอดภัยและสร้างสรรค์
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                จัดสภาพแวดล้อมที่เหมาะสมต่อการเรียนรู้และการพักผ่อนของเด็ก 
                                พร้อมดูแลด้านความปลอดภัย สุขภาพ และความเป็นอยู่ของผู้เรียน
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ยุทธศาสตร์ที่ 4
                            </h3>
                            <p className="font-medium text-gray-800 mb-2">
                                สร้างเครือข่ายความร่วมมือกับทุกภาคส่วน
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ทำงานร่วมกับวัด โรงเรียน หน่วยงานรัฐ และผู้ปกครอง 
                                เพื่อร่วมกันสนับสนุนการพัฒนาคุณธรรมและการศึกษาแก่เยาวชน
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                ยุทธศาสตร์ที่ 5
                            </h3>
                            <p className="font-medium text-gray-800 mb-2">
                                พัฒนาศักยภาพครูอาสาและบุคลากร
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ส่งเสริมการอบรมและพัฒนาความรู้ของครูอาสาและบุคลากร 
                                ทั้งด้านธรรมศึกษา จิตวิทยาเด็ก และทักษะการจัดกิจกรรมเชิงสร้างสรรค์
                            </p>
                        </div>
                    </div>
                </section>

            </section>
        </main>
    );
}
