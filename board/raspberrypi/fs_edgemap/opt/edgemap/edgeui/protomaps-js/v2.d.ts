import { Cache, Header, RangeResponse, Source } from "./index";
export declare const shift: (n: number, shift: number) => number;
export declare const unshift: (n: number, shift: number) => number;
export declare const getUint24: (view: DataView, pos: number) => number;
export declare const getUint48: (view: DataView, pos: number) => number;
interface Zxy {
    z: number;
    x: number;
    y: number;
}
export interface EntryV2 {
    z: number;
    x: number;
    y: number;
    offset: number;
    length: number;
    isDir: boolean;
}
export declare const queryLeafdir: (view: DataView, z: number, x: number, y: number) => EntryV2 | null;
export declare const queryTile: (view: DataView, z: number, x: number, y: number) => {
    z: number;
    x: number;
    y: number;
    offset: number;
    length: number;
    isDir: boolean;
} | null;
export declare const parseEntry: (dataview: DataView, i: number) => EntryV2;
export declare const sortDir: (a: ArrayBuffer) => ArrayBuffer;
export declare const createDirectory: (entries: EntryV2[]) => ArrayBuffer;
export declare const deriveLeaf: (view: DataView, tile: Zxy) => Zxy | null;
declare function getHeader(source: Source): Promise<Header>;
declare function getZxy(header: Header, source: Source, cache: Cache, z: number, x: number, y: number, signal?: AbortSignal): Promise<RangeResponse | undefined>;
declare const _default: {
    getHeader: typeof getHeader;
    getZxy: typeof getZxy;
};
export default _default;
