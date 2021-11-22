"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
const adminjs_1 = require("adminjs");
const Property_1 = require("./Property");
const helpers_1 = require("./utils/helpers");
const converters_1 = require("./utils/converters");
class Resource extends adminjs_1.BaseResource {
    constructor(args) {
        super(args);
        const { model, client } = args;
        this.model = model;
        this.client = client;
        this.enums = this.client._dmmf.enumMap;
        this.manager = this.client[(0, helpers_1.lowerCase)(model.name)];
        this.propertiesObject = this.prepareProperties();
    }
    databaseName() {
        return 'prisma';
    }
    databaseType() {
        var _a;
        return (_a = this.client._engineConfig.activeProvider) !== null && _a !== void 0 ? _a : 'database';
    }
    id() {
        return this.model.name;
    }
    properties() {
        return [...Object.values(this.propertiesObject)];
    }
    property(path) {
        var _a;
        return (_a = this.propertiesObject[path]) !== null && _a !== void 0 ? _a : null;
    }
    build(params) {
        return new adminjs_1.BaseRecord(adminjs_1.flat.unflatten(params), this);
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.manager.count({ where: (0, converters_1.convertFilter)(this.model.fields, filter) });
        });
    }
    find(filter, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, offset = 0, sort = {} } = params;
            const { direction, sortBy } = sort;
            const results = yield this.manager.findMany({
                where: (0, converters_1.convertFilter)(this.model.fields, filter),
                skip: offset,
                take: limit,
                orderBy: {
                    [sortBy]: direction,
                },
            });
            return results.map((result) => new adminjs_1.BaseRecord(this.prepareReturnValues(result), this));
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProperty = this.properties().find((property) => property.isId());
            if (!idProperty)
                return null;
            const result = yield this.manager.findUnique({
                where: {
                    [idProperty.path()]: (0, converters_1.convertParam)(idProperty, this.model.fields, id),
                },
            });
            return new adminjs_1.BaseRecord(this.prepareReturnValues(result), this);
        });
    }
    findMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProperty = this.properties().find((property) => property.isId());
            if (!idProperty)
                return [];
            const results = yield this.manager.findMany({
                where: {
                    [idProperty.path()]: {
                        in: ids.map((id) => (0, converters_1.convertParam)(idProperty, this.model.fields, id)),
                    },
                },
            });
            return results.map((result) => new adminjs_1.BaseRecord(this.prepareReturnValues(result), this));
        });
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const preparedParams = this.prepareParams(params);
            const result = yield this.manager.create({ data: preparedParams });
            return this.prepareReturnValues(result);
        });
    }
    update(pk, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProperty = this.properties().find((property) => property.isId());
            if (!idProperty)
                return {};
            const preparedParams = this.prepareParams(params);
            const result = yield this.manager.update({
                where: {
                    [idProperty.path()]: (0, converters_1.convertParam)(idProperty, this.model.fields, pk),
                },
                data: preparedParams,
            });
            return this.prepareReturnValues(result);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProperty = this.properties().find((property) => property.isId());
            if (!idProperty)
                return;
            yield this.manager.delete({
                where: {
                    [idProperty.path()]: (0, converters_1.convertParam)(idProperty, this.model.fields, id),
                },
            });
        });
    }
    static isAdapterFor(args) {
        const { model, client } = args;
        return !!(model === null || model === void 0 ? void 0 : model.name) && !!(model === null || model === void 0 ? void 0 : model.fields.length) && !!(client === null || client === void 0 ? void 0 : client[(0, helpers_1.lowerCase)(model.name)]);
    }
    prepareProperties() {
        const { fields = [] } = this.model;
        return fields.reduce((memo, field) => {
            var _a;
            if (field.isReadOnly || (field.relationName && !((_a = field.relationFromFields) === null || _a === void 0 ? void 0 : _a.length))) {
                return memo;
            }
            const property = new Property_1.Property(field, Object.keys(memo).length, this.enums);
            memo[property.path()] = property;
            return memo;
        }, {});
    }
    prepareParams(params) {
        const preparedParams = {};
        for (const property of this.properties()) {
            const param = adminjs_1.flat.get(params, property.path());
            const key = property.path();
            // eslint-disable-next-line no-continue
            if (param === undefined)
                continue;
            const type = property.type();
            const foreignColumnName = property.foreignColumnName();
            if (type === 'reference' && foreignColumnName) {
                preparedParams[foreignColumnName] = (0, converters_1.convertParam)(property, this.model.fields, param);
                // eslint-disable-next-line no-continue
                continue;
            }
            if (property.isArray()) {
                preparedParams[key] = param ? param.map((p) => (0, converters_1.convertParam)(property, this.model.fields, p)) : param;
            }
            else {
                preparedParams[key] = (0, converters_1.convertParam)(property, this.model.fields, param);
            }
        }
        return preparedParams;
    }
    prepareReturnValues(params) {
        const preparedValues = {};
        for (const property of this.properties()) {
            const param = adminjs_1.flat.get(params, property.path());
            const key = property.path();
            if (param !== undefined && property.type() !== 'reference') {
                preparedValues[key] = param;
                // eslint-disable-next-line no-continue
                continue;
            }
            const foreignColumnName = property.foreignColumnName();
            // eslint-disable-next-line no-continue
            if (!foreignColumnName)
                continue;
            preparedValues[key] = params[foreignColumnName];
        }
        return preparedValues;
    }
}
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map