import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("goldinsight_user");
    return stored ? JSON.parse(stored) : null;
  });

  const signIn = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u = { name: email.split("@")[0], email };
    localStorage.setItem("goldinsight_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u = { name, email };
    localStorage.setItem("goldinsight_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("goldinsight_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
