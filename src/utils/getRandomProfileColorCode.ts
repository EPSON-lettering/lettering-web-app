const list = [
		'#FFEB81',
		'#A3E798',
		'#9FAFE3',
	'#FF5733',  // 강렬한 주황색
	'#900C3F',  // 어두운 자주색
	'#DAF7A6',  // 밝은 연두색
	'#FFC300',  // 밝은 노란색
	'#1ABC9C',  // 청록색
	'#1ABC9C',  // 청록색
	'#3498DB',  // 밝은 파란색
];

export default function getRandomProfileColorCode() {
	const rand = Math.floor(Math.random() * list.length);

	return list[rand];
}
