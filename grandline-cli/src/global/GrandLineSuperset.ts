import { idl_version } from "../../package.json";

interface GrandLineSubset {
    _grandline_version: string,
    _grandline_active: boolean,
}

export function GrandLineSuperset<T>(obj: T, _idl_version?: string, isActive?: boolean): T & GrandLineSubset {
    return {
        _grandline_version: _idl_version??idl_version,
        _grandline_active: isActive??true,
        ...obj,
    }
}

export type GrandLineSuperset<T> = T & GrandLineSubset