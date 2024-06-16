import { useEffect } from "react";
import { User } from "@/types/object";
import Server from "@public/services/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useRouter } from "next/navigation";

interface AuthenticationStore {
	user?: User;
	setUser: (user: User) => void;
	logout: () => void;
}

const useStore = create(
		persist<AuthenticationStore>(set => ({
			setUser: user => set({ user }),
			logout: () => {
				localStorage.removeItem('access');
				localStorage.removeItem('refresh');
				set({ user: undefined });
		}}), {
			name: 'user-store',
			storage: createJSONStorage(() => localStorage),
		})
)

const useUser = () => {
	const store = useStore();
	const { setUser, user, logout } = store;
	const router = useRouter();

	const login = (user: User) => {
		setUser(user);
	};

	const logoutWrapper = async () => {
		logout();
	};

	useEffect(() => {
		const access  = localStorage.getItem('access');
		if (!access) return;
		(async () => {
			try {
				if (user) return;
				const userData = await Server.Account.getUserDetails();
				setUser(userData);
			} catch (error) {
				logoutWrapper();
				console.error(error);
				router.push('/');
			}
		})();
	}, []);

	return {
		...store,
		login,
		logout: logoutWrapper,
	};
};

export default useUser;
