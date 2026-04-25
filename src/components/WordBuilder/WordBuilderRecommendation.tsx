import type {Dispatch, SetStateAction} from "react";

interface CreateWordRecommendationType {
    word: string;
    setWord: Dispatch<SetStateAction<string>>;
    selectWord: (word: string) => Promise<void>;
}

export default function WordBuilderRecommendation({word, setWord, selectWord}: CreateWordRecommendationType) {
    return <>
        <p onMouseDown={async () => {
            setWord(word);
            await selectWord(word);
        }}>{word}</p>
    </>;
}