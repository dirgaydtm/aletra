import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { toast } from "sonner";
import Dino from "#/shared/components/Dino";
import { Button } from "#/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/shared/components/ui/card";
import { Separator } from "#/shared/components/ui/separator";
import { useAuthStore } from "#/shared/stores/auth.store";

export function LoginForm() {
	const { loginWithProvider } = useAuthStore();
	const [activeProvider, setActiveProvider] = useState<
		"google" | "github" | null
	>(null);

	const handleLogin = async (provider: "google" | "github") => {
		setActiveProvider(provider);
		const result = await loginWithProvider(provider);
		if (result.error) {
			toast.error(result.error);
			setActiveProvider(null);
		} else {
			toast.success(`Menghubungkan ke ${provider}...`);
		}
	};

	const isLoading = activeProvider !== null;

	return (
		<Card className="w-full relative max-w-sm border bg-background rounded-none overflow-visible">
			<Dino className="absolute size-20 -top-12 left-2" />
			<CardHeader>
				<CardTitle className="text-2xl font-bold tracking-tight text-end">
					Start Playing
				</CardTitle>
				<CardDescription className="text-muted-foreground text-start mt-1">
					Choose one of the authentication methods below to continue
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="flex not-md:flex-col gap-3">
				<Button
					type="button"
					disabled={isLoading}
					onClick={() => handleLogin("google")}
					className="flex-1 items-center justify-center py-5 font-medium text-foreground hover:text-background hover:bg-foreground bg-transparent border border-border transition-all duration-200 cursor-pointer"
				>
					{activeProvider === "google" ? (
						<span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
					) : (
						<FcGoogle />
					)}
					Google
				</Button>
				<Button
					type="button"
					disabled={isLoading}
					onClick={() => handleLogin("github")}
					className="flex-1 items-center justify-center py-5 font-medium text-foreground hover:text-background hover:bg-foreground bg-transparent border border-border transition-all duration-200 cursor-pointer"
				>
					{activeProvider === "github" ? (
						<span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
					) : (
						<IoLogoGithub />
					)}
					GitHub
				</Button>
			</CardContent>
		</Card>
	);
}
