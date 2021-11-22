import { DMMF } from '@prisma/client/runtime';
import { BaseProperty, PropertyType } from 'adminjs';
import { Enums } from './types';
export declare class Property extends BaseProperty {
    private column;
    private enums;
    private columnPosition;
    constructor(column: DMMF.Field, columnPosition: number | undefined, enums: Enums);
    isEditable(): boolean;
    isId(): boolean;
    name(): string;
    isRequired(): boolean;
    isSortable(): boolean;
    reference(): string | null;
    referencedColumnName(): string | null;
    foreignColumnName(): string | null;
    availableValues(): Array<string> | null;
    position(): number;
    isEnum(): boolean;
    type(): PropertyType;
}
