import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BlinkCursor() {
	return (
		<motion.span
			animate={{
				opacity: [1, 0, 1],
			}}
			transition={{
				duration: 2.5,
				repeat: Number.POSITIVE_INFINITY,
				times: [0, 0.45, 0.5, 1],
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
	delay?: number;
	className?: string;
}

export function TypewriterText({
	text,
	speed = 30,
	delay = 0,
	className,
}: TypewriterTextProps) {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		setDisplayedText("");

		let i = 0;
		let interval: NodeJS.Timeout;

		const startTyping = () => {
			interval = setInterval(() => {
				i++;
				setDisplayedText(text.slice(0, i));

				if (i >= text.length) {
					clearInterval(interval);
				}
			}, speed);
		};

		const timeout = setTimeout(startTyping, delay);

		return () => {
			clearTimeout(timeout);
			if (interval) clearInterval(interval);
		};
	}, [text, speed, delay]);

	return (
		<span className={className}>
			{displayedText}
			<BlinkCursor />
		</span>
	);
}
