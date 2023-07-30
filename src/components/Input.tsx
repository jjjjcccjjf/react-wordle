import { useState, useEffect } from 'react';
import clsx from 'clsx';
import '@fontsource/roboto';

interface InputProps {
    nextFocus: React.RefObject<HTMLInputElement> | null;
    prevFocus: React.RefObject<HTMLInputElement> | null;
    refProp: React.RefObject<HTMLInputElement> | null;
}

export default function Input({ nextFocus, prevFocus, refProp }: InputProps) {
    const [inputValue, setInputValue] = useState('')
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

    return (
        <input
            ref={refProp}
            onChange={(e) => {
                // move caret to end
                setInputValue(e.target.value)
                if (e.target.value.length !== 0) {
                    nextFocus?.current?.focus();
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Backspace' && refProp?.current?.value === '') {
                    prevFocus?.current?.focus();
                }
            }}

            type="text"
            maxLength={1}
            className={classes}
            value={inputValue}
        />
    );
}
