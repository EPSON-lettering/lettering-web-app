export default function getFilenameByUrl(url: string) {
	const tokens = url.split('/');
	return tokens[tokens.length - 1];
}
