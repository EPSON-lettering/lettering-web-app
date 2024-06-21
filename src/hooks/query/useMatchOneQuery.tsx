import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";

const useMatchOneQuery = () => {
	const { isLoading, data = null, ...query } = useQuery({
		queryKey: ['check-matching'],
		queryFn: Server.Matching.getMyMatchingDetails
	});

	return {
		...query,
		match: data,
		isLoadingOneMatching: isLoading,
	};
};

export default useMatchOneQuery;
