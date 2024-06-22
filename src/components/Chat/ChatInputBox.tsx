import React, { useState } from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";
import Server from "@/services/api";

interface ChatInputBoxProps {
	mode: 'feedback' | 'chat';
	letterId: string;
	reloadFn: () => void;
}


const ChatInputBox: React.FC<ChatInputBoxProps> = ({ mode, letterId, reloadFn }) => {
	const [message, setMessage] = useState('');

	const send = async () => {
		try {
			await Server.Comment.createFeedback(Number(letterId), {
				message,
				type: mode,
			});
			reloadFn();
		} catch (error) {
			console.error(error);
		}
	};

	const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode !== 13) return;
		await send();
		setMessage('');
	};

	return (
			<nav className="flex items-center gap-x-2">
				<NoneProfile replaceIcon={<SP />} className="w-[42px] h-[42px]" />
				<div className="ChatInputBox">
					<input
						value={message}
						placeholder="터치하여 입력하기"
						onChange={e => setMessage(e.target.value)}
						onKeyDown={onEnter}
						className="outline-none flex-1"
					/>
				</div>
			</nav>
	);
};

export default ChatInputBox;
