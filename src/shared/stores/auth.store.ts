import { create } from "zustand";
import { supabase } from "#/shared/lib/supabase";
import type { AuthUser } from "#/shared/schemas/auth.schema";

interface AuthState {
	user: AuthUser | null;
	loginWithProvider: (
		provider: "google" | "github",
	) => Promise<{ error: string | null }>;
	logout: () => Promise<void>;
	initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
	user: null,

	loginWithProvider: async (provider) => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
		return { error: error?.message ?? null };
	},

	logout: async () => {
		await supabase.auth.signOut();
		set({ user: null });
	},

	initialize: async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session?.user) {
			const u = session.user;
			const username =
				u.user_metadata?.full_name ||
				u.user_metadata?.user_name ||
				u.user_metadata?.name ||
				u.email?.split("@")[0] ||
				"User";

			set({
				user: {
					id: u.id,
					email: u.email || "",
					username,
					loggedInAt: Date.now(),
				},
			});
		} else {
			set({ user: null });
		}
	},
}));
