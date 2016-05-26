export interface IFilter {
    getKeys(): string[];
    getOperandsForKey(key: string): { 'operands': string[], 'isMulti': boolean };
    getValueTypeForKey(key: string): string;
    addRow(): void;
}
