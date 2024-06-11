export enum SessionItem {
	ON_BOARD = 'ON_BOARD',
	SPLASH = 'SPLASH',
}

const useSessionStore = () => {
	const getter = (key: SessionItem) => sessionStorage.getItem(key);
	const setter = (key: SessionItem, value: string) => {
		sessionStorage.setItem(key, value);
	};

	return [getter, setter];
};

export default useSessionStore;
