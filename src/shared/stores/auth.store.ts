import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "#/shared/lib/supabase";
import { type AuthUser, authUserSchema } from "#/shared/schemas/auth.schema";

interface AuthState {
	user: AuthUser | null;
	loginWithProvider: (
		provider: "google" | "github",
	) => Promise<{ error: string | null }>;
	logout: () => Promise<void>;
	initialize: () => Promise<void>;
}

const mapUser = (u: User): AuthUser =>
	authUserSchema.parse({
		id: u.id,
		email: u.email ?? "",
		username:
			u.user_metadata?.full_name ||
			u.user_metadata?.user_name ||
			u.user_metadata?.name ||
			u.email?.split("@")[0] ||
			"User",
		loggedInAt: Date.now(),
	});

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
		set({ user: session?.user ? mapUser(session.user) : null });
	},
}));

supabase.auth.onAuthStateChange((_event, session) => {
	useAuthStore.setState({ user: session?.user ? mapUser(session.user) : null });
});
