import React, { HTMLAttributes } from 'react';
import LeftTail from "@public/icon/message-left-tail.svg";

interface ChatBoxProps extends HTMLAttributes<HTMLDivElement> {
	left?: boolean;
	right?: boolean;
	children: React.ReactNode;
}

const ChatBox: React.FC<ChatBoxProps> = ({ left = false, right = false, children, ...props }) => {
	return (
			<div className="ml-[10px] relative p-3 w-fit rounded-lg bg-letter-yellow" {...props}>
				{left &&
						<div className="absolute left-[-10px] top-[4px]">
								<LeftTail />
						</div>
				}
				{children}
			</div>
	);
};

export default ChatBox;
