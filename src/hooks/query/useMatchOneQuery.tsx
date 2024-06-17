import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";

const useMatchOneQuery = () => {
	const { isLoading, data, ...query } = useQuery({
		queryKey: ['one-match-getter'],
		queryFn: Server.Matching.getMyMatchingDetails
	});

	return {
		...query,
		match: data,
		isLoadingOneMatching: isLoading,
	};
};

export default useMatchOneQuery;
