import { LetterWritingStatus } from "@/types/object";

const statusService = {
	getWritingStatusMessage: (status: LetterWritingStatus) => {
		if (status === LetterWritingStatus.PROCESSING) {
			return '편지를 작성 중 입니다!';
		}

		if (status === LetterWritingStatus.COMPLETED) {
			return '편지 전송을 완료하였습니다.';
		}

		return '...';
	},
};

export default statusService;
