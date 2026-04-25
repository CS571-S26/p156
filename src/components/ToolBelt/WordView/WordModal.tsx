import "./WordView.css";
import {createPortal} from "react-dom";
import type {DictionaryWordEntryType} from "../../../api/types/dictionary.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import WordHeader from "./WordHeader.tsx";

interface WordModalProps {
    entry: DictionaryWordEntryType;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MAX_DEFINITION_LENGTH = 500;
const MAX_EXAMPLE_LENGTH = 500;

export default function WordModal({entry, setIsModalOpen}: WordModalProps) {
    const [definition, setDefinition] = useState(entry.definition);
    const [example, setExample] = useState(entry.example);
    return createPortal(
        <>
            <div className="wordview-modal-backdrop">
            </div>
            <div className="wordview-modal">
                <WordHeader></WordHeader>
                <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                    <p>{entry.partOfSpeech}</p>
                    {entry.chips.map(chip => {
                        return <p>{chip.category} {chip.label}</p>;
                    })}
                </div>
                <p>Definition:</p>
                <textarea
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    maxLength={MAX_DEFINITION_LENGTH}
                />
                <p>Example:</p>
                <textarea
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    maxLength={MAX_EXAMPLE_LENGTH}
                />
                <button onClick={() => setIsModalOpen(false)}>x</button>
                <button>save</button>
            </div>

        </>,
        document.body
    );
}