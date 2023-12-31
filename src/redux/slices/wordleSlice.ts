import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type LettersType = [string, string, string, string, string];

interface LetterState {
  letter: string;
  status: "PERFECT" | "HIT" | "MISS" | null;
}

interface WordleState {
  lettersInput: LettersType;
  currentRow: number;
  lettersGrid: LetterState[][];
  testWord: string;
}

const initialLettersGrid = [
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
  [
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
    { letter: "", status: null },
  ],
];

// Define the initial state using that type
const initialState: WordleState = {
  lettersInput: ["", "", "", "", ""],
  currentRow: 0,
  lettersGrid: initialLettersGrid,
  testWord: "THROE",
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    setLettersInput: (state, action: PayloadAction<LettersType>) => {
      state.lettersInput = action.payload;
    },
    setCurrentRow: (state, action: PayloadAction<number>) => {
      state.currentRow = action.payload;
    },
    setSingleLetterInLettersGrid: (
      state,
      action: PayloadAction<{
        rowNumber: number;
        index: number;
        letter: string;
      }>,
    ) => {
      const { rowNumber, index, letter } = action.payload;

      state.lettersGrid[rowNumber][index] = {
        letter: letter,
        status: state.lettersGrid[rowNumber][index].status,
      };
    },
    setSingleLetterStatusInGrid: (
      state,
      action: PayloadAction<{
        rowNumber: number;
        index: number;
        status: "PERFECT" | "HIT" | "MISS" | null;
      }>,
    ) => {
      const { rowNumber, index, status } = action.payload;

      state.lettersGrid[rowNumber][index] = {
        letter: state.lettersGrid[rowNumber][index].letter,
        status: status,
      };
    },
  },
});

export const { setLettersInput, setSingleLetterInLettersGrid } =
  wordleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer;
