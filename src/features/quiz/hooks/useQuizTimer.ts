import { useEffect, useState } from "react";
import { useQuizStore } from "../../../shared/stores/quiz.store";

export function useQuizTimer() {
	const status = useQuizStore((s) => s.status);
	const startedAt = useQuizStore((s) => s.startedAt);
	const duration = useQuizStore((s) => s.config.duration);
	const finishQuiz = useQuizStore((s) => s.finishQuiz);

	const [timeRemaining, setTimeRemaining] = useState(() => {
		if (status !== "active" || !startedAt) return 0;
		const elapsed = Math.floor((Date.now() - startedAt) / 1000);
		return Math.max(0, duration - elapsed);
	});

	useEffect(() => {
		if (status !== "active" || !startedAt) return;

		const getRemaining = () => {
			const elapsed = Math.floor((Date.now() - startedAt) / 1000);
			return Math.max(0, duration - elapsed);
		};

		const initialRemaining = getRemaining();
		setTimeRemaining(initialRemaining);
		if (initialRemaining <= 0) {
			finishQuiz();
			return;
		}

		const interval = setInterval(() => {
			const currentRemaining = getRemaining();
			setTimeRemaining(currentRemaining);

			if (currentRemaining <= 0) {
				finishQuiz();
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [status, startedAt, duration, finishQuiz]);

	return { timeRemaining, status };
}
