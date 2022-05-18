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
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
exports.resolvers = {
    AllPeople: {
        results: (parent) => {
            const promises = parent.results.map((person) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield axios_1.default.get(person.url);
                return response.data;
            }));
            return Promise.all(promises);
        },
    },
    Person: {
        films: (parent) => {
            const promises = parent.films.map((url) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield axios_1.default.get(url);
                return response.data;
            }));
            return Promise.all(promises);
        },
    },
    Query: {
        getPerson: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${id}`);
            return response.data;
        }),
        getAllPeople: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.dev/api/people`);
            return response.data;
        }),
        getPeople: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.dev/api/people`);
            return response.data.results;
        }),
        getNextPrevPage: (_, { url }) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url);
            return response.data;
        }),
        searchPerson: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.dev/api/people/?search=${name}`);
            //get people
            const peopleArray = yield response.data.results;
            return peopleArray;
        }),
    },
};
