'use client';

import React, { useEffect } from 'react';

let vh = window.innerHeight & 0.01;

const VhMobile = () => {

	useEffect(() =>{
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		const callback = () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		window.addEventListener('resize', callback);
		return () => window.removeEventListener('resize', callback);
	}, []);

	return null;
};

export default VhMobile;