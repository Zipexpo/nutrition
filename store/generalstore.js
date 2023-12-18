import { create } from 'zustand';
import {analyticsHandle} from "./analytics";

const useGeneralStore = create((set) => ({
    input: {},
    setInput: (val={}) => set(() => ({ input: {...val} })),
    resetInput: () => set(() => ({ input: {} })),
    analytics: {},
    updateAnalytics: () => set((state) => ({analytics:analyticsHandle(state.input)})),
}));

export default useGeneralStore;