export interface InquireOverwriteProjectCase {
    inquireOverwriteProject(): Promise<boolean>
}

export const InquireOverwriteProjectCase = Symbol.for("InquireOverwriteProjectCase")