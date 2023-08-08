import { describe, expect, it } from "vitest";
import { Wordle } from "../src/utils/Wordle";

describe("Wordle utility class", () => {
  it("should check letters correctly", () => {
    const res1 = Wordle.checkGuessLetter("t", "throe", 0, 0);
    const res2 = Wordle.checkGuessLetter("z", "throe", 0, 0);
    const res3 = Wordle.checkGuessLetter("e", "throe", 0, 0);

    expect(res1.payload.status).toEqual("PERFECT");
    expect(res2.payload.status).toEqual("MISS");
    expect(res3.payload.status).toEqual("HIT");

    expect(res1.type).toEqual('wordle/setSingleLetterStatusInGrid')
  });
});
