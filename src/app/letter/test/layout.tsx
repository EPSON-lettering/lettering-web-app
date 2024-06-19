import React from "react";

export default function TestLetterLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="absolute w-full h-full left-0 top-0">
			{ children }
		</section>
	);
}
