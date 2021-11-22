import { BaseResource, Filter, BaseRecord } from 'adminjs';
import { PrismaClient } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';
import { Property } from './Property';
export declare class Resource extends BaseResource {
    private client;
    private model;
    private enums;
    private manager;
    private propertiesObject;
    constructor(args: {
        model: DMMF.Model;
        client: PrismaClient;
    });
    databaseName(): string;
    databaseType(): string;
    id(): string;
    properties(): Array<Property>;
    property(path: string): Property | null;
    build(params: Record<string, any>): BaseRecord;
    count(filter: Filter): Promise<number>;
    find(filter: Filter, params?: Record<string, any>): Promise<Array<BaseRecord>>;
    findOne(id: string | number): Promise<BaseRecord | null>;
    findMany(ids: Array<string | number>): Promise<Array<BaseRecord>>;
    create(params: Record<string, any>): Promise<Record<string, any>>;
    update(pk: string | number, params?: Record<string, any>): Promise<Record<string, any>>;
    delete(id: string | number): Promise<void>;
    static isAdapterFor(args: {
        model: DMMF.Model;
        client: PrismaClient;
    }): boolean;
    private prepareProperties;
    private prepareParams;
    private prepareReturnValues;
}
