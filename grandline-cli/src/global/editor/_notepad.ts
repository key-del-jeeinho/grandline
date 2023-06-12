import { spawn } from "child_process";

export async function open(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const nanoProcess = spawn('notepad', [path], {stdio: 'inherit'});
        nanoProcess.on('close', (code) => {
            if(code === 0) resolve();
            else reject(new Error(`notepad process exited with code ${code}`));
        });
    });
}