"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContext = void 0;
function setContext(dto, headers) {
    const accessToken = headers['access-token'];
    return Object.assign(Object.assign({}, dto), { accessToken });
}
exports.setContext = setContext;
//# sourceMappingURL=set-context.utils.js.map