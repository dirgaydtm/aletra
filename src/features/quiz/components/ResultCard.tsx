import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { decode } from "he";
import Dino from "#/shared/components/Dino";
import slideInLeft from "#/shared/animations/slide-in-left";
import {
	Terminal,
	TerminalBody,
	TerminalFooter,
	TerminalHeader,
	TerminalTitle,
	TerminalWindowControls,
} from "#/shared/components/Terminal";
import { Badge } from "#/shared/components/ui/badge";
import { Separator } from "#/shared/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/shared/components/ui/table";
import { useAuthStore } from "#/shared/stores/auth.store";
import { useQuizStore } from "../../../shared/stores/quiz.store";

export function ResultCard() {
	const questions = useQuizStore((s) => s.questions);
	const answers = useQuizStore((s) => s.answers);
	const resetQuiz = useQuizStore((s) => s.resetQuiz);
	const username = useAuthStore((s) => s.user?.username);
	const navigate = useNavigate();

	const total = questions.length;
	const answered = Object.keys(answers).length;
	const correct = Object.values(answers).filter((a) => a.isCorrect).length;
	const wrong = answered - correct;
	const footerQuote =
		correct === total
			? `"I am the smartest programmer that's ever lived."- Terry A. Davis`
			: correct >= total * 0.8
				? `"Programs must be written for people to read."- Harold Abelson`
				: correct >= total * 0.6
					? `"The only way to learn a new programming language is by writing programs in it."- Dennis Ritchie`
					: correct >= total * 0.4
						? `"Talk is cheap. Show me the code."- Linus Torvalds`
						: `"The best error message is the one that never shows up."- Thomas Fuchs`;

	const handleRetry = () => {
		resetQuiz();
		navigate({ to: "/" });
	};

	return (
		<section className="flex flex-col lg:flex-row max-w-[90%] py-6 gap-6">
			<Terminal className="flex-1 not-lg:max-w-lg">
				<TerminalHeader>
					<div className="flex items-center gap-3">
						<TerminalWindowControls />
						<TerminalTitle>quiz.sh — results</TerminalTitle>
					</div>
					{username ? (
						<span className="text-xs text-muted-foreground">{username}</span>
					) : null}
				</TerminalHeader>

				<TerminalBody className="flex flex-col gap-2">
					<p className="select-none text-xs text-muted-foreground">
						$ summarize results
					</p>
					<h1 className="text-2xl font-bold tracking-tight">Quiz Results</h1>
					{username && (
						<p className="text-sm text-muted-foreground">
							Participant: {username}
						</p>
					)}

					<Separator className="my-4" />

					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
							{[
								{ label: "Total", value: total },
								{ label: "Answered", value: answered },
								{ label: "Correct", value: correct },
								{ label: "Incorrect", value: wrong },
							].map(({ label, value }) => (
								<div key={label} className="border border-border p-3">
									<p className="text-xs text-muted-foreground">{label}</p>
									<div className="mt-1 flex items-center gap-1.5">
										<span className="tabular-nums text-2xl font-bold">
											{value}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</TerminalBody>
				<TerminalFooter className="h-fit">
					<span className="text-xs text-muted-foreground">{footerQuote}</span>
				</TerminalFooter>
			</Terminal>

			<Terminal className="flex-2 not-lg:max-w-lg relative overflow-visible">
				<Dino className="absolute -top-14 right-12 size-16 -rotate-6 rotate-y-180" />
				<TerminalHeader>
					<div className="flex items-center gap-3">
						<TerminalWindowControls />
						<TerminalTitle>quiz.sh — answer details</TerminalTitle>
					</div>
					<span className="text-xs text-muted-foreground">log</span>
				</TerminalHeader>
				<TerminalBody className="p-0 max-h-96 overflow-auto">
					<Table className="table-fixed">
						<TableHeader>
							<TableRow>
								<TableHead className="w-10">#</TableHead>
								<TableHead>Question</TableHead>
								<TableHead className="w-24 text-center">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{questions.map((q, i) => {
								const ans = answers[q.id];
								return (
									<TableRow key={q.id}>
										<TableCell className="text-muted-foreground">
											{i + 1}
										</TableCell>
										<TableCell className="text-sm truncate">
											{decode(q.question)}
										</TableCell>
										<TableCell className="text-center">
											{!ans ? (
												<Badge variant="secondary" className="text-xs">
													Skipped
												</Badge>
											) : ans.isCorrect ? (
												<Badge className="bg-primary text-xs text-primary-foreground">
													Correct
												</Badge>
											) : (
												<Badge variant="destructive" className="text-xs">
													Incorrect
												</Badge>
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TerminalBody>
				<TerminalFooter className="p-0">
					<motion.button
						onClick={handleRetry}
						{...slideInLeft(1)}
						className="w-full cursor-pointer border border-border bg-foreground px-3 py-2.5 text-sm text-background transition-all duration-150 hover:border-foreground hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
					>
						Retry Quiz
					</motion.button>
				</TerminalFooter>
			</Terminal>
		</section>
	);
}
