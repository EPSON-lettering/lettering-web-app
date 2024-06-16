import React, { useState } from 'react';
import Dialog from "@/components/common/Dialog";
import { CustomDialogProps } from "@/types/ui";

const NicknameChangeDialog: React.FC<CustomDialogProps> = ({ show, close }) => {
	const [nickname, setNickname] = useState<string>('');

	const onSubmit = () => {

	};

	return (
			<Dialog
				show={show}
				close={close}
				onClickOk={onSubmit}
				title="닉네임 변경하기"
				hideCancel
			>

			</Dialog>
	);
};

export default NicknameChangeDialog;