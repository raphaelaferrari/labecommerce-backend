"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004");
});
app.get('/ping', (req, res) => {
    res.send('Pong! Labbfsaf');
});
app.get("/user", (req, res) => {
    res.status(200).send("users");
});
app.get("/teste", (req, res) => {
    res.status(200).send("teste rapha");
});
//# sourceMappingURL=index.js.map