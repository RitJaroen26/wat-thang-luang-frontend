// "use client";

// import { useEffect } from "react";

// export default function MapWithMarker() {
//     useEffect(() => {
//         const mapDiv = document.getElementById("map");

//         // ถ้า element ไม่เจอ → ไม่ต้องทำอะไร
//         if (!mapDiv) return;

//         // ถ้า google ยังโหลดไม่เสร็จ → รอให้โหลดก่อน
//         if (!(window as any).google) return;

//         const map = new window.google.maps.Map(mapDiv as HTMLElement, {
//             center: { lat: 13.8340557, lng: 100.5225502 },
//             zoom: 16,
//             mapId: "buddhist_center_map_style",
//         });

//         new window.google.maps.Marker({
//             position: { lat: 13.8340557, lng: 100.5225502 },
//             map,
//             title: "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง",
//             icon: {
//                 url: "/icons/pin-gold.png",
//                 scaledSize: new window.google.maps.Size(42, 42),
//             },
//         });
//     }, []);

//     return (
//         <div
//             id="map"
//             className="w-full h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl"
//         />
//     );

"use client";

import { useEffect } from "react";

export default function MapWithMarker() {
    useEffect(() => {
        async function initMap() {
            const mapDiv = document.getElementById("map");
            if (!mapDiv) return;

            // 🚨 รอให้ Google Maps โหลดจาก script tag
            if (!(window as any).google?.maps?.importLibrary) return;

            const google = (window as any).google;

            // โหลด library ทั้งสองแบบ official
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement, PinElement } =
                await google.maps.importLibrary("marker");

            const markerPosition = {
                lat: 13.834439390311514,
                lng: 100.52247633900816,
            };

            const map = new Map(mapDiv, {
                center: markerPosition,
                zoom: 18,
                mapId: "buddhist_center_map_style",
                gestureHandling: "greedy",
            });

            // ⭐ หมุด Google Pin แบบใหม่
            const pin = new PinElement({
                background: "#B89B5F",
                borderColor: "#fff",
                glyphColor: "#fff",
            });

            new AdvancedMarkerElement({
                map,
                position: markerPosition,
                title: "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง",
                content: pin.element,
            });

            map.panTo(markerPosition);
        }

        // รอ script โหลดก่อน
        const interval = setInterval(() => {
            if ((window as any).google?.maps?.importLibrary) {
                clearInterval(interval);
                initMap();
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="map"
            className="w-full h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl"
        />
    );
}

// "use client";

// import { useEffect } from "react";

// export default function MapWithMarker() {
//     useEffect(() => {
//         const loadMap = () => {
//             const mapDiv = document.getElementById("map");
//             if (!mapDiv) return;

//             const google = (window as any).google;
//             if (!google?.maps) return;

//             const position = { lat: 13.834439390311514, lng: 100.52247633900816 };

//             // 13.834439390311514, 100.52247633900816

//             // สร้างแผนที่
//             const map = new google.maps.Map(mapDiv, {
//                 center: position,
//                 zoom: 17,
//                 mapId: "buddhist_center_map_style",
//             });


//             const pin = new google.maps.marker.PinElement({
//                 background: "#B89B5F",       // สีหมุด (เลือกสีทองศูนย์)
//                 borderColor: "#ffffff",
//                 glyphColor: "#ffffff",
//             });

//             new google.maps.marker.AdvancedMarkerElement({
//                 map,
//                 position,
//                 title: "ศูนย์ศึกษาพระพุทธศาสนาวันอาทิตย์ วัดทางหลวง",
//                 content: pin.element, // ใช้หมุด Google
//             });
//         };

//         // รอให้ Google API โหลดครบก่อนค่อยเริ่ม
//         const interval = setInterval(() => {
//             if ((window as any).google?.maps?.marker) {
//                 clearInterval(interval);
//                 loadMap();
//             }
//         }, 100);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div
//             id="map"
//             className="w-full h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl"
//         />
//     );
// }
