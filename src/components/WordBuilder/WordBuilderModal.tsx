import "./WordBuilder.css";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {DictionaryWordType} from "../../api/types/dictionary.ts";
import {WordBuilderHeader} from "./WordBuilderHeader.tsx";

interface WordModalProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function WordBuilderModal({setIsModalOpen}: WordModalProps) {
    const [word, setWord] = useState<string>("");
    const [dictionaryWord, setDictionaryWord] = useState<DictionaryWordType | null>(null);

    return <>
        <div className="word-builder-modal-backdrop">
            <div className="word-builder-modal">
                <WordBuilderHeader word={word} setWord={setWord} dictionaryWord={dictionaryWord}
                                   setDictionaryWord={setDictionaryWord}/>
                <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>
        </div>
    </>;
}