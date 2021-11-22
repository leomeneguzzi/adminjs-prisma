import { DMMF } from '@prisma/client/runtime';
export declare type ModelManager = {
    [action in DMMF.ModelAction]: (...args: any[]) => Promise<any>;
};
export declare type Enums = {
    [key: string]: DMMF.SchemaEnum;
};
