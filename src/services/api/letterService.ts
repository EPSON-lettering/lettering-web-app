import { jsonClient } from "@/services/api/client";
import { Letter } from "@/types/object";

interface LetterService {
	sendLetter: (scanId: string) => Promise<void>;
	sendManual: (file: File) => Promise<void>;
	getLetterByUser: (userId: number) => Promise<Letter[]>;
	getLetterDetails: (letterId: number) => Promise<Letter>;
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
	sendLetter: scanId => jsonClient.post(`${URL}/lettering/`, { scanData_id: scanId }),
	getLetterByUser: user => jsonClient.get(`${URL}/list/${user}`),
	getLetterDetails: id => jsonClient.get(`${URL}/details/${id}/`),
};

export default letterService;
