export default function slideInLeft(index = 0) {
	return {
		initial: { opacity: 0, x: -8 },
		animate: { opacity: 1, x: 0 },
		transition: {
			delay: index * 0.08,
			duration: 0.25,
			ease: "easeOut" as const,
		},
	};
}