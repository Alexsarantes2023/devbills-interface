import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthState } from "../types/auth";
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";

interface AuthContextProps {
    authState: AuthState,
    signWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            (user) => {
                if (user) {
                    console.log(user);
                setAuthState({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    error: null,
                    loading: false,
                });
            } else {
                setAuthState({ user: null, error: null, loading: false });
            }
        }, (error) => {
            console.error("Erro na autencicação");
            setAuthState({ user: null, error: error.message, loading: false });
        },
            );
        return () => unsubscribe();
    }, []);

    const signWithGoogle = async (): Promise<void> => {
        setAuthState((prev) => ({...prev, loading: true}));
        // Implementar lógica de autenticação com Google
        // Atualizar authState conforme necessário
        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro desconhecido ao autenticar com Google";
            setAuthState((prev) => ({...prev, loading: false, error: message}));
        }
    };

    const signOut = async (): Promise<void> => { 

        try {
            await firebaseSignOut(firebaseAuth)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro desconhecido ao deslogar";
            setAuthState((prev) => ({...prev, loading: false, error: message}));
        }

    };


    return (
        <AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
};