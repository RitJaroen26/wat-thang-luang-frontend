// "use client";

// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import thLocale from "@fullcalendar/core/locales/th";

// export default function BuddhistCalendar() {
//     const [events, setEvents] = useState([
//         {
//             title: "กิจกรรมสวดมนต์ประจำสัปดาห์",
//             date: "2025-01-10",
//             color: "#b89b5f",
//         },
//         {
//             title: "ประชุมผู้ปกครอง ภาคเรียนที่ 2",
//             date: "2025-01-15",
//             color: "#8a7147",
//         },
//         {
//             title: "ฝึกสมาธิ - ชั้นประถม",
//             date: "2025-01-20",
//             color: "#d4b48c",
//         },
//     ]);

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <h2 className="text-3xl font-bold text-center text-[#3d3a36] mb-6">
//                 ปฏิทินกิจกรรมของศูนย์
//             </h2>

//             <div className="bg-white shadow-xl rounded-3xl p-6 border border-[#e6ddc8]">
//                 <FullCalendar
//                     locale={thLocale}
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     events={events}
//                     headerToolbar={{
//                         left: "prev,next today",
//                         center: "title",
//                         right: "dayGridMonth,timeGridWeek,timeGridDay",
//                     }}
//                     height="70vh"
//                     eventDisplay="block"
//                     eventTextColor="#fff"
//                     eventDidMount={(info) => {
//                         // เพิ่มความหรูหราให้ event
//                         info.el.style.borderRadius = "8px";
//                         info.el.style.padding = "6px";
//                         info.el.style.fontWeight = "500";
//                     }}
//                     dayHeaderClassNames="bg-[#f5efe1] text-[#3d3a36] font-medium"
//                     dayCellClassNames="hover:bg-[#faf6ec] transition"
//                     titleFormat={{ year: "numeric", month: "long" }}
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";

export default function BuddhistCalendar() {
    const [events, setEvents] = useState([
        {
            title: "กิจกรรมสวดมนต์ประจำสัปดาห์",
            date: "2025-01-10",
            color: "#b89b5f",
        },
        {
            title: "ประชุมผู้ปกครอง ภาคเรียนที่ 2",
            date: "2025-01-15",
            color: "#8a7147",
        },
        {
            title: "ฝึกสมาธิ - ชั้นประถม",
            date: "2025-01-20",
            color: "#d4b48c",
        },
    ]);

    // 🚨 ปรับปรุง Container หลักให้เล็กลง เพื่อจำลองการวางใน Layout 40%
    // หากนำไปใส่ใน NewsPage.js ให้ลบ max-w-6xl mx-auto p-6 ออก แล้วใช้ class w-full ใน div นอกสุดแทน
    return (
        <div className="w-full"> 
            
            {/* 🚨 ลบ H2 ออก เพราะ Headline ควรอยู่ด้านนอก (ใน NewsPage) */}
            {/* <h2 className="text-3xl font-bold text-center text-[#3d3a36] mb-6">
                ปฏิทินกิจกรรมของศูนย์
            </h2> */}

            <div className="bg-white shadow-xl rounded-3xl p-4 md:p-6 border border-[#e6ddc8]">
                <FullCalendar
                    locale={thLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth",
                    }}
                    
                    // 🚨 การแก้ไขที่สำคัญที่สุด: ลบ height คงที่ และใช้ aspectRatio
                    // height="70vh" 
                    aspectRatio={1.35} // กำหนดอัตราส่วน W:H (เช่น 1.35:1)
                    
                    eventDisplay="block"
                    eventTextColor="#fff"
                    eventDidMount={(info) => {
                        // ปรับ padding ให้เล็กลงเมื่อปฏิทินย่อขนาด
                        info.el.style.borderRadius = "6px"; 
                        info.el.style.padding = "4px";
                        info.el.style.fontWeight = "500";
                    }}
                    dayHeaderClassNames="bg-[#f5efe1] text-[#3d3a36] font-medium"
                    dayCellClassNames="hover:bg-[#faf6ec] transition"
                    titleFormat={{ year: "numeric", month: "long" }}
                />
            </div>
        </div>
    );
}