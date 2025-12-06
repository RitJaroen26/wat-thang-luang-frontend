"use client";

import { useState, useEffect } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import axios from "axios";

type Option = {
    id: number;
    label: string;
};

type BotResponse = {
    text: string;
};

export default function ChatAsk({ locale = "th" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    useEffect(() => {
        localStorage.removeItem("chat_session_token");

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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/create`, {
            lang: "th"
        });

        localStorage.setItem("chat_session_token", res.data.session_token);
        setSessionToken(res.data.session_token);
    };

    const loadHistory = async (token: string) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/session/history`, {
            session_token: token
        });

        const list = res?.data?.messages;

        setMessages(Array.isArray(list) ? list : []);

        // setMessages(res.data.messages);
    };

    const loadOptions = async () => {
        const lang = "th";

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/rules`, {
                params: { lang: locale }
            })

            setOptions(
                res.data.map((item: any) => ({
                    id: item.id,
                    label: item.question
                }))
            );
        } catch (error) {
            console.error("Error loading options", error);
        }
    };

    const handleOptionClick = async (id: number, label: string) => {
        setMessages((prev) => [...prev, { sender: "user", text: label }]);

        const lang = "th";

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/answer`, {
            session_token: sessionToken,
            rule_id: id,
            lang
        });

        setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    fixed bottom-5 right-5 z-50
                    w-12 h-12 rounded-full bg-yellow-400 text-black
                    shadow-xl flex items-center justify-center
                    hover:bg-yellow-300 transition-all duration-200
                "
            >
                <IoChatbubbleEllipsesOutline className="w-6 h-6" />
            </button>

            {/* Chat Box */}
            <div
                className={`
                    fixed bottom-20 right-5 z-50
                    w-[320px] bg-white rounded-xl shadow-2xl
                    border border-gray-200 flex flex-col
                    transition-all duration-300 origin-bottom-right
                    ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
                `}
            >
                {/* Header */}
                <div className="bg-[#212346] text-white px-4 py-3 rounded-t-xl">
                    <p className="text-sm font-semibold">ถาม–ตอบ ศูนย์ศึกษา</p>
                    <p className="text-[11px] opacity-70">ระบบตอบกลับอัตโนมัติ</p>
                </div>

                {/* Messages */}
                <div className="px-3 py-3 h-[220px] overflow-y-auto space-y-2 bg-gray-50">
                    {Array.isArray(messages) && messages.map((msg, i) => (
                        <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
                            <span
                                className={`
                                    inline-block px-3 py-2 rounded-2xl text-sm 
                                    ${msg.sender === "user"
                                        ? "bg-yellow-300 text-black rounded-br-sm"
                                        : "bg-white border border-gray-200 rounded-bl-sm"
                                    }
                                `}
                            >
                                {msg.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Options */}
                <div className="border-t px-3 py-3 bg-white space-y-2 max-h-[150px] overflow-y-auto">
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => handleOptionClick(opt.id, opt.label)}
                            className="
                                w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 
                                rounded-lg text-sm transition
                            "
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
