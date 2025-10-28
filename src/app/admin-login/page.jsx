"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (id === "empaerial" && password === "nottellingyoumypw00") {
            sessionStorage.setItem("isAdmin", "true"); // ✅ Save login
            router.push("/admin");
        } else {
            alert("Wrong ID or password.");
        }

    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "#0d0d0d",
                color: "#fff",
                fontFamily: "Fira Code, monospace",
            }}
        >
            <h1 style={{ color: "#00ff99" }}>Admin Login()</h1>
            <form
                onSubmit={handleLogin}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    width: "250px",
                }}
            >
                <input
                    type="text"
                    placeholder="Admin ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #333",
                        background: "#111",
                        color: "#fff",
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #333",
                        background: "#111",
                        color: "#fff",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#00ff99",
                        color: "#000",
                        border: "none",
                        padding: "8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
