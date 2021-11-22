"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const adminjs_1 = require("adminjs");
const Resource_1 = require("./Resource");
class Database extends adminjs_1.BaseDatabase {
    constructor(prisma) {
        super(prisma);
        this.prisma = prisma;
        this.client = prisma;
    }
    resources() {
        const dmmf = this.client._dmmf;
        const { modelMap } = dmmf;
        if (!modelMap)
            return [];
        return Object.values(modelMap).map((model) => {
            const resource = new Resource_1.Resource({ model, client: this.client });
            return resource;
        });
    }
    static isAdapterFor(prisma) {
        var _a;
        const dmmf = prisma._dmmf;
        return !!(dmmf === null || dmmf === void 0 ? void 0 : dmmf.modelMap) && !!Object.values((_a = dmmf === null || dmmf === void 0 ? void 0 : dmmf.modelMap) !== null && _a !== void 0 ? _a : {}).length;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map