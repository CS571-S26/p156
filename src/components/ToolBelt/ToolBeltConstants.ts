export const TOOL_BELT_STRIP_WIDTH_VW = 2;

const vwToPx = (vw: number) => vw / 100 * window.innerWidth;

export const TOOL_BELT_MAX_SIZE = () => window.innerWidth - vwToPx(TOOL_BELT_STRIP_WIDTH_VW);
export const TOOL_BELT_MIN_SIZE = () => (window.innerWidth - vwToPx(TOOL_BELT_STRIP_WIDTH_VW)) * 0.3;