"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unhandled extends Error {
    constructor(value) {
        super(message_for_unhandled(value));
        this.value = value;
    }
}
exports.Unhandled = Unhandled;
function message_for_unhandled(value) {
    if (value.abstract_class_name) {
        let message = `unhandled class of abstract class ${value.abstract_class_name}: ${value.constructor.name}\n` +
            `value: ${JSON.stringify(value, null, 2)}\n`;
        return message;
    }
    else {
        let message = `unhandled class (no abstract_class_name): ${value.constructor.name}\n` +
            `value: ${JSON.stringify(value, null, 2)}\n`;
        return message;
    }
}
