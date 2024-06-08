import { Metadata } from "next";
import OnBoarding from "@/components/OnBoarding";

export const metadata: Metadata = {
	title: "Lettering | Home",
	description: "main page",
};


export default async function MainPage() {
	return (
		<div className="relative">
			<OnBoarding />
		</div>
	);
}
