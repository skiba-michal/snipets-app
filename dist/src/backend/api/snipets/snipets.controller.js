"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnipptsCategories = exports.snipetCreate = exports.categoriesCreate = void 0;
const _utils_1 = require("@utils");
const _schemas_1 = require("@schemas");
const categoriesCreate = (req, res, next) => {
    const body = req.body;
    const currentDate = new Date();
    const currentDateFormated = currentDate.toISOString().substring(0, 10);
    const isLanguageCorrect = (0, _utils_1.validateString)(body.language, { maxLenght: 100 });
    const isNameCorrect = (0, _utils_1.validateString)(body.name, { maxLenght: 100, minLenght: 3, basicCharactersOnly: true });
    if (!isLanguageCorrect || !isNameCorrect) {
        const error = new Error(_utils_1.errorMessages.incorectData);
        error.statusCode = 422;
        throw error;
    }
    const data = {
        name: body.name,
        language: body.language,
        html: !!body.html,
        css: !!body.css,
        children: [],
        createdBy: {
            userId: req.userId,
            userName: req.userName,
            date: currentDateFormated,
        },
    };
    const category = new _schemas_1.SnipetCategoryModel(data);
    category
        .save()
        .then(() => {
        const response = {
            message: _utils_1.succesMessages.categoryCreated,
            data: null,
        };
        res.status(201).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.categoriesCreate = categoriesCreate;
const snipetCreate = (req, res, next) => {
    const body = req.query;
    const currentDate = new Date();
    const currentDateFormated = currentDate.toISOString().substring(0, 10);
    _schemas_1.SnipetCategoryModel.findOne({ _id: body.categoryId }).then(category => {
        if (!category) {
            const error = new Error(_utils_1.errorMessages.categoryNotFound);
            error.statusCode = 401;
            throw error;
        }
        const categoryChildren = category.children;
        const data = {
            name: body.name,
            categoryData: {
                id: body.categoryId,
                name: category.name,
            },
            createdBy: {
                userId: req.userId,
                userName: req.userName,
                date: currentDateFormated,
            },
        };
        const snipet = new _schemas_1.SnipetModel(data);
        let createdSnipedId = "";
        snipet
            .save()
            .then(snipedData => {
            createdSnipedId = snipedData._id.valueOf();
            categoryChildren.push({
                name: body.name,
                id: createdSnipedId,
            });
            _schemas_1.SnipetCategoryModel.updateOne({ _id: body.categoryId }, {
                $set: {
                    children: categoryChildren,
                },
            })
                .then(() => {
                const response = {
                    message: _utils_1.succesMessages.snipetCreated,
                    data: null,
                };
                res.status(200).json(response);
            })
                .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    });
};
exports.snipetCreate = snipetCreate;
const getSnipptsCategories = (_req, res, next) => {
    _schemas_1.SnipetCategoryModel.find({})
        .then(snipets => {
        const response = {
            message: "",
            data: snipets,
        };
        res.status(200).json(response);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getSnipptsCategories = getSnipptsCategories;
