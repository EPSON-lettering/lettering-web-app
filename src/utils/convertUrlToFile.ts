import { nanoid } from "nanoid";

export default async function convertUrlToFile(url: string, filename: string) {
	const blob = await fetch(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}).then(data => data.blob());
	return new File([blob], filename, { type: blob.type });
}
