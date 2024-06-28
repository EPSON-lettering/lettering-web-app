import { LetterWritingStatus } from "@/types/object";

const statusService = {
	getWritingStatusMessage: (status: LetterWritingStatus) => {
		if (status === 1) {
			return '편지를 작성 중 입니다!';
		}

		if (status === 2) {
			return '편지를 수령하였습니다!';
		}
		return '...';
	},
};

export default statusService;
