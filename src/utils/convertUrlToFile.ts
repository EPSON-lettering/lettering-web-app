export default async function convertUrlToFile(url: string) {
	const blob = await fetch(url).then(data => data.blob());
	return new File([blob], 'image.png', { type: blob.type });
}
