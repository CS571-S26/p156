import "./Chip.css";
import {type Dispatch, type SetStateAction, useRef, useState} from "react";
import {createChip} from "../../api/chipApi.ts";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

interface ChipModalProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChipModal({setIsModalOpen}: ChipModalProps) {
    const [color, setColor] = useState<string>("#ff0000");
    const [error, setError] = useState<string | null>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    async function onSubmitHandler(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!categoryRef.current?.value || !labelRef.current?.value) {
            return setError("Fields cannot be empty.");
        }
        const request = {
            "category": categoryRef.current.value,
            "label": labelRef.current.value,
            "color": color
        };
        try {
            await createChip(request);
            await queryClient.invalidateQueries({queryKey: ["chips"]});
            setIsModalOpen(false);
        } catch (error: any) {
            if (error.response.status == 409) {
                setError(`Chip with category: ${categoryRef.current.value} and label: ${labelRef.current.value} already exists.`);
            } else {
                navigate("/error");
            }
        }
    }

    return <>
        <div className="chip-modal-backdrop">
            <div className="chip-modal">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <label>Category</label><br/>
                    <input ref={categoryRef}/><br/>
                    <label>Label</label><br/>
                    <input ref={labelRef}/><br/>
                    <label>Color</label><br/>
                    <input type="color" value={color}
                           onChange={(e) => setColor(e.target.value)}
                    /><br/>
                    <input type="submit" value="Create"/>
                    <input type="button" value="X" onClick={() => setIsModalOpen(false)}/>
                </form>
                {error && <p>{error}</p>}
            </div>
            ;
        </div>
        ;
    </>
        ;
}