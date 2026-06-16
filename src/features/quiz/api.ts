import axios from "axios";
import { opentdbResponseSchema } from "./schemas";
import type { QuizQuestion } from "./types";

const BASE_URL = "https://opentdb.com/api.php";

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export async function fetchQuestions(amount: number): Promise<QuizQuestion[]> {
	const { data } = await axios.get(BASE_URL, {
		// kategori 18 adalah kategori tema soal computer sciende
		params: { amount, category: 18 },
	});

	const parsed = opentdbResponseSchema.parse(data);

	if (parsed.response_code !== 0) {
		throw new Error(`OpenTDB error code: ${parsed.response_code}`);
	}

	return parsed.results.map((q) => ({
		...q,
		id: crypto.randomUUID(),
		answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
	}));
}
