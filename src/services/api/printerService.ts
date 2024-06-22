import { jsonClient } from "@/services/api/client";

interface PrinterService {
	print: (epsonEmail: string) => Promise<void>;
	register: (epsonEmail: string) => Promise<void>;
	changeStatusOnWriting: () => Promise<void>;
}


const URL = '/printer';

const printerService: PrinterService = {
	print: (epsonEmail) => jsonClient.post(`${URL}/prints`, { deviceEmail: epsonEmail }),
	register: (epsonEmail) => jsonClient.post(`${URL}/prints/auth`, { epsonEmail }),
	changeStatusOnWriting: () => jsonClient.patch(`${URL}/status`),
};

export default printerService;
