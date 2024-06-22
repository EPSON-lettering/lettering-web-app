import React from 'react';
import Typo from "@/components/common/Typo";

const NotiAlert: React.FC<{ count: number }> = ({ count }) => {
	return (
		<div className="absolute right-0 top-0 w-[10px] h-[10px] rounded-[999px]">
			<Typo color="white" bold size="13">{count}</Typo>
		</div>
	);
};

export default NotiAlert;
