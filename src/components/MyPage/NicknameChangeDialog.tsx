import React, { useState } from 'react';
import Dialog from "@/components/common/Dialog";
import { CustomDialogProps } from "@/types/ui";
import NickInput from "@/components/common/NickInput";
import useUser from "@/hooks/useUser";
import Server from "@/services/api";
import { User } from "@/types/object";

const NicknameChangeDialog: React.FC<CustomDialogProps> = ({ show, close }) => {
	const { user, setUser } = useUser();
	const [nickname, setNickname] = useState<string>(() => user?.nickname ?? '');

	const onSubmit = async () => {
		try {
			const validation = await Server.Account.validateNickname(nickname);
			if (validation.error) throw Error(validation.error);
		} catch (error) {
			alert(error);
		}

		try {
			await Server.Account.changeNickname(nickname);
			setUser({ ...user as User, nickname });
			alert("닉네임이 변경되었습니다.");
			close();
		} catch (error) {
			console.error(error);
		}
	};

	return (
			<Dialog
				show={show}
				close={close}
				onClickOk={onSubmit}
				title="닉네임 변경하기"
				okText="변경할게요"
				hideCancel
			>
				<section>
					<NickInput value={nickname} setValue={setNickname} />
				</section>
			</Dialog>
	);
};

export default NicknameChangeDialog;
