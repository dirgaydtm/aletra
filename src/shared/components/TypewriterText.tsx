import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BlinkCursorProps {
	isDone?: boolean;
}

export function BlinkCursor({ isDone = false }: BlinkCursorProps) {
	return (
		<motion.span
			animate={{
				opacity: isDone ? [1, 1, 0, 0] : [1, 0, 1],
			}}
			transition={{
				duration: isDone ? 3 : 0.8,
				repeat: Number.POSITIVE_INFINITY,
				times: isDone ? [0, 0.45, 0.5, 1] : undefined,
			}}
			className="inline-block ml-0.5 select-none"
		>
			▋
		</motion.span>
	);
}

interface TypewriterTextProps {
	text: string;
	speed?: number;
	className?: string;
}

export function TypewriterText({
	text,
	speed = 30,
	className,
}: TypewriterTextProps) {
	const [displayedText, setDisplayedText] = useState("");
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		setDisplayedText("");
		setIsDone(false);

		let i = 0;

		const interval = setInterval(() => {
			i++;
			setDisplayedText(text.slice(0, i));

			if (i >= text.length) {
				setIsDone(true);
				clearInterval(interval);
			}
		}, speed);

		return () => clearInterval(interval);
	}, [text, speed]);

	return (
		<span className={className}>
			{displayedText}
			<BlinkCursor isDone={isDone} />
		</span>
	);
}
