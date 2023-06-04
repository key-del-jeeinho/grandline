import { readJSON, writeJson, pathExists } from 'fs-extra'

export async function write(
    path: string,
    json: any
) {
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