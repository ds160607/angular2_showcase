import { IFilter } from './ifilter.interface';

export class FilterRow {
    key: string;
    operand: string;
    value: string;
    filter: IFilter;

    constructor(filter: IFilter) {
        this.filter = filter;
    }
}
