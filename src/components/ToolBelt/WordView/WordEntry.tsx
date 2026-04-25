import type {DictionaryWordEntryType} from "../../../api/types/dictionary.ts";
import {useState} from "react";
import WordModal from "./WordModal.tsx";

interface WordEntryProps {
    entry: DictionaryWordEntryType;
}

export default function WordEntry({entry}: WordEntryProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return <>
        <div style={{display: "flex", flexDirection: "column", backgroundColor: "cornsilk"}}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
             onClick={() => setIsModalOpen(true)}
        >
            <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                <p>{entry.partOfSpeech}</p>
                <p>formality</p>
                <p>register</p>
                <p>domain</p>
                <p>currency</p>
            </div>
            <p>{entry.definition}</p>
            {(isHovering && entry.example) && <p>{entry.example}</p>}
        </div>
        {isModalOpen && <WordModal entry={entry} setIsModalOpen={setIsModalOpen}/>}
    </>;
}