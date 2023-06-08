export interface QueryGrandlineCase {
    exists(): Promise<boolean>
}

export const QueryGrandlineCase = Symbol.for("QueryGrandlineCase")