import React from 'react';
import useMatchingProcess from "@/hooks/useMatchingProcess";
import Button from "@/components/common/Button";

const FoundMatch = () => {
	const { matchDetails } = useMatchingProcess();

	return (
			<div className="flex-1">
				<section>

				</section>

				<section>
					<Button
							size="full"
					>
						편지 쓰러 가기
					</Button>
				</section>
			</div>
	);
};

export default FoundMatch;