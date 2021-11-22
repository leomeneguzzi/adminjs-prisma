"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const adminjs_1 = require("adminjs");
const data_types_1 = require("./utils/data-types");
class Property extends adminjs_1.BaseProperty {
    constructor(column, columnPosition = 0, enums) {
        const path = column.name;
        super({ path });
        this.column = column;
        this.enums = enums;
        this.columnPosition = columnPosition;
    }
    isEditable() {
        return !this.isId() && this.column.name !== 'createdAt' && this.column.name !== 'updatedAt';
    }
    isId() {
        return !!this.column.isId;
    }
    name() {
        return this.column.name;
    }
    isRequired() {
        return this.column.isRequired;
    }
    isSortable() {
        return this.type() !== 'reference';
    }
    reference() {
        const isRef = this.column.kind !== 'scalar' && !!this.column.relationName;
        if (isRef) {
            return this.column.type;
        }
        return null;
    }
    referencedColumnName() {
        var _a, _b;
        if (!this.reference())
            return null;
        return (_b = (_a = this.column.relationToFields) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    foreignColumnName() {
        var _a, _b;
        if (!this.reference())
            return null;
        return (_b = (_a = this.column.relationFromFields) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    availableValues() {
        var _a;
        if (!this.isEnum())
            return null;
        const enumSchema = this.enums[this.column.type];
        if (!enumSchema)
            return null;
        return (_a = enumSchema.values.map((value) => String(value))) !== null && _a !== void 0 ? _a : [];
    }
    position() {
        return this.columnPosition || 0;
    }
    isEnum() {
        return this.column.kind === 'enum';
    }
    type() {
        let type = data_types_1.DATA_TYPES[this.column.type];
        if (this.reference()) {
            type = 'reference';
        }
        if (this.isEnum()) {
            type = 'string';
        }
        // eslint-disable-next-line no-console
        if (!type) {
            console.warn(`Unhandled type: ${this.column.type}`);
        }
        return type;
    }
}
exports.Property = Property;
//# sourceMappingURL=Property.js.map