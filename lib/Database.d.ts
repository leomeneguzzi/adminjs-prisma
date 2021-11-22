import { PrismaClient } from '@prisma/client';
import { BaseDatabase } from 'adminjs';
import { Resource } from './Resource';
export declare class Database extends BaseDatabase {
    readonly prisma: PrismaClient;
    private client;
    constructor(prisma: PrismaClient);
    resources(): Array<Resource>;
    static isAdapterFor(prisma: PrismaClient): boolean;
}
