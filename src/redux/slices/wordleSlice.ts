import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
type LettersType = [string, string, string, string, string]

interface WordleState {
    lettersInput: LettersType
}

// Define the initial state using that type
const initialState: WordleState = {
    lettersInput: ['', '', '', '', '',],
}

export const wordleSlice = createSlice({
    name: 'wordle',
    initialState,
    reducers: {
        setLettersInput: (state, action: PayloadAction<LettersType>) => {
            state.lettersInput = action.payload
        },
    },
})

export const { setLettersInput } = wordleSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default wordleSlice.reducer