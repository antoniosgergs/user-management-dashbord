import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            accessToken: null,
            expiresIn: null,
            setAuth: ({ accessToken, expiresIn }) =>
                set({ accessToken, expiresIn }),
            clearAuth: () => set({ accessToken: null, expiresIn: null }),
        }),
        {
            name: 'auth-storage', // name in localStorage
        }
    )
);

export default useAuthStore;
