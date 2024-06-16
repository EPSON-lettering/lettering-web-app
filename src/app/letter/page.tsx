import { Metadata } from "next";
import LetterBox from "@/pages/LetterBox";

export const metadata: Metadata = {
	title: "LetterU",
	description: "Letter Box",
};


export default function LetterBoxPage() {
	return <LetterBox />;
}

