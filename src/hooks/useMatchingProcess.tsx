import { create } from "zustand";
import { MatchResponse } from "@public/services/api/MatchingService";


interface MatchProcessStoreProps {
	matchDetails?: MatchResponse;
	setMatchDetails: (match: MatchResponse) => void;
}

const useMatchingProcess = create<MatchProcessStoreProps>(set => ({
	setMatchDetails: match => set({ matchDetails: match }),
}));

export default useMatchingProcess;
