"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var port = process.env.PORT || 3000;
app.get('/helloworld', function (req, res) {
    res.status(200).send({ message: 'hello world' });
});
app.listen(port);
console.log('listening on port' + port);
