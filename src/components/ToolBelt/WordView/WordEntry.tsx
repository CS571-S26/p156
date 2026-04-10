import type {DictionaryWordEntryType} from "../../../api/types/dictionary.ts";

interface WordEntryProps {
    entry: DictionaryWordEntryType;
}

export default function WordEntry({entry}: WordEntryProps) {
    return <>
        <div style={{display: "flex", gap: 10}}>
            <p>{entry.partOfSpeech}</p>
            <p>{entry.definition}</p>
        </div>
    </>;
}