import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "#/shared/stores/auth.store";

export const Route = createFileRoute("/")({
	ssr: false,
	beforeLoad: () => {
		const user = useAuthStore.getState().user;
		if (!user) throw redirect({ to: "/auth" });
	},
	component: () => (
		<div className="flex min-h-screen items-center justify-center">
			<h1>Login Sukses! </h1>
		</div>
	),
});
