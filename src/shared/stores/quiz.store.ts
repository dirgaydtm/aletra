import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
	QuizAnswer,
	QuizConfig,
	QuizQuestion,
	QuizState,
} from "../../features/quiz/types";

interface QuizStore extends QuizState {
	startQuiz: (questions: QuizQuestion[], config: QuizConfig) => void;
	answerQuestion: (questionId: string, selectedAnswer: string) => void;
	finishQuiz: () => void;
	resetQuiz: () => void;
}

const initialState: QuizState = {
	config: { amount: 10, duration: 600 },
	questions: [],
	currentIndex: 0,
	answers: {},
	status: "idle",
	startedAt: null,
};

export const useQuizStore = create<QuizStore>()(
	persist(
		(set, get) => ({
			...initialState,

			startQuiz: (questions, config) =>
				set({
					questions,
					config,
					currentIndex: 0,
					answers: {},
					status: "active",
					startedAt: Date.now(),
				}),

			answerQuestion: (questionId, selectedAnswer) => {
				const { questions, currentIndex, answers } = get();
				const question = questions[currentIndex];
				if (!question || question.id !== questionId) return;

				const isCorrect = selectedAnswer === question.correct_answer;
				const newAnswers: Record<string, QuizAnswer> = {
					...answers,
					[questionId]: { questionId, selectedAnswer, isCorrect },
				};
				const nextIndex = currentIndex + 1;
				const isLast = nextIndex >= questions.length;

				set({
					answers: newAnswers,
					currentIndex: nextIndex,
					status: isLast ? "finished" : "active",
				});
			},

			finishQuiz: () => set({ status: "finished" }),

			resetQuiz: () => set(initialState),
		}),
		{ name: "quiz-session" },
	),
);
