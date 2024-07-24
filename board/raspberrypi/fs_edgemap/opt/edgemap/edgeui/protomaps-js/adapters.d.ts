import { PMTiles } from "./index";
/**
 * Add a raster PMTiles as a layer to a Leaflet map.
 *
 * For vector tiles see https://github.com/protomaps/protomaps-leaflet
 */
export declare const leafletRasterLayer: (source: PMTiles, options: unknown) => any;
type GetResourceResponse<T> = ExpiryData & {
    data: T;
};
type ExpiryData = {
    cacheControl?: string | null;
    expires?: string | null;
};
type RequestParameters = {
    url: string;
    headers?: unknown;
    method?: "GET" | "POST" | "PUT";
    body?: string;
    type?: "string" | "json" | "arrayBuffer" | "image";
    credentials?: "same-origin" | "include";
    collectResourceTiming?: boolean;
};
type ResponseCallbackV3 = (error?: Error | undefined, data?: unknown | undefined, cacheControl?: string | undefined, expires?: string | undefined) => void;
type V3OrV4Protocol = <T extends AbortController | ResponseCallbackV3, R = T extends AbortController ? Promise<GetResourceResponse<unknown>> : {
    cancel: () => void;
}>(requestParameters: RequestParameters, arg2: T) => R;
/**
 * MapLibre GL JS protocol. Must be added once globally.
 */
export declare class Protocol {
    tiles: Map<string, PMTiles>;
    constructor();
    add(p: PMTiles): void;
    get(url: string): PMTiles | undefined;
    tilev4: (params: RequestParameters, abortController: AbortController) => Promise<{
        data: {
            tiles: string[];
            minzoom: number;
            maxzoom: number;
            bounds: number[];
        };
        cacheControl?: undefined;
        expires?: undefined;
    } | {
        data: Uint8Array;
        cacheControl: string | undefined;
        expires: string | undefined;
    } | {
        data: Uint8Array;
        cacheControl?: undefined;
        expires?: undefined;
    } | {
        data: null;
        cacheControl?: undefined;
        expires?: undefined;
    }>;
    tile: V3OrV4Protocol;
}
export {};
