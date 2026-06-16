import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PeekingCharacter } from "#/features/quiz/components/PeekingCharacter";
import { QuestionCard } from "#/features/quiz/components/QuestionCard";
import { useAuthStore } from "#/shared/stores/auth.store";
import { useQuizStore } from "#/shared/stores/quiz.store";

export const Route = createFileRoute("/quiz/play")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (!user) throw redirect({ to: "/auth" });

		const status = useQuizStore.getState().status;
		if (status === "idle") throw redirect({ to: "/" });
		if (status === "finished") throw redirect({ to: "/quiz/result" });
	},
	component: QuizPlayPage,
});

function QuizPlayPage() {
	const questions = useQuizStore((s) => s.questions);
	const currentIndex = useQuizStore((s) => s.currentIndex);
	const navigate = useNavigate();
	const status = useQuizStore((s) => s.status);

	useEffect(() => {
		if (status === "finished") {
			navigate({ to: "/quiz/result" });
		}
	}, [status, navigate]);

	const currentQuestion = questions[currentIndex];

	if (!currentQuestion) return null;

	return (
		<div className="relative flex min-h-screen items-center justify-center bg-background px-4">
			<QuestionCard question={currentQuestion} />
			<PeekingCharacter/>
		</div>
	);
}
