export enum SessionItem {
	ON_BOARD = 'ON_BOARD',
	SPLASH = 'SPLASH',
}

const useSessionStore = () => {
	const getter = (key: SessionItem): string | null => sessionStorage.getItem(key);
	const setter = (key: SessionItem, value: string): void => {
		sessionStorage.setItem(key, value);
	};

	const boolean = (value: string | null) => value === "true";

	return { get: getter, set: setter, boolean }
};

export default useSessionStore;