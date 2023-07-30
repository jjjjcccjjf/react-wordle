
import { useState, useRef } from 'react';
import Input from './Input';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

type RowProps = {
    rowNumber: number
}

export default function Row({ rowNumber }: RowProps) {


    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);
    const inputRef4 = useRef<HTMLInputElement>(null);
    const inputRef5 = useRef<HTMLInputElement>(null);

    const currentRow = useSelector((state: RootState) => state.wordle.currentRow)

    const handleEnter = () => {
        // Do something when the user presses Enter (optional)
    };

    const handleNextFocus = () => {
        // You can add additional logic here if needed
    };

    return (
        <div className="grid grid-flow-col gap-1">
            <Input rowNumber={rowNumber} prevFocus={null} nextFocus={inputRef2} refProp={inputRef1} autoFocus={true} />
            <Input rowNumber={rowNumber} prevFocus={inputRef1} nextFocus={inputRef3} refProp={inputRef2} readOnly={true} />
            <Input rowNumber={rowNumber} prevFocus={inputRef2} nextFocus={inputRef4} refProp={inputRef3} readOnly={true} />
            <Input rowNumber={rowNumber} prevFocus={inputRef3} nextFocus={inputRef5} refProp={inputRef4} readOnly={true} />
            <Input rowNumber={rowNumber} prevFocus={inputRef4} nextFocus={null} refProp={inputRef5} readOnly={true} /> {/* Handle Enter key */}
        </div>
    );
}
