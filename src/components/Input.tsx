import { useEffect } from "react";
import clsx from "clsx";
import "@fontsource/roboto";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setSingleLetterInLettersGrid } from "../redux/slices/wordleSlice";

interface InputProps {
  nextFocus: React.RefObject<HTMLInputElement> | null;
  prevFocus: React.RefObject<HTMLInputElement> | null;
  refProp: React.RefObject<HTMLInputElement> | null;
  readOnly?: boolean;
  autoFocus?: boolean;
  rowNumber: number;
  letterState: { letter: string; status: "HIT" | "PERFECT" | "MISS" | null };
  index: number;
  handleEnter?: () => void;
}

export default function Input({
  nextFocus,
  prevFocus,
  refProp,
  readOnly,
  autoFocus,
  rowNumber,
  letterState,
  index,
  handleEnter,
}: InputProps) {
  const dispatch = useDispatch();
  const currentRow = useSelector((state: RootState) => state.wordle.currentRow);

  const classes = clsx(
    "h-14 w-14 border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent",
  );

  const missColor = "bg-[#3a3a3c]";
  const hitColor = "bg-[#b59f3b]";
  const perfectColor = "bg-[#538d4e]";

  useEffect(() => {
    const currentRefProp = refProp?.current;
    if (currentRefProp && letterState.letter.length > 0) {
      currentRefProp.classList.add("border-white/40");
      currentRefProp.classList.add("animate-pop");
      currentRefProp.classList.remove("border-white/20");
    } else if (currentRefProp && letterState.letter.length === 0) {
      currentRefProp.classList.remove("border-white/40");
      currentRefProp.classList.remove("animate-pop");
      currentRefProp.classList.add("border-white/20");
    }
  }, [letterState.letter]);

  useEffect(() => {
    const currentRefProp = refProp?.current;
    if (currentRefProp && letterState.status !== null) {
      currentRefProp.classList.add(`animate-flip-${index}`);

      if (letterState.status === "PERFECT") {
        setTimeout(() => {
          currentRefProp.classList.remove("bg-transparent");
          currentRefProp.classList.remove("border-2");
          currentRefProp.classList.add(perfectColor);
        }, index * 400 + 500);
      } else if (letterState.status === "HIT") {
        setTimeout(() => {
          currentRefProp.classList.remove("bg-transparent");
          currentRefProp.classList.remove("border-2");
          currentRefProp.classList.add(hitColor);
        }, index * 400 + 500);
      } else if (letterState.status === "MISS") {
        setTimeout(() => {
          currentRefProp.classList.remove("bg-transparent");
          currentRefProp.classList.remove("border-2");
          currentRefProp.classList.add(missColor);
        }, index * 400 + 500);
      }
    }
  }, [letterState.status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = /^[A-Za-z]$/;
    // console.log('keydown');

    if (
      e.key === "Backspace" &&
      refProp?.current?.value === "" &&
      refProp?.current &&
      prevFocus?.current
    ) {
      console.log("moving focus to previous");

      prevFocus.current.readOnly = false;
      prevFocus.current.focus();
    } else if (e.key === "Enter") {
      if (handleEnter) {
        handleEnter();
      }

      if (refProp?.current?.value !== "") {
        console.log("pressed enter but accepted");
      } else {
        console.log("pressed enter but rejected");
      }
    } else if (
      !e.key.match(allowedKeys) &&
      e.key !== "Backspace" &&
      e.key !== "Enter"
    ) {
      console.log("prevented");
      e.preventDefault();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(e.target.value)
    dispatch(
      setSingleLetterInLettersGrid({
        rowNumber,
        index,
        letter: e.target.value,
      }),
    );

    if (e.target.value.length !== 0 && refProp?.current && nextFocus?.current) {
      refProp.current.readOnly = true;
      nextFocus.current.readOnly = false;
      nextFocus.current.focus();
    }
  };

  const handleOnClick = () => {
    if (refProp?.current) {
      refProp.current.selectionStart = 1;
    }
  };

  return (
    <input
      ref={refProp}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      onClick={handleOnClick}
      type="text"
      maxLength={1}
      className={classes}
      value={letterState.letter}
      readOnly={readOnly}
      autoFocus={autoFocus && currentRow === rowNumber}
    />
  );
}
