import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "#/shared/lib/supabase";
import { type AuthUser, authUserSchema } from "#/shared/schemas/auth.schema";
import { useQuizStore } from "#/shared/stores/quiz.store";

interface AuthState {
	user: AuthUser | null;
	isLoading: boolean;
	loginWithProvider: (
		provider: "google" | "github",
	) => Promise<{ error: string | null }>;
	loginWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
	registerWithEmail: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
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

	loginWithEmail: async (email, password) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		return { error: error?.message ?? null };
	},

	registerWithEmail: async (email, password, username) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { user_name: username },
			},
		});
		if (data.user?.identities?.length === 0) {
			return { error: "Email already registered." };
		}
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

	if (!newUser) {
		useQuizStore.getState().resetQuiz();
	}
});
