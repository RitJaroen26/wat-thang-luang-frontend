"use client";

import Image from "next/image";

export default function OrgStructurePage() {
    return (
        <main className="bg-gray-50 text-gray-800 min-h-screen">
            <section className="relative h-[380px] md:h-[180px] w-full">
                <Image
                    src="/images/LINE_ALBUM_21268_251203_11.jpg"
                    fill
                    alt="ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
                <section className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        โครงสร้างองค์กรศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
                        แสดงความสัมพันธ์ในการบริหารจัดการระหว่างเจ้าอาวาส ผู้อำนวยการศูนย์ 
                        คณะกรรมการบริหาร และกลุ่มบริหารงานต่าง ๆ ที่ร่วมกันขับเคลื่อนการดำเนินงานของศูนย์
                    </p>
                </section>

                <section className="space-y-10 flex items-center justify-center">
                    <Image
                        src="/images/organize_structure_image.jpg"
                        width={1000}
                        height={1000}
                        alt="organization"
                    />
                </section>
            </section>
        </main>
    );
}
