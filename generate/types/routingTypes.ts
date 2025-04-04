import type {RouteMeta} from "vue-router";

export interface MenuNode {
    id: string;
    label: string;
    nodes: MenuNode[];
    documentId?: string;
    type: "document" | "uri" | "";
    url?: string;
    uri?: string;
    target?: string;
    isExpanded?: boolean;
    children?: MenuResponseData[];
}

export interface PathType {
    id: string;
    label: string;
    nodes: PathType[] | [];
    documentId?: string;
    type: "document" | "uri" | "";
}

export type isElection = boolean;

export interface Menu {
    version: number;
    label: string;
    maxDepth: number;
    nodes: MenuNode[];
}

export interface MenuResponse {
    handle?: string; // Optional because it's not present in all objects
    version: number;
    label: string;
    maxDepth: number;
    nodes: MenuNode[];
}

export interface MenuResponse {
    data: MenuResponseData[];
}

export interface MenuResponseData {
    id: string;
    label: string;
    nodes: MenuResponseData[];
    documentId?: string;
    type: "document" | "uri";
    isExpanded?: boolean;
}

export interface ExtendedRouteMeta extends RouteMeta {
    id: string,
    isElection: boolean;
    contentType: string
    groupId: {
        id: string,
        language: string
    }
}