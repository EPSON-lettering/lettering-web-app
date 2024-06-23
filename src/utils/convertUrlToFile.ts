export default async function convertUrlToFile(url: string) {
	const blob = await fetch(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}).then(data => data.blob());
	return new File([blob], 'image.png', { type: blob.type });
}
