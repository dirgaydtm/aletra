import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { toast } from "sonner";
import Dino from "#/shared/components/Dino";
import {
	Terminal,
	TerminalBody,
	TerminalFooter,
	TerminalHeader,
	TerminalTitle,
	TerminalWindowControls,
} from "#/shared/components/Terminal";
import { TypewriterText } from "#/shared/components/TypewriterText";
import { Button } from "#/shared/components/ui/button";
import { Input } from "#/shared/components/ui/input";
import { Label } from "#/shared/components/ui/label";
import { Separator } from "#/shared/components/ui/separator";
import { useAuthStore } from "#/shared/stores/auth.store";

export function RegisterForm() {
	const { loginWithProvider, registerWithEmail } = useAuthStore();
	const [activeProvider, setActiveProvider] = useState<
		"google" | "github" | "email" | null
	>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleOAuthLogin = async (provider: "google" | "github") => {
		setActiveProvider(provider);
		const result = await loginWithProvider(provider);
		if (result.error) {
			toast.error(result.error);
			setActiveProvider(null);
		} else {
			toast.success(`Connecting to ${provider}...`);
		}
	};

	const handleEmailRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setActiveProvider("email");
		const result = await registerWithEmail(email, password, username);
		if (result.error) {
			toast.error(result.error);
			setActiveProvider(null);
		} else {
			toast.success("Registration successful!");
			navigate({ to: "/" });
		}
	};

	const isLoading = activeProvider !== null;

	return (
		<Terminal className="relative z-10 w-full max-w-sm overflow-visible">
			<Dino className="absolute -top-14 right-6 size-16 -rotate-6 rotate-y-180 drop-shadow-md z-[-1]" />
			<TerminalHeader>
				<div className="flex items-center gap-3">
					<TerminalWindowControls />
					<TerminalTitle>auth.sh — register</TerminalTitle>
				</div>
				<span>
					<span className="text-xs text-muted-foreground">ready</span>
				</span>
			</TerminalHeader>

			<TerminalBody>
				<div className="space-y-1 pb-4">
					<p className="select-none text-xs text-muted-foreground">$ create_user</p>
					<TypewriterText
						text="Join the terminal."
						className="text-2xl font-bold tracking-tight"
					/>
				</div>

				<form onSubmit={handleEmailRegister} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="hacker99"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="rounded-none font-mono"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="hacker@aletra.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="rounded-none font-mono"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="rounded-none font-mono"
						/>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full cursor-pointer rounded-none border border-border bg-foreground px-3 py-5 text-sm text-background transition-all duration-150 hover:border-foreground hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
					>
						{activeProvider === "email" ? (
							<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent group-hover:border-foreground group-hover:border-t-transparent" />
						) : null}
						Register
					</Button>
				</form>

				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<Separator className="w-full" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
					</div>
				</div>

				<div className="flex gap-3">
					<Button
						type="button"
						disabled={isLoading}
						onClick={() => handleOAuthLogin("google")}
						className="flex-1 items-center justify-center rounded-none border border-border bg-transparent py-5 font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
					>
						{activeProvider === "google" ? (
							<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						) : (
							<FcGoogle className="mr-2 h-4 w-4" />
						)}
						Google
					</Button>
					<Button
						type="button"
						disabled={isLoading}
						onClick={() => handleOAuthLogin("github")}
						className="flex-1 items-center justify-center rounded-none border border-border bg-transparent py-5 font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
					>
						{activeProvider === "github" ? (
							<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						) : (
							<IoLogoGithub className="mr-2 h-4 w-4" />
						)}
						GitHub
					</Button>
				</div>
			</TerminalBody>
			<TerminalFooter className="flex items-center justify-center">
				<span className="text-xs text-muted-foreground">
					Already have an account?{" "}
					<Link to="/auth/login" className="text-foreground hover:underline">
						Login
					</Link>
				</span>
			</TerminalFooter>
		</Terminal>
	);
}
