import React from 'react';

const MyFeedLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
			<div className="Scroller">
				{children}
			</div>
	);
};

export default MyFeedLayout;
