import React, { useState } from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";
import Server from "@/services/api";
import SendingIcon from "@public/icon/message-send.svg";

interface ChatInputBoxProps {
	mode: 'feedback' | 'chat' | 'reply';
	id: string;
	reloadFn: () => void;
}


const ChatInputBox: React.FC<ChatInputBoxProps> = ({ mode, id, reloadFn }) => {
	const [message, setMessage] = useState('');

	const send = async () => {
		if (mode === 'reply') {
			try {
				await Server.Comment.createReply(Number(id), {
					message,
				});
				reloadFn();
			} catch (error) {
				console.error(error);
			}
			setMessage('');
			return;
		}

		try {
			await Server.Comment.createFeedback(Number(id), {
				message,
				type: mode,
			});
			setMessage('');
			reloadFn();
		} catch (error) {
			console.error(error);
		}
	};

	const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode !== 13) return;
		await send();
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
					<button onClick={send}>
						<SendingIcon />
					</button>
				</div>
			</nav>
	);
};

export default ChatInputBox;
