import { create } from "zustand";

const useTitleStore = create((set) => ({
    title: "Dashboard",
    setTitle: (title) => set({ title }),
}));

export default useTitleStore