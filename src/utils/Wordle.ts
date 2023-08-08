import { Action } from "@reduxjs/toolkit";

interface SetSingleLetterStatusInGridPayload {
  rowNumber: number;
  index: number;
  status: "PERFECT" | "HIT" | "MISS" | null;
}

// Define a custom action interface that includes the payload
interface ActionPayload extends Action<string> {
  payload: SetSingleLetterStatusInGridPayload;
}

export class Wordle {
  static createSetSingleLettersGridLetterStatusAction(
    rowNumber: number,
    index: number,
    status: "PERFECT" | "HIT" | "MISS" | null,
  ): ActionPayload {
    return {
      type: "wordle/setSingleLetterStatusInGrid",
      payload: { rowNumber, index, status },
    };
  }

  static checkGuessLetter(
    guessLetter: string,
    correctWord: string,
    index: number,
    rowNumber: number,
  ): ActionPayload {
    const capsGuessLetter = guessLetter.toUpperCase();
    const capsCorrectWord = correctWord.toUpperCase();
    let status: "PERFECT" | "HIT" | "MISS" | null = null;

    if (capsGuessLetter === capsCorrectWord[index]) {
      status = "PERFECT";
    } else if (capsCorrectWord.indexOf(capsGuessLetter) > -1) {
      status = "HIT";
    } else {
      status = "MISS";
    }

    return {
      type: "wordle/setSingleLetterStatusInGrid",
      payload: { rowNumber, index, status },
    };
  }
}
