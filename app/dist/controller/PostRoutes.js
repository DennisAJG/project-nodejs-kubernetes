"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controller/PostController");
const router = (0, express_1.Router)();
router.get("/posts", PostController_1.PostController.getAllPosts);
exports.default = router;
