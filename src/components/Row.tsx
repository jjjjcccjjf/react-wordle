import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Wordle } from "../utils/Wordle";
import { useDispatch } from "react-redux";
type RowProps = {
  rowNumber: number;
};

export default function Row({ rowNumber }: RowProps) {
  const lettersGrid = useSelector(
    (state: RootState) => state.wordle.lettersGrid,
  );
  const correctWord = useSelector((state: RootState) => state.wordle.testWord);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);

  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  const dispatch = useDispatch();

  useEffect(() => {
    // handle autofocus here
  }, []);

  const handleEnter = () => {
    for (let index = 0; index < 5; index++) {
      const guessLetter = lettersGrid[rowNumber][index].letter;
      const actionPayload = Wordle.checkGuessLetter(
        guessLetter,
        correctWord,
        index,
        rowNumber,
      );

      dispatch(actionPayload);
    }
    // loop first row
    // inside the loop, test each letter against the testWord
    // return the action and payload
    // continue loop
  };

  const handleNextFocus = () => {
    // You can add additional logic here if needed
  };

  return (
    <div className="grid grid-flow-col gap-1">
      <Input
        rowNumber={rowNumber}
        index={0}
        letterState={lettersGrid[rowNumber][0]}
        prevFocus={null}
        nextFocus={inputRef2}
        refProp={inputRef1}
        autoFocus={true}
      />
      <Input
        rowNumber={rowNumber}
        index={1}
        letterState={lettersGrid[rowNumber][1]}
        prevFocus={inputRef1}
        nextFocus={inputRef3}
        refProp={inputRef2}
        readOnly={true}
      />
      <Input
        rowNumber={rowNumber}
        index={2}
        letterState={lettersGrid[rowNumber][2]}
        prevFocus={inputRef2}
        nextFocus={inputRef4}
        refProp={inputRef3}
        readOnly={true}
      />
      <Input
        rowNumber={rowNumber}
        index={3}
        letterState={lettersGrid[rowNumber][3]}
        prevFocus={inputRef3}
        nextFocus={inputRef5}
        refProp={inputRef4}
        readOnly={true}
      />
      <Input
        handleEnter={handleEnter}
        rowNumber={rowNumber}
        index={4}
        letterState={lettersGrid[rowNumber][4]}
        prevFocus={inputRef4}
        nextFocus={null}
        refProp={inputRef5}
        readOnly={true}
      />{" "}
      {/* Handle Enter key */}
    </div>
  );
}
