import { readJSON, writeJson, pathExists, ensureDir } from 'fs-extra'
import _path = require('path');

export async function write(
    path: string,
    json: any
): Promise<void> {
    const directoryPath = _path.dirname(path);
    await ensureDir(directoryPath)
    return writeJson(path, json, {
        encoding: 'utf-8',
        spaces: 2,
        EOL: '\n',
    })
}

export async function read(
    path: string
): Promise<any> {
    return readJSON(path, {
        encoding: 'utf-8',
    })
}

export async function exists(
    path: string
): Promise<boolean> {
    return pathExists(path)
}