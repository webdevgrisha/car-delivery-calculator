interface FormulaModalWindowData {
    isShown: boolean;
    rowFormula: string;
    setRowFormula: (formula: string) => void;
}

interface ShowModalFunc {
    (formula: string, setFormula: (formula: string) => void): void;
}

export type {
    FormulaModalWindowData,
    ShowModalFunc
}