import React from 'react';
import Typo from "@/components/common/Typo";

interface ComponentProps {
	element: React.ReactNode,
	desc: string
}

const OnBoardingAnnouncement: React.FC<ComponentProps> = ({ element, desc }) => {
	return (
			<section className="w-full h-full col-center">
				{element}
				<Typo className="bottom-[-15px] mt-[50px] text-center">{desc}</Typo>
			</section>
	);
};

export default OnBoardingAnnouncement;
