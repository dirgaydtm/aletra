import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "#/features/auth/components/RegisterForm";
import { useAuthStore } from "#/shared/stores/auth.store";

export const Route = createFileRoute("/auth/register")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (user) throw redirect({ to: "/" });
	},
	component: RegisterPage,
});

function RegisterPage() {
	return (
		<section className="flex min-h-screen items-center justify-center px-4">
			<RegisterForm />
		</section>
	);
}
