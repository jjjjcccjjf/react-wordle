import { useRef } from 'react';

import Input from './Input';

export default function Row() {
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);
    const inputRef4 = useRef<HTMLInputElement>(null);
    const inputRef5 = useRef<HTMLInputElement>(null);

    const handleEnter = () => {
        // Do something when the user presses Enter (optional)
    };

    const handleNextFocus = () => {
        // You can add additional logic here if needed
    };

    return (
        <div className="grid grid-flow-col gap-1 ">
            <Input prevFocus={inputRef1} nextFocus={inputRef2} refProp={inputRef1} />
            <Input prevFocus={inputRef1} nextFocus={inputRef3} refProp={inputRef2} />
            <Input prevFocus={inputRef2} nextFocus={inputRef4} refProp={inputRef3} />
            <Input prevFocus={inputRef3} nextFocus={inputRef5} refProp={inputRef4} />
            <Input prevFocus={inputRef4} nextFocus={inputRef5} refProp={inputRef5} /> {/* Handle Enter key */}
        </div>
    );
}
