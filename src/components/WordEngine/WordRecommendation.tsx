import {useToolBeltActions} from "../../context/ToolBelt/ToolBeltHooks.ts";

interface WordRecommendationProps {
    word: string;
}

export default function WordRecommendation({word}: WordRecommendationProps) {
    const {openWord} = useToolBeltActions();
    return <>
        <p onClick={() => openWord(word)}>
            {word}
        </p>
    </>;
}