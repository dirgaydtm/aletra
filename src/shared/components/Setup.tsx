import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useState } from "react";
import slideInLeft from "#/shared/animations/slide-in-left";
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
import { Label } from "#/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/shared/components/ui/select";
import { Separator } from "#/shared/components/ui/separator";
import { useAuthStore } from "#/shared/stores/auth.store";
import { fetchQuestions } from "../../features/quiz/api";
import { useQuizStore } from "../stores/quiz.store";

const AMOUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 40, 50];
const DURATION_OPTIONS = [1, 2, 3, 5, 10, 15, 20, 30, 45, 60];

export function QuizSetup({ username }: { username: string }) {
	const { startQuiz, resetQuiz } = useQuizStore();
	const { logout } = useAuthStore();
	const [amount, setAmount] = useState(10);
	const [duration, setDuration] = useState(10);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const navigate = useNavigate();

	function getLoadingMessage(amount: number) {
		if (amount <= 5) return "A quick challenge.";
		if (amount <= 10) return "Perfect for a short break.";
		if (amount <= 20) return "A balanced set of questions.";
		if (amount <= 30) return "This might take a while...";
		return "Set aside a few minutes.";
	}

	const handleLogout = async () => {
		resetQuiz();
		await logout();
		navigate({ to: "/" });
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setApiError(null);
		try {
			const questions = await fetchQuestions(amount);
			startQuiz(questions, { amount, duration: duration * 60 });
			navigate({ to: "/quiz" });
		} catch {
			setApiError(
				"Failed to fetch questions from the server. Please try again.",
			);
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20, height: 0, marginTop: 0 }}
			animate={{ opacity: 1, y: 0, height: "auto", marginTop: 48 }}
			transition={{ duration: 0.5, delay: 1.5 }}
			className="w-full flex flex-col items-center overflow-visible"
		>
			<Terminal className="relative z-10 max-w-lg overflow-visible">
				<Dino className="absolute -top-16 right-0 size-20 rotate-y-180" />
				<TerminalHeader>
					<div className="flex items-center gap-3">
						<TerminalWindowControls />
						<TerminalTitle>quiz.sh — setup</TerminalTitle>
					</div>
					<span>
						<span className="text-xs text-muted-foreground">ready</span>
					</span>
				</TerminalHeader>

				<TerminalBody>
					<div className="space-y-1 pb-4">
						<p className="select-none text-xs text-muted-foreground">
							$ whoami
						</p>
						<TypewriterText
							text={`Aloha, ${username ? username : "Stranger"}!`}
							delay={2000}
							className="text-2xl font-bold tracking-tight"
						/>
						<p className="text-start text-sm text-muted-foreground">
							Prove that you're a real programmer.
						</p>
					</div>

					<Separator />

					<form onSubmit={onSubmit} className="space-y-4 pt-4">
						<div className="space-y-1.5">
							<Label htmlFor="amount">Number of Questions</Label>
							<Select
								value={amount.toString()}
								onValueChange={(val) => setAmount(Number(val))}
							>
								<SelectTrigger
									id="amount"
									className="w-full cursor-pointer justify-between rounded-none border border-border bg-transparent py-5 text-left text-base outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed md:text-sm dark:bg-input/30"
								>
									<SelectValue placeholder="Select amount" />
								</SelectTrigger>
								<SelectContent className="rounded-none border border-border bg-background text-foreground">
									{AMOUNT_OPTIONS.map((val) => (
										<SelectItem
											key={val}
											value={val.toString()}
											className="cursor-pointer rounded-none py-2"
										>
											{val}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="duration">Quiz Duration</Label>
							<Select
								value={duration.toString()}
								onValueChange={(val) => setDuration(Number(val))}
							>
								<SelectTrigger
									id="duration"
									className="w-full cursor-pointer justify-between rounded-none border border-border bg-transparent py-5 text-left text-base outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed md:text-sm dark:bg-input/30"
								>
									<SelectValue placeholder="Select duration" />
								</SelectTrigger>
								<SelectContent className="rounded-none border border-border bg-background text-foreground">
									{DURATION_OPTIONS.map((val) => (
										<SelectItem
											key={val}
											value={val.toString()}
											className="cursor-pointer rounded-none py-2"
										>
											{val} {val === 1 ? "minute" : "minutes"}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{apiError && <p className="text-sm text-destructive">{apiError}</p>}

						<div className="flex gap-3">
							{!useAuthStore((s) => s.user) ? (
								<motion.button
									type="button"
									{...slideInLeft(1)}
									onClick={() => navigate({ to: "/auth/login" })}
									className="flex-1 group cursor-pointer items-center justify-center border border-border bg-transparent px-3 py-2.5 text-sm transition-all duration-150 hover:border-foreground hover:bg-foreground hover:text-background"
								>
									Login to Play
								</motion.button>
							) : (
								<>
									<motion.button
										type="button"
										{...slideInLeft(1)}
										onClick={handleLogout}
										className="flex-1 group cursor-pointer items-center gap-2 border border-border bg-transparent px-3 py-2.5 text-sm transition-all duration-150 hover:border-foreground hover:bg-destructive-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
									>
										Log Out
									</motion.button>
									<motion.button
										type="submit"
										{...slideInLeft(1)}
										disabled={isSubmitting}
										className="group flex flex-3 cursor-pointer items-center justify-center border border-border bg-transparent px-3 py-2.5 text-sm transition-all duration-150 hover:border-foreground hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
									>
										{isSubmitting && (
											<Loader className="mr-2 h-5 w-5 animate-spin" />
										)}
										{isSubmitting ? "Loading questions..." : "Start Quiz"}
									</motion.button>
								</>
							)}
						</div>
					</form>
				</TerminalBody>
				<TerminalFooter className="flex items-center justify-end">
					<span className="text-xs text-muted-foreground">
						{getLoadingMessage(amount)}
					</span>
				</TerminalFooter>
			</Terminal>
		</motion.div>
	);
}
