import { jsonClient } from "@/services/api/client";

interface PrinterService {
	print: (imageSrc: string) => Promise<void>;
	register: (epsonEmail: string) => Promise<void>;
	changeStatusOnWriting: () => Promise<void>;
	registerScanner: () => Promise<void>;
	scan: () => Promise<void>;
	getScanData: () => Promise<ScanData>;
	uploadLetter: (file: File) => Promise<void>;
}

interface ScanData {
	id: string;
	imageUrl: string;
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
	uploadLetter: (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return jsonClient.post(`${URL}/scan/fileSave`, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
	},
	register: (epsonEmail) => jsonClient.post(`${URL}/prints/auth`, { epsonEmail }),
	registerScanner: () => jsonClient.post(`${URL}/scan`),
	changeStatusOnWriting: () => jsonClient.patch(`${URL}/status`),
	scan: () => jsonClient.post(`${URL}/scan/fileSave/`),
	getScanData: () => jsonClient.get(`${URL}/scan/data`),
};

export default printerService;
