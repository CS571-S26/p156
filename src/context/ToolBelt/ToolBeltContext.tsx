import {createContext} from "react";
import type {
    ToolBeltUIContextType,
    ToolBeltTabContextType,
    ToolBeltActionsContextType,
} from "./types.ts";

export const ToolBeltUIContext = createContext<ToolBeltUIContextType | null>(null);
export const ToolBeltTabContext = createContext<ToolBeltTabContextType | null>(null);
export const ToolBeltActionsContext = createContext<ToolBeltActionsContextType | null>(null);

