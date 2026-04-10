import {useContext} from "react";
import {ToolBeltActionsContext, ToolBeltTabContext, ToolBeltUIContext} from "./ToolBeltContext.tsx";

export function useToolBeltUI() {
    const context = useContext(ToolBeltUIContext);
    if (!context) throw new Error("useToolBeltUI must be used within ToolBeltProvider");
    return context;
}

export function useToolBeltTab() {
    const context = useContext(ToolBeltTabContext);
    if (!context) throw new Error("useToolBeltTab must be used within ToolBeltProvider");
    return context;
}

export function useToolBeltActions() {
    const context = useContext(ToolBeltActionsContext);
    if (!context) throw new Error("useToolBeltActions must be used within ToolBeltProvider");
    return context;
}