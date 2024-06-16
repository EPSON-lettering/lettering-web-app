import { useEffect } from "react";
import { User } from "@/types/object";
import Server from "@public/services/api";
import { create } from "zustand";

interface AuthenticationStore {
	user?: User;
	setUser: (user: User) => void;
	logout: () => void;
}

const useStore = create<AuthenticationStore>(set => ({
	setUser: user => set({ user }),
	logout: () => {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		set({ user: undefined });
	},
}));

const useUser = () => {
	const store = useStore();
	const { setUser } = store;

	const login = (user: User) => {
		setUser(user);
	};

	useEffect(() => {
		const access  = localStorage.getItem('access');
		if (!access) return;
		(async () => {
			try {
				const user = await Server.Account.getUserDetails();
				setUser(user);
			} catch (error) {
				console.error(error);
				alert("로그인이 되어있지 않습니다.")
			}
		})();
	}, []);

	return {
		...store,
		login,
	};
};

export default useUser;
