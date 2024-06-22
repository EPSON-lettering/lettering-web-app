import { useEffect } from "react";
import { User, LetterWritingStatus } from "@/types/object";
import Server from "@/services/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useRouter } from "next/navigation";
import { BroadcastChannel } from "broadcast-channel";
import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";

interface AuthenticationStore {
	user?: User;
	setUser: (user: User) => void;
	logout: () => void;
}

const unAuthroizedAlertChannel = new BroadcastChannel('UNAUTH');

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
	const { match } = useMatchOneQuery();

	const login = (user: User) => {
		setUser(user);
	};

	const logoutWrapper = async () => {
		logout();
	};

	const getUserOnServer = async () => {
		try {
			const userData = await Server.Account.getUserDetails();
			setUser(userData);
		} catch (error) {
			logoutWrapper();
			console.error(error);
			router.push('/');
		}
	};

	const changeLetterWritingStatus = (status: LetterWritingStatus) => {
		if (!user) return;
		setUser({ ...user, status });
	}

	const afterSendLetter = async () => {
		console.log('afterSendLetter()');
		console.log({ match });
		if (!match) return;
		try {
			changeLetterWritingStatus(LetterWritingStatus.BEFORE);
			await Server.Matching.createQuestion(match.id);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const access  = localStorage.getItem('access');
		if (!access) return;
		if (user) return;
		getUserOnServer();

		unAuthroizedAlertChannel.addEventListener('message', (message: string) => {
			if (message === 'UNAUTH') {
				logout();
				router.push('/');
			}
		})
	}, []);

	return {
		...store,
		login,
		logout: logoutWrapper,
		refresh: getUserOnServer,
		changeLetterWritingStatus,
		afterSendLetter,
	};
};

export default useUser;
