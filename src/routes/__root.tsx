import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "#/shared/components/ThemeToggle";
import { Toaster } from "#/shared/components/ui/sonner";
import { useAuthStore } from "#/shared/stores/auth.store";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Aletra" },
			{
				name: "description",
				content: "Aletra - computer science quiz.",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	beforeLoad: () => useAuthStore.getState().initialize(),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="id" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<ThemeProvider attribute="class" defaultTheme="dark">
					{children}
					<Toaster />
					<ThemeToggle />
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
