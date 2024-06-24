import React, { useState } from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";
import Server from "@/services/api";
import SendingIcon from "@public/icon/message-send.svg";
import ScanSendingIcon from "@public/icon/message-scan.svg";

interface ChatInputBoxProps {
	mode: 'feedback' | 'chat' | 'reply';
	id: string;
	reloadFn: () => void;
}

type SendType = 'scan' | 'text';


const ChatInputBox: React.FC<ChatInputBoxProps> = ({ mode, id, reloadFn }) => {
	const [message, setMessage] = useState('');

	const send = async (type: SendType) => {


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

		if (type === 'scan') {
			try {
				const { imageUrl } = await Server.Print.getScanData();
				await Server.Comment.createFeedback(Number(id), {
					type: mode,
					image: imageUrl,
				});
				reloadFn();
			} catch (error) {
				console.error(error);
			} finally {
				setMessage('');
				return;
			}
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
		await send('text');
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
					<section className="flex items-center gap-x-1">
						<button onClick={() => send('scan')}>
							<ScanSendingIcon />
						</button>
						<button onClick={() =>send('text')}>
							<SendingIcon />
						</button>
					</section>

				</div>
			</nav>
	);
};

export default ChatInputBox;
