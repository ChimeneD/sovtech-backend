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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("../schema/schema");
const resolver_1 = require("../resolver/resolver");
const PORT = process.env.PORT || 4000;
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //creating express app
        const app = (0, express_1.default)();
        app.use(express_1.default.static('public'));
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: '*',
        }));
        app.get('/', (req, res) => {
            res.send('/index.html');
        });
        //creating apollo server
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolver_1.resolvers,
            csrfPrevention: true,
            //grahpqli: true,
            formatError: (error) => {
                return error;
            },
            context: ({ req, res }) => {
                return {
                    req,
                    res,
                };
            },
        });
        yield server.start();
        server.applyMiddleware({
            app,
            cors: {
                origin: '*',
            },
            path: '/graphql',
        });
        app.listen(PORT, () => {
            console.log(`🚀 server started on  http://localhost:${PORT}`);
        });
    });
}
startApolloServer();
