import { DMMF } from '@prisma/client/runtime';
import { Filter } from 'adminjs';
import { Property } from '../Property';
export declare const convertParam: (property: Property, fields: DMMF.Model['fields'], value: string | boolean | number | Record<string, any> | null | undefined) => string | boolean | number | Record<string, any> | null | undefined;
export declare const convertFilter: (modelFields: DMMF.Model['fields'], filterObject?: Filter | undefined) => Record<string, any>;
