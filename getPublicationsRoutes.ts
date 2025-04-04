import { buildUrlFromPublication } from "./utils/url";
import type { MenuNode, MenuResponse, PathType } from "./generate/types/routingTypes";
import type { NuxtPage } from "nuxt/schema";
import { getKeyedPublications } from "./generate/store/publicationStore";

type ElectionPathPrefixKey =
    | "wahlen-de"
    | "wahlen-fr"
    | "wahlen-it"
    | "wahlen-rm"
    | "wahlen-en";
const routes: NuxtPage[] = [];

export default async (menus: MenuResponse[]) => {
    const keyedPublications = await getKeyedPublications();

    const electionPathPrefixes = {
        "wahlen-de": `wahlen${process.env.ELECTION_YEAR}`,
        "wahlen-fr": `elections${process.env.ELECTION_YEAR}`,
        "wahlen-it": `elezioni${process.env.ELECTION_YEAR}`,
        "wahlen-rm": `elecziuns${process.env.ELECTION_YEAR}`,
        "wahlen-en": `elections${process.env.ELECTION_YEAR}`,
    };

    const addPublicationToRoutes = (
        documentId: string,
        path: PathType[],
        isElection?: boolean
    ): NuxtPage | null => {
        if (!keyedPublications) return null;
        const publication = keyedPublications[documentId];
        const url = buildUrlFromPublication(publication, path);

        if (publication === undefined) return null;

        return {
            name: publication?.metadata?.title || "",
            path: url,
            file: `${__dirname}/pages/publication.vue`,

            meta: {
                id: documentId,
                isElection: isElection,
                contentType: publication?.systemdata?.contentType || "",

                groupId: {
                    id: (publication?.metadata?.language?.groupId as string) || "",
                    language: publication?.metadata?.language?.locale,
                },
            },
        };
    };

    function crawlMenu(
        nodes: MenuNode[],
        path: PathType[],
        isElection: boolean
    ) {
        const stack = [{ nodes, path }];

        while (stack.length > 0) {
            const { nodes, path } = stack.pop()!;
            for (const entry of nodes) {
                const pathEntry: PathType[] = path.concat([entry])
                if (entry.nodes && entry.nodes.length > 0) {
                    stack.push({ nodes: entry.nodes, path: pathEntry });
                } else {
                    const documentId = entry.documentId;
                    const route = addPublicationToRoutes(
                        documentId as string,
                        pathEntry,
                        isElection
                    );
                    if (route) {
                        routes.unshift(route);
                    }
                }
            }
        }
    }

    for (const menu of menus) {
        const key = menu.label.includes("wahlen")
            ? menu.label
            : "" as string;

        const prefix = key ? electionPathPrefixes[key as keyof typeof electionPathPrefixes] : undefined;
        const isElection = !!prefix;
        const path: PathType[] = prefix
            ? [{ label: prefix, id: "", nodes: [], type: "", documentId: undefined }]
            : [];

        crawlMenu(menu.nodes, path, isElection);
    }
    
    if (keyedPublications) {
        Object.keys(keyedPublications).forEach(documentId => {
            const publication = keyedPublications[documentId];

            const existingRoute = routes.find(route => route?.meta?.id === documentId);

            if (!existingRoute && publication.systemdata.contentType === "page") {
                const route = addPublicationToRoutes(
                    documentId,
                    [],
                    false
                );

                if (route) {
                    routes.push(route);
                }
            }
        });
    }
    return routes;
};