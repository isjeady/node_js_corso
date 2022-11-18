import path from "path";
import fs from "fs";
import { __dirname } from "../app.js";

export const deleteImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};