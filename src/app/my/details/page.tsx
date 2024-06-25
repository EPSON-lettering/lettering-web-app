import EditUserDetails from "@/pages/EditUserDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "LetterU",
	description: "Edit",
};

export default function EditMyPage() {
	return (
			<div className="Scroller">
				<EditUserDetails />
			</div>
	);
}
