import React from 'react';
import Typo from "@/components/common/Typo";

const NotiAlert: React.FC<{ count: number }> = ({ count }) => {
	const n = count > 99 ? "99+" : count;

	if (count === 0) return null;
	return (
		<div className="absolute right-0 top-0 w-[23px] h-[23px] bg-rose-500 rounded-[999px]">
			<Typo color="white" size="13">{n}</Typo>
		</div>
	);
};

export default NotiAlert;
