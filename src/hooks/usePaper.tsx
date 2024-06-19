import { create } from "zustand";

interface PaperStore {
	imageSrc?: string;
	setImageSrc: (src?: string) => void;
}

const usePaper = create<PaperStore>(set => ({
	setImageSrc: src => set({ imageSrc: src }),
}));

export default usePaper;
