import type {
	QuizAnswer,
	QuizConfig,
	QuizQuestion,
	QuizStatus,
} from "./schemas";

export type { QuizAnswer, QuizConfig, QuizQuestion, QuizStatus };

export interface QuizState {
	config: QuizConfig;
	questions: QuizQuestion[];
	currentIndex: number;
	answers: Record<string, QuizAnswer>;
	status: QuizStatus;
	startedAt: number | null;
}
