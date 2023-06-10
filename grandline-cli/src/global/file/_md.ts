import { pathExists, readFile, writeFile } from "fs-extra";

export async function write(path: string, md: any): Promise<void> {
    return writeFile(path, md)
}

export async function read(path: string): Promise<any> {
    return readFile(path)
}

export async function exists(path: string): Promise<boolean> {
    return pathExists(path)
}