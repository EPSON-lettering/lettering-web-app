import React from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";

const ChatInputBox = () => {
	return (
			<nav className="flex items-center gap-x-2">
				<NoneProfile replaceIcon={<SP />} className="w-[42px] h-[42px]" />
				<div className="ChatInputBox">
					<input
						placeholder="터치하여 입력하기"
						className="outline-none flex-1"
					/>
				</div>
			</nav>
	);
};

export default ChatInputBox;
