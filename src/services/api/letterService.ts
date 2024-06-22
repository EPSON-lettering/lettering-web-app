import { jsonClient } from "@/services/api/client";

interface LetterService {
	sendLetter: (scanId: string) => Promise<void>;
	sendManual: (file: File) => Promise<void>;
}

const URL = '/letter';

const letterService: LetterService = {
	sendManual: file => {
		const formData = new FormData();
		formData.append('file', file);
		return jsonClient.post(`${URL}/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	},
	sendLetter: scanId => jsonClient.post(`${URL}/lettering`, { scanData_id: scanId }),
};

export default letterService;
