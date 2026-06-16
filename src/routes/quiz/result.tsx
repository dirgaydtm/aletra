import { createFileRoute, redirect } from "@tanstack/react-router";
import { PeekingCharacter } from "#/features/quiz/components/PeekingCharacter";
import { ResultCard } from "#/features/quiz/components/ResultCard";
import { useAuthStore } from "#/shared/stores/auth.store";
import { useQuizStore } from "#/shared/stores/quiz.store";

export const Route = createFileRoute("/quiz/result")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (!user) throw redirect({ to: "/auth" });

		const status = useQuizStore.getState().status;
		if (status === "idle") throw redirect({ to: "/" });
		if (status === "active") throw redirect({ to: "/quiz/play" });
	},
	component: QuizResultPage,
});

function QuizResultPage() {
	return (
		<div className="flex min-h-screen overflow-hidden items-center justify-center bg-background px-4">
			<ResultCard />
			<PeekingCharacter />
		</div>
	);
}
