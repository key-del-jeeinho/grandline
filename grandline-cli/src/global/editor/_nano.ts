import { spawn } from "child_process";

export async function open(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const nanoProcess = spawn('nano', [path], {stdio: 'inherit'});
        nanoProcess.on('close', (code) => {
            if(code === 0) resolve();
            else reject(new Error(`nano process exited with code ${code}`));
        });
    });
}