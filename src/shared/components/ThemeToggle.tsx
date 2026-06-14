import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "#/shared/lib/utils.ts";

const css = `
::view-transition-group(root) {
  animation-duration: 0.7s;
  animation-timing-function: var(--expo-out);
}
      
::view-transition-new(root) {
  animation-name: reveal-light-top-left;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

.dark::view-transition-new(root) {
  animation-name: reveal-dark-top-left;
}

@keyframes reveal-dark-top-left {
  from {
    clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
  }
  to {
    clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
  }
}

@keyframes reveal-light-top-left {
  from {
    clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
  }
  to {
    clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
  }
}
`;

export const useThemeToggle = () => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		setIsDark(resolvedTheme === "dark");
	}, [resolvedTheme]);

	const toggleTheme = useCallback(() => {
		const nextDark = !isDark;
		setIsDark(nextDark);

		if (typeof window === "undefined") return;

		const styleId = "theme-transition-styles";
		let styleElement = document.getElementById(styleId) as HTMLStyleElement;
		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = styleId;
			document.head.appendChild(styleElement);
		}
		styleElement.textContent = css;

		const switchTheme = () => {
			setTheme(theme === "light" ? "dark" : "light");
		};

		if (!document.startViewTransition) {
			switchTheme();
			return;
		}

		document.startViewTransition(switchTheme);
	}, [theme, setTheme, isDark]);

	return { isDark, toggleTheme };
};

export const ThemeToggle = ({ className = "" }: { className?: string }) => {
	const { isDark, toggleTheme } = useThemeToggle();

	return (
		<button
			type="button"
			className={cn(
				"absolute top-5 right-5 size-6 rounded-full transition-all duration-300 active:scale-95",
				isDark ? "bg-black text-white" : "bg-white text-black",
				className,
			)}
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			<span className="sr-only">Toggle theme</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				fill="currentColor"
				strokeLinecap="round"
				viewBox="0 0 32 32"
				style={{ transition: "all 0.35s ease-in-out" }}
			>
				<title>Toggle theme</title>
				<clipPath id="skiper-btn-2">
					<motion.path
						initial={{ y: 0, x: 0 }}
						animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
					/>
				</clipPath>
				<g clipPath="url(#skiper-btn-2)">
					<motion.circle
						initial={{ r: 8 }}
						animate={{ r: isDark ? 10 : 8 }}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						cx="16"
						cy="16"
					/>
					<motion.g
						initial={{ rotate: 0, scale: 1, opacity: 1 }}
						animate={{
							rotate: isDark ? -100 : 0,
							scale: isDark ? 0.5 : 1,
							opacity: isDark ? 0 : 1,
						}}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M16 5.5v-4" />
						<path d="M16 30.5v-4" />
						<path d="M1.5 16h4" />
						<path d="M26.5 16h4" />
						<path d="m23.4 8.6 2.8-2.8" />
						<path d="m5.7 26.3 2.9-2.9" />
						<path d="m5.8 5.8 2.8 2.8" />
						<path d="m23.4 23.4 2.9 2.9" />
					</motion.g>
				</g>
			</svg>
		</button>
	);
};

export default ThemeToggle;
