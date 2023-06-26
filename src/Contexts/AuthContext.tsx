import React, { useState, createContext, ReactNode, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
    user: userProps;
    isAuthenticated: boolean;
    signIn: (credentials:  SignProps) => Promise<void>;
    signOut: () => Promise<void>;
    loading: boolean;
    loadingAuth: boolean
}

type userProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<userProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            // pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
            let hasUser: userProps = JSON.parse(userInfo || "{}");

            // Verificar se recebeu as informações dos dados salvos:
            if(Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false);
        }

        getUser();
    }, [])

    async function signIn({email, password}: SignProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const {id, name, token} = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token
            });
            setLoadingAuth(false);

        } catch(err) {
            console.log('Erro ao acessar ' + err);
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: '',
                })
            })
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, loading, loadingAuth, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}