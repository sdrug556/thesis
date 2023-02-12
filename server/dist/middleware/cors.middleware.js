"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
class CorsMiddleware {
    static cors() {
        return (0, cors_1.default)(CorsMiddleware.corsOptions);
    }
}
exports.CorsMiddleware = CorsMiddleware;
CorsMiddleware.corsOptions = {
    origin: [
        'http://localhost:4200',
        'http://localhost:4201',
        'http://localhost:4202',
        'http://localhost:4204',
        'http://localhost:4205',
        'http://localhost:4206',
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:8082',
        'http://localhost:8083',
        'http://localhost:8084',
        'http://localhost:8085',
    ],
    optionsSuccessStatus: 204,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
