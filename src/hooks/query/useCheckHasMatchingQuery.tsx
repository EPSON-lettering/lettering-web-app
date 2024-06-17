import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";

const UseCheckHasMatchingQuery = () => {
	const { data, isLoading, ...query } = useQuery({
		queryKey: ['checkMatch'],
		queryFn: Server.Account.checkUserHasMatching,
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: true,
	});

	return {
		...query,
		isMatch: data?.isMatch ?? false,
		loadingHasMatching: isLoading,
	};
};

export default UseCheckHasMatchingQuery;
