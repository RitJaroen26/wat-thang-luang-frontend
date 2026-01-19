// "use client";

// import { useState, useEffect, useRef } from "react";
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
// import axios from "axios";

// type Option = {
//     id: number;
//     label: string;
// };

// type BotResponse = {
//     text: string;
// };

// export default function ChatAsk({ locale = "th" }) {
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [options, setOptions] = useState<Option[]>([]);
//     const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//     const [sessionToken, setSessionToken] = useState<string | null>(null);

//     useEffect(() => {
//         if (scrollRef.current) {
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//         }
//     }, [messages]);

//     useEffect(() => {
//         localStorage.removeItem("chat_session_token");

//         const token = localStorage.getItem("chat_session_token");

//         if (!token) {
//             createNewSession();
//         } else {
//             setSessionToken(token);
//             loadHistory(token);
//         }
//     }, []);

//     useEffect(() => {
//         if (isOpen) loadOptions();
//     }, [isOpen]);



//     const createNewSession = async () => {
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/create`, {
//             lang: "th"
//         });

//         localStorage.setItem("chat_session_token", res.data.session_token);
//         setSessionToken(res.data.session_token);
//     };

//     const loadHistory = async (token: string) => {
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/history`, {
//             session_token: token
//         });

//         const list = res?.data?.messages;

//         setMessages(Array.isArray(list) ? list : []);

//         // setMessages(res.data.messages);
//     };

//     const loadOptions = async () => {
//         const lang = "th";

//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/rules`, {
//                 params: { lang: locale }
//             })

//             setOptions(
//                 res.data.map((item: any) => ({
//                     id: item.id,
//                     label: item.question
//                 }))
//             );
//         } catch (error) {
//             console.error("Error loading options", error);
//         }
//     };

//     const handleOptionClick = async (id: number, label: string) => {
//         setMessages((prev) => [...prev, { sender: "user", text: label }]);

//         const lang = "th";

//         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/answer`, {
//             session_token: sessionToken,
//             rule_id: id,
//             lang
//         });

//         setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
//     };

//     return (
//         <>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="
//                     fixed bottom-5 right-5 z-50
//                     w-12 h-12 rounded-full bg-yellow-400 text-black
//                     shadow-xl flex items-center justify-center
//                     hover:bg-yellow-300 transition-all duration-200 cursor-pointer
//                 "
//             >
//                 <IoChatbubbleEllipsesOutline className="w-6 h-6" />
//             </button>

//             {/* Chat Box */}
//             <div
//                 className={`
//                     fixed bottom-20 right-5 z-50
//                     w-[320px] bg-white rounded-xl shadow-2xl
//                     border border-gray-200 flex flex-col
//                     transition-all duration-300 origin-bottom-right
//                     ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
//                 `}
//             >
//                 {/* Header */}
//                 <div className="bg-[#212346] text-white px-4 py-3 rounded-t-xl">
//                     <p className="text-sm font-semibold">ถาม–ตอบ ศูนย์การศึกษาพระพุทธศาสนา</p>
//                     <p className="text-[11px] opacity-70">ระบบตอบกลับอัตโนมัติ</p>
//                 </div>

//                 {/* Messages */}
//                 <div className="px-3 py-3 h-[220px] overflow-y-auto space-y-2 bg-gray-50">
//                     {Array.isArray(messages) && messages.map((msg, i) => (
//                         <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
//                             <span
//                                 className={`
//                                     inline-block px-3 py-2 rounded-2xl text-sm 
//                                     ${msg.sender === "user"
//                                         ? "bg-yellow-300 text-black rounded-br-sm"
//                                         : "bg-white border border-gray-200 rounded-bl-sm"
//                                     }
//                                 `}
//                             >
//                                 {msg.text}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Options */}
//                 <div className="border-t px-3 py-3 bg-white space-y-2 max-h-[150px] overflow-y-auto">
//                     {options.map((opt) => (
//                         <button
//                             key={opt.id}
//                             onClick={() => handleOptionClick(opt.id, opt.label)}
//                             className="
//                                 w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 
//                                 rounded-lg text-sm transition
//                             "
//                         >
//                             {opt.label}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import axios from "axios";

type Option = { id: number; label: string };

export default function ChatAsk({ locale = "th" }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isTyping]);

    // Initialize Session
    useEffect(() => {
        localStorage.removeItem("chat_session_token");
        setMessages([]);

        const token = localStorage.getItem("chat_session_token");
        if (!token) {
            createNewSession();
        } else {
            setSessionToken(token);
            loadHistory(token);
        }
    }, []);

    useEffect(() => {
        if (isOpen) loadOptions();
    }, [isOpen]);

    const createNewSession = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/create`, { lang: "th" });
            localStorage.setItem("chat_session_token", res.data.session_token);
            setSessionToken(res.data.session_token);
        } catch (error) {
            console.error("Failed to create session", error);
        }
    };

    const loadHistory = async (token: string) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/history`, { session_token: token });
            setMessages(Array.isArray(res?.data?.messages) ? res.data.messages : []);
        } catch (error) {
            console.error("Failed to load history", error);
        }
    };

    const loadOptions = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/rules`, { params: { lang: locale } });
            setOptions(res.data.map((item: any) => ({ id: item.id, label: item.question })));
        } catch (error) {
            console.error("Error loading options", error);
        }
    };

    const handleOptionClick = async (id: number, label: string) => {
        setMessages((prev) => [...prev, { sender: "user", text: label }]);
        setIsTyping(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/answer`, {
                session_token: sessionToken,
                rule_id: id,
                lang: "th"
            });

            // หน่วงเวลาเล็กน้อยเพื่อให้ดูเหมือนบอทกำลังคิด
            setTimeout(() => {
                setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
                setIsTyping(false);
            }, 800);
        } catch (error) {
            setIsTyping(false);
            console.error("Error getting answer", error);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[9999] font-sans">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? "w-12 h-12 bg-yellow-500 text-white" : "w-16 h-16 bg-[#212346] text-white"
                    }`}
            >
                {isOpen ? <IoClose size={28} /> : <IoChatbubbleEllipsesOutline size={32} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            {/* Chat Box Container */}
            <div
                className={`absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right transform ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-[#212346] text-white px-5 py-4 rounded-t-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                        <RiRobot2Line size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold leading-tight">ถาม–ตอบ ศพอ.วัดทางหลวง</h3>
                        <p className="text-[10px] text-blue-100 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> ระบบตอบกลับอัตโนมัติ
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                >
                    {/* Welcome message if empty */}
                    {messages.length === 0 && (
                        <div className="text-center py-5">
                            <RiRobot2Line className="mx-auto text-slate-300 mb-2" size={40} />
                            <p className="text-slate-400 text-xs">สวัสดีครับ มีอะไรให้ผมช่วยดูแลในวันนี้ไหมครับ?</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${msg.sender === "user"
                                    ? "bg-[#212346] text-white rounded-br-none"
                                    : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
                                }`}>
                                {/* {msg.text} */}
                                <div className="whitespace-pre-line break-words overflow-hidden">
                                    {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
                                        if (part.match(/https?:\/\/[^\s]+/)) {
                                            return (
                                                <a
                                                    key={index}
                                                    href={part}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline font-medium break-all hover:text-blue-800 transition-colors"
                                                >
                                                    {part}
                                                </a>
                                            );
                                        }
                                        return part;
                                    })}
                                </div>

                                {/* เวลา (ถ้ามีข้อมูล timestamp สามารถใส่เพิ่มได้) */}
                                <p className={`text-[9px] mt-1.5 opacity-50 font-medium ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                    {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Options / Action Area */}
                <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">กรุณาเลือกหัวข้อที่ต้องการสอบถาม</p>
                    <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto pr-1">
                        {options.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleOptionClick(opt.id, opt.label)}
                                className="text-left px-4 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent rounded-full text-xs font-medium transition-all duration-200 active:bg-blue-100"
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Footer */}
                <div className="py-2 text-center border-t border-slate-50 bg-slate-50 rounded-b-2xl">
                    <p className="text-[9px] text-slate-400">© ศูนย์การศึกษาพระพุทธศาสนา วัดทางหลวง</p>
                </div>
            </div>
        </div>
    );
}