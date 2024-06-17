import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";

const useQuestionOnMatchQuery = (matchId: number | undefined) => {
	const { isLoading, data, ...query } = useQuery({
		queryKey: ['one-question-getter'],
		queryFn: () => Server.Matching.getQuestion(matchId ?? 0),
		enabled: !!matchId,
	});

	return {
		...query,
		question: data,
		questionLoading: isLoading,
	};
};

export default useQuestionOnMatchQuery;
