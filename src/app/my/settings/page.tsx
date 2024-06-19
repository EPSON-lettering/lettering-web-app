import MyPage from "@/pages/MyPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "LetterU",
	description: "My Page",
};

export default function MyInformationPage() {
	return <MyPage />;
}
