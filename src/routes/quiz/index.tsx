import { createFileRoute, redirect } from "@tanstack/react-router";
import { PeekingCharacter } from "#/features/quiz/components/PeekingCharacter";
import { QuizSetup } from "#/features/quiz/components/QuizSetup";
import { useAuthStore } from "#/shared/stores/auth.store";
import { useQuizStore } from "#/shared/stores/quiz.store";

export const Route = createFileRoute("/quiz/")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (!user) throw redirect({ to: "/auth" });

		const status = useQuizStore.getState().status;
		if (status === "active") throw redirect({ to: "/quiz/play" });
		if (status === "finished") throw redirect({ to: "/quiz/result" });
	},
	component: QuizIndexPage,
});

function QuizIndexPage() {
	const user = useAuthStore((s) => s.user);
	return (
		<div className="flex h-screen relative overflow-hidden items-center justify-center bg-background px-4">
			<QuizSetup username={user?.username ?? "Pengguna"} />
			<PeekingCharacter/>
		</div>
	);
}
