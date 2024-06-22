import { jsonClient } from "@/services/api/client";

interface PrinterService {
	print: (imageSrc: string) => Promise<void>;
	register: (epsonEmail: string) => Promise<void>;
	changeStatusOnWriting: () => Promise<void>;
	registerScanner: () => Promise<void>;
}


const URL = '/printer';

const printerService: PrinterService = {
	print: async (imageSrc: string) => {
		const blob = await fetch(imageSrc).then(res => res.blob());
		const imageFile = new File([blob], 'file.png', { type: blob.type });
		const formData = new FormData();
		formData.append('file', imageFile);
		return jsonClient.post(`${URL}/prints`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	},
	register: (epsonEmail) => jsonClient.post(`${URL}/prints/auth`, { epsonEmail }),
	registerScanner: () => jsonClient.post(`${URL}/scan`),
	changeStatusOnWriting: () => jsonClient.patch(`${URL}/status`),
};

export default printerService;
