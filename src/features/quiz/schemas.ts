import { z } from "zod";

export const quizQuestionSchema = z.object({
	type: z.string(),
	difficulty: z.string(),
	category: z.string(),
	question: z.string(),
	correct_answer: z.string(),
	incorrect_answers: z.array(z.string()),
});

export const opentdbResponseSchema = z.object({
	response_code: z.number(),
	results: z.array(quizQuestionSchema),
});

export const quizQuestionExtendedSchema = quizQuestionSchema.extend({
	id: z.string(),
	answers: z.array(z.string()),
});
export type QuizQuestion = z.infer<typeof quizQuestionExtendedSchema>;

export const quizStatusSchema = z.enum(["idle", "active", "finished"]);
export type QuizStatus = z.infer<typeof quizStatusSchema>;

export const quizAnswerSchema = z.object({
	questionId: z.string(),
	selectedAnswer: z.string(),
	isCorrect: z.boolean(),
});
export type QuizAnswer = z.infer<typeof quizAnswerSchema>;

export const quizConfigSchema = z.object({
	amount: z.number(),
	duration: z.number(),
});
export type QuizConfig = z.infer<typeof quizConfigSchema>;
