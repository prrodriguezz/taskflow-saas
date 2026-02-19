'use client';

import { LoginForm } from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2x1 border border-neutral-800 bg-neutral-900/40 p-6">
                <h1 className="text-xl font-semibold">Welcome back!</h1>
                <p className="mt-1 text-sm text-neutral-400">Sign in to continue.</p>

                <div>
                    <LoginForm 
                        onSubmit={(data) => {
                            console.log('login submit', data);
                        }}
                    />
                </div>
            </div>
        </main>
    )
}