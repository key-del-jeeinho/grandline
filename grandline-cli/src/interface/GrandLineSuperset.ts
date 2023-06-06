import { version } from "../../package.json";

interface GrandLineSubset {
    _grandline_version: string,
    _grandline_active: boolean,
}

export function GrandLineSuperset<T>(obj: T, _version?: string, isActive?: boolean): T & GrandLineSubset {
    return {
        _grandline_version: _version??version,
        _grandline_active: isActive??true,
        ...obj,
    }
}

export type GrandLineSuperset<T> = T & GrandLineSubset