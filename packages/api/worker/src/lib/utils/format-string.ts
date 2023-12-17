export default function formatString(str: string) {
	return `${str.replaceAll(' ', '-')}`;
}
