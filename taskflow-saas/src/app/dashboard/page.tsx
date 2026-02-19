'use client';

import { useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { token, user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) router.replace('/login');
    }, [token, router]);

    if (!token) return null;

    return (
        <main className="min-h-screen bg-neutral-950 text-white p-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-neutral-300">Logged in as: {user?.email}</p>

            <button
                onClick={() => {
                    signOut();
                    router.push('/login');
                }}
                className="mt-6 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black"
            >
                Logout
            </button>
        </main>
    );
}