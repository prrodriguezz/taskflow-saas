'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthResponse, LoginPayload } from '../services/authService';
import { mockLogin, tokenStorage } from '../services/authService';

type AuthState = {
    user: AuthResponse['user'] | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    signIn: (payload: LoginPayload) => Promise<void>;
    signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthState['user']>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Carrega token do localStorage ao abrir
    useEffect(() => {
        const t = tokenStorage.get();
        if (t) setToken(t);
    }, []);

    async function signIn(payload: LoginPayload) {
        setIsLoading(true);
        setError(null);

        try {
            const data = await mockLogin(payload);
            tokenStorage.set(data.token);
            setToken(data.token);
            setUser(data.user);
        } catch (e: any) {
            setError(e?.message || 'Login error');
            setUser(null);
            setToken(null);
            tokenStorage.clear();
        } finally {
            setIsLoading(false);
        }
    }

    function signOut() {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
        setError(null);
    }

    const value = useMemo(
        () => ({ user, token, isLoading, error, signIn, signOut }),
        [user, token, isLoading, error]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
