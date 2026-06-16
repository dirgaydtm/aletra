import { createFileRoute, redirect } from "@tanstack/react-router";
import AletraLogo from "#/shared/components/AletraLogo";
import { QuizSetup } from "#/shared/components/Setup";
import { useAuthStore } from "#/shared/stores/auth.store";
import { useQuizStore } from "#/shared/stores/quiz.store";

export const Route = createFileRoute("/")({
	ssr: false,
	beforeLoad: () => {
		const status = useQuizStore.getState().status;
		if (status === "active") throw redirect({ to: "/quiz" });
		if (status === "finished") throw redirect({ to: "/quiz/result" });
	},
	component: RootIndexPage,
});

function RootIndexPage() {
	const user = useAuthStore((s) => s.user);

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-4xl flex flex-col items-center z-10 relative pb-8">
				<AletraLogo />
				<QuizSetup username={user?.username ?? ""} />
			</div>
		</main>
	);
}
