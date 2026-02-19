'use client';

import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { signIn, isLoading, error } = useAuth();
    const router = useRouter();

    return (
        <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2x1 border border-neutral-800 bg-neutral-900/40 p-6">
                <h1 className="text-xl font-semibold">Welcome back!</h1>
                <p className="mt-1 text-sm text-neutral-400">Sign in to continue.</p>

                <div className="mt-6">
                    <LoginForm
                        isLoading={isLoading}
                        errorMessage={error}
                        onSubmit={async (data) => {
                            await signIn(data);
                            router.push('/dashboard'); // Depois do login
                        }}
                    />
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                    Exemple: <b>paulo@taskflow.com</b> / <b>123456</b>
                </p>
            </div>
        </main>
    )
}