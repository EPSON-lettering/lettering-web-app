import React, { useState } from 'react';
import Server from "@/services/api";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";


const usePrintConnection = () => {
	const { user, refresh } = useUser();
	const [usingEpson, setUsingEpson] = useState<boolean>(() => {
		if (!user) return false;
		return !!user?.epsonEmail;
	});
	const router = useRouter();

	const connect = (email: string, callback: () => Promise<void>) => {
		const conn = async () => {
			try {
				await Server.Print.register(email);
				await Server.Print.registerScanner();
				setUsingEpson(true);
				await callback();
				await refresh();
				router.push('/');
			} catch (error) {
				console.error(error);
			}
		};
		setTimeout(conn, 1500);
	};

	const disconnect = () => {
		setUsingEpson(false);
	};

	return { connect, disconnect, usingEpson };
};

export default usePrintConnection;
