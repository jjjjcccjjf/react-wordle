import { useState, useEffect } from 'react';
import clsx from 'clsx';
import '@fontsource/roboto';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface InputProps {
    nextFocus: React.RefObject<HTMLInputElement> | null;
    prevFocus: React.RefObject<HTMLInputElement> | null;
    refProp: React.RefObject<HTMLInputElement> | null;
    readOnly?: boolean,
    autoFocus?: boolean,
    rowNumber: number
}

export default function Input({ nextFocus, prevFocus, refProp, readOnly, autoFocus, rowNumber }: InputProps) {
    const [inputValue, setInputValue] = useState('')
    const currentRow = useSelector((state: RootState) => state.wordle.currentRow)

    let classes = clsx(
        'border-2 border-white/20 w-14 h-14 text-3xl uppercase text-center font-bold font-[Roboto] text-white bg-transparent  outline-none transition-transform duration-200 caret-transparent'
    )

    useEffect(() => {
        const currentRefProp = refProp?.current
        if (currentRefProp && inputValue.length > 0) {
            currentRefProp.classList.add('border-white/40')
            currentRefProp.classList.add('animate-pop')
            currentRefProp.classList.remove('border-white/20')
        } else if (currentRefProp && inputValue.length === 0) {
            currentRefProp.classList.remove('border-white/40')
            currentRefProp.classList.remove('animate-pop')
            currentRefProp.classList.add('border-white/20')
        }
    }, [inputValue])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = /^[A-Za-z]$/;
        console.log('keydown');

        if (e.key === 'Backspace' && refProp?.current?.value === '' && refProp?.current && prevFocus?.current) {
            console.log('moving focus to previous');

            prevFocus.current.readOnly = false
            prevFocus.current.focus();
            // refProp.current.readOnly = true
        } else if (!e.key.match(allowedKeys) && e.key !== 'Backspace' && e.key !== 'Enter') {
            console.log('prevented');

            e.preventDefault();
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if (e.target.value.length !== 0 && refProp?.current && nextFocus?.current) {
            refProp.current.readOnly = true
            nextFocus.current.readOnly = false
            nextFocus.current.focus();
        }
    }

    const handleOnClick = () => {
        if (refProp?.current) {
            refProp.current.selectionStart = 1
        }
    }

    return (
        <input
            ref={refProp}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            onClick={handleOnClick}
            type="text"
            maxLength={1}
            className={classes}
            value={inputValue}
            readOnly={readOnly}
            autoFocus={autoFocus && currentRow === rowNumber}
        />
    );
}
