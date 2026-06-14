import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "#/shared/stores/auth.store";

export const Route = createFileRoute("/auth/callback")({
	ssr: false,
	component: AuthCallbackPage,
});

function AuthCallbackPage() {
	const navigate = useNavigate();

	useEffect(() => {
		useAuthStore
			.getState()
			.initialize()
			.then(() => {
				const user = useAuthStore.getState().user;
				navigate({ to: user ? "/" : "/auth" });
			})
			.catch(() => {
				navigate({ to: "/auth" });
			});
	}, [navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="flex flex-col items-center gap-3">
				<span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
				<p className="text-sm text-muted-foreground animate-pulse">
					Menghubungkan akun...
				</p>
			</div>
		</div>
	);
}
