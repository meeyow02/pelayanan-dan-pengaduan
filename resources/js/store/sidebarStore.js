// store/sidebarStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the store with persist middleware
const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapsed: false,
      isDrawerOpen: false,
      setIsCollapsed: (value) => set({ isCollapsed: value }),
      setIsDrawerOpen: (value) => set({ isDrawerOpen: value }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }), // Only persist isCollapsed state
    }
  )
);

// Export the store as default
export default useSidebarStore;