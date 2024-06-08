import React from 'react';
import Typo from "@/components/common/Typo";

interface ComponentProps {
	element: React.Component,
	desc: string
}

const OnBoardingAnnouncement: React.FC<ComponentProps> = ({ element, desc }) => {
	return (
			<section className="w-full h-full col-center">
				{element}
				<Typo className="absolute bottom-[-15px]">{desc}</Typo>
			</section>
	);
};

export default OnBoardingAnnouncement;
