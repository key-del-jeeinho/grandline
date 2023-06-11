import { ensureDir, pathExists, readFile, writeFile } from "fs-extra";
import _path = require("path");

export async function write(path: string, md: any): Promise<void> {
    const directoryPath = _path.dirname(path);
    await ensureDir(directoryPath)
    return writeFile(path, md)
}

export async function read(path: string): Promise<any> {
    return readFile(path)
}

export async function exists(path: string): Promise<boolean> {
    return pathExists(path)
}