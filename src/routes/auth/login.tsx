import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/components/LoginForm";
import { useAuthStore } from "#/shared/stores/auth.store";

export const Route = createFileRoute("/auth/login")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (user) throw redirect({ to: "/" });
	},
	component: LoginPage,
});

function LoginPage() {
	return (
		<section className="flex min-h-screen items-center justify-center px-4">
			<LoginForm />
		</section>
	);
}
