"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = void 0;
const users = [
    {
        id: 1,
        name: 'Anonymous',
        email: 'cyber@sec.com',
        password: '12345678',
    }
];
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}
function isCorrectPassword(user, password) {
    return user.password === password;
}
exports.userDb = {
    getUserByEmail,
    isCorrectPassword,
};
//# sourceMappingURL=user.db.js.map