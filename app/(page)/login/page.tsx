"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/libs/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.get(`/sanctum/csrf-cookie`);

            await api.post(
                `/api/login`,
                { email, password },
            );

            router.push("/home");
        } catch (err: any) {
            console.error("LOGIN ERROR", err?.response ?? err);

            const status = err?.response?.status;

            if (status === 422) {
                setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            } else if (status === 403) {
                setError("บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ");
            } else if (status === 419) {
                setError("CSRF ไม่ถูกต้อง (419) — ลอง refresh หน้าแล้วลองใหม่");
            } else {
                setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h1>

                {error && (
                    <p className="text-red-500 text-center mb-3">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
                    >
                        {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
                    </button>

                    <p className="text-center mt-2">
                        ยังไม่มีบัญชี?{" "}
                        <a href="/register" className="text-blue-600 font-bold">
                            สมัครสมาชิก
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}