import { QUESTION_URI, SCORE_URI } from "../App";
import { QuestionResponse, ScoreResponse } from "../types";
import { axiosClient } from "../providers/axiosClient";

export const getQuestion = async (): Promise<QuestionResponse> => {
    const { data } = await axiosClient.get(QUESTION_URI);
    console.log(data)
    return {
        imageURL: data.url,
        answer: data.prompt,
    };
};

export const gradeAnswers = async (
    answers: string[],
    answerPrompt: string
): Promise<ScoreResponse> => {
    const { data } = await axiosClient.post(SCORE_URI, { answers, answerPrompt });
    return {
        scores: data.scores,
    };
};
