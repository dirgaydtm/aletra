import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "#/shared/lib/supabase";
import { type AuthUser, authUserSchema } from "#/shared/schemas/auth.schema";

interface AuthState {
	user: AuthUser | null;
	isLoading: boolean;
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
	isLoading: true,

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
	},

	initialize: async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		const newUser = session?.user ? mapUser(session.user) : null;
		set({ user: newUser, isLoading: false });
	},
}));

supabase.auth.onAuthStateChange((_event, session) => {
	const newUser = session?.user ? mapUser(session.user) : null;
	useAuthStore.setState({ user: newUser, isLoading: false });
});
