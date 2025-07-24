import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("verbio-theme") || 'coffee',
    setTheme: (theme) => {
        localStorage.setItem("verbio-theme", theme);
        set({ theme });
    },
}))