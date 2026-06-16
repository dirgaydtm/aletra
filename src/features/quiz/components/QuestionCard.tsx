import { AnimatePresence, motion } from "framer-motion";
import { decode } from "he";
import {
	Terminal,
	TerminalBody,
	TerminalFooter,
	TerminalHeader,
	TerminalProgress,
	TerminalTitle,
	TerminalWindowControls,
} from "#/shared/components/Terminal";
import { TypewriterText } from "#/shared/components/TypewriterText";
import { cn, formatTime } from "#/shared/lib/utils";
import { useQuizStore } from "../../../shared/stores/quiz.store";
import { useQuizTimer } from "../hooks/useQuizTimer";
import type { QuizQuestion } from "../types";

interface Props {
	question: QuizQuestion;
}

export function QuestionCard({ question }: Props) {
	const answerQuestion = useQuizStore((s) => s.answerQuestion);
	const status = useQuizStore((s) => s.status);
	const questions = useQuizStore((s) => s.questions);
	const currentIndex = useQuizStore((s) => s.currentIndex);
	const answers = useQuizStore((s) => s.answers);
	const { timeRemaining } = useQuizTimer();

	const total = questions.length;
	const answered = Object.keys(answers).length;
	const progress = total > 0 ? (answered / total) * 100 : 0;
	const isLow = timeRemaining <= 60;

	const handleAnswer = (answer: string) => {
		answerQuestion(question.id, answer);
	};

	return (
		<Terminal className="max-w-2xl">
			<TerminalHeader>
				<div className="flex items-center gap-3">
					<TerminalWindowControls />
					<TerminalTitle>
						quiz.sh — question {Math.min(currentIndex + 1, total)}/{total}
					</TerminalTitle>
				</div>
				<motion.span
					key={timeRemaining}
					animate={{ opacity: isLow ? [1, 0.3, 1] : 1 }}
					transition={
						isLow ? { duration: 0.8, repeat: Number.POSITIVE_INFINITY } : {}
					}
					className={cn(
						"text-xs tabular-nums",
						isLow ? "text-destructive" : "text-muted-foreground",
					)}
				>
					{formatTime(timeRemaining)}
				</motion.span>
			</TerminalHeader>
			<TerminalProgress value={progress} />
			<TerminalBody className="flex flex-col gap-4">
				<p className="select-none text-xs text-muted-foreground">
					$ cat question_{currentIndex + 1}.txt
				</p>

				<TypewriterText
					className="min-h-12 select-none text-sm font-semibold leading-relaxed"
					text={decode(question.question)}
					speed={40}
				/>

				<div className="border-t border-dashed border-border" />

				<span className="select-none text-xs text-muted-foreground">
					$ select answer:
				</span>
				<div
					className={`grid gap-1.5 h-50 ${question.answers.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
				>
					<AnimatePresence>
						{question.answers.map((answer, i) => (
							<motion.button
								key={answer}
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: i * 0.08,
									duration: 0.25,
									ease: "easeOut",
								}}
								className="group flex w-full h-fit cursor-pointer items-center gap-2 rounded-none border border-border bg-transparent px-3 py-2.5 text-left text-sm transition-all duration-150 hover:border-foreground hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
								onClick={() => handleAnswer(answer)}
								disabled={status !== "active"}
								id={`answer-${i}`}
							>
								{question.answers.length > 2 ? (
									<span className="w-5 shrink-0 font-mono text-xs text-muted-foreground group-hover:text-background/60">
										[{String.fromCharCode(65 + i)}]
									</span>
								) : (
									<span className="w-5 shrink-0 font-mono text-xs text-muted-foreground group-hover:text-background/60">
										{`>`}
									</span>
								)}
								<span>{decode(answer)}</span>
							</motion.button>
						))}
					</AnimatePresence>
				</div>
			</TerminalBody>
			<TerminalFooter className="flex items-center justify-between">
				<span className="select-none text-xs text-muted-foreground">
					{answered}/{total} answered
				</span>
				<span className="select-none text-xs text-muted-foreground">
					{question.type === "boolean" ? "true/false" : "multiple choice"}
				</span>
			</TerminalFooter>
		</Terminal>
	);
}
