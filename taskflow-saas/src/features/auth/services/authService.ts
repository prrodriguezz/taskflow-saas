export type LoginPayload = { email: string; password: string };
export type SignupPayload = { email: string; password: string; name?: string };

export type AuthResponse = {
    token: string;                                      //JWT
    user: { id: string; email: string; name?: string }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const TOKEN_KEY = 'taskflow_token';

export const tokenStorage = {
    get(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },
    set(token: string) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(TOKEN_KEY, token);
    },
    clear() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(TOKEN_KEY);
    },
};

// bellow I created a mock for test without backend side;
export async function mockLogin(payload: LoginPayload): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 600));

    if(payload.email === 'paulo@taskflow.com' && payload.password === '123456') {
        return {
            token: 'IJOIWEJFIOWJEFIWJEFOIQJ102391312J31I2J41',
            user: { id: '1', email: payload.email, name: 'Paulo'},
        };
    }

    throw new Error('Invalid credentials');
}

// Now its official when the API get ready to use;
// Login
export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        const msg = await safeErrorMessage(res);
        throw new Error(msg || 'Login failed');
    }

    return res.json();
}

// Signup
export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await safeErrorMessage(res);
    throw new Error(msg || 'Signup failed');
  }

  return res.json();
}


// Error Message
async function safeErrorMessage(res: Response): Promise<String | null> {
    try {
        const data = await res.json();
        return data?.message || null;
    } catch {
        return null;
    }
}