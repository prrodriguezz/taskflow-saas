'use client';

import React, { useState } from "react";

type LoginFormProps = {
    onSubmit?: (data: { email: string, password: string }) => Promise<void> | void;
    isLoading?: boolean;
    errorMessage?: string | null;
};

export function LoginForm({ onSubmit, isLoading = false, errorMessage }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [touched, setTouched] = useState({ email: false, password: false });

    const emailError = touched.email && !email.trim()
        ? 'Email is required'
        : touched.email && !/^\S+@\S+\.\S+$/.test(email)
            ? 'Enter a valid email'
            : '';

    const passwordError =
        touched.password && !password.trim() ? 'Password is required' : '';

    const hasErrors = Boolean(emailError || passwordError);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setTouched({ email: true, password: true });

        if (hasErrors) return;

        await onSubmit?.({ email: email.trim(), password });
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="email@example.com"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-400"
                    disabled={isLoading}
                />
                {emailError ? <p className="text-xs text-red-400">{emailError}</p> : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-400"
                    disabled={isLoading}
                />
                {
                    passwordError ? (
                        <p className="text-xs text-red-400">Insert your password here.</p>
                    ) : null}
            </div>

            {errorMessage ? (
                <div className="rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                    {errorMessage}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={isLoading || hasErrors}
                className="w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed:opacity-60"
            >
                {isLoading ? 'Signing in..' : 'Sign in'}
            </button>

            <div className="text-center text-sm text-neutral-400">
                <a href="/signup" className="underline underline-ffset-4 hover:text-neutral-200"></a>
            </div>
        </form>
    );

}