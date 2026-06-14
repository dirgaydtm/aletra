import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "#/shared/stores/auth.store";

export const Route = createFileRoute("/auth/callback")({
	ssr: false,
	component: AuthCallbackPage,
});

const TIMEOUT_MS = 5000;

function AuthCallbackPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);

	useEffect(() => {
		if (user) {
			navigate({ to: "/quiz" });
		}
	}, [user, navigate]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!useAuthStore.getState().user) {
				navigate({ to: "/auth" });
			}
		}, TIMEOUT_MS);

		return () => clearTimeout(timer);
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
