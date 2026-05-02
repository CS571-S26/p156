import {WordEngine} from "../components/WordEngine/WordEngine.tsx";
import {useUrlBoolean} from "../hooks/useUrlBoolean.ts";
import {Modal} from "../ui/Modal/Modal.tsx";

export default function HomePage() {
    const [value, setValue] = useUrlBoolean("build");

    function onClose() {
        setValue(false);
    }

    return <>
        <button onClick={() => setValue(true)}>Open modal</button>
        <Modal isOpen={value} onClose={onClose} ariaLabelledBy="Testing">
            <p id="Testing">Hello</p>
        </Modal>

        <WordEngine></WordEngine>
    </>;
}