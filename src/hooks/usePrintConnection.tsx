import React, { useState } from 'react';
import Server from "@/services/api";
import { useRouter } from "next/navigation";

const storeKey = 'USING_EPSON';

const usePrintConnection = () => {
	const [usingEpson, setUsingEpson] = useState<boolean>(() => {
		return localStorage.getItem(storeKey) !== null;
	});
	const router = useRouter();

	const connect = (email: string) => {
		const conn = async () => {
			try {
				await Server.Print.register(email);
				await Server.Print.registerScanner();
				setUsingEpson(true);
				localStorage.setItem(storeKey, "TRUE");
				router.push('/');
			} catch (error) {
				console.error(error);
			}
		};
		setTimeout(conn, 1500);
	};

	const disconnect = () => {
		localStorage.removeItem(storeKey);
		setUsingEpson(false);
	};

	return { connect, disconnect, usingEpson };
};

export default usePrintConnection;
