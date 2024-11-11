interface FormulaModalWindowData {
    isShown: boolean;
    rowFormula: string;
    setRowFormula: (formula: string) => void;
}

interface ShowModalFunc {
    (formula: string, setFormula: (formula: string) => void): void;
}

interface ResponseData {
    message?: string;
    error?: string;
}

export type {
    FormulaModalWindowData,
    ShowModalFunc,
    ResponseData
}