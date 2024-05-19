import axios from "axios";
import { QUESTION_URI, SCORE_URI } from "../App";
import { QuestionResponse, ScoreResponse } from "../types";

export const getQuestion = async (): Promise<QuestionResponse> => {
  const { data } = await axios.get(QUESTION_URI);
  return {
    imageURL: data.imageURL,
    answer: data.answer,
  };
};

export const gradeAnswers = async (
  answers: string[],
  answerPrompt: string
): Promise<ScoreResponse> => {
  const { data } = await axios.post(SCORE_URI, { answers, answerPrompt });
  return {
    scores: data.scores,
  };
};
