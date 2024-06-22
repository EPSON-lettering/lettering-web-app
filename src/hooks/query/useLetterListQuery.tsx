import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/object";
import Server from "@/services/api";

const useLetterListQuery = (user?: User) => {
	const { data = [], isLoading, ...props } = useQuery({
		queryKey: ['user-letters-getter'],
		queryFn: () => Server.Letter.getLetterByUser(user?.id ?? 0),
		enabled: !!user,
		refetchInterval: false,
	});

	return {
		...props,
		letters: data,
		loadingLetters: isLoading,
	};
};

export default useLetterListQuery;
