import type {PathType} from "~/generate/types/routingTypes";
import {getIsoCodeFromLocale} from "./locale";
import type {MinimizedPublicationType} from "~/core/types/publicationsTypes";

export const electionSlugs: Record<string, string> = {
    de: `wahlen${process.env.ELECTION_YEAR}`,
    it: `elezioni${process.env.ELECTION_YEAR}`,
    fr: `elections${process.env.ELECTION_YEAR}`,
    rm: `elecziuns${process.env.ELECTION_YEAR}`,
    en: `elections${process.env.ELECTION_YEAR}`,
};

export const safeName = (name: string): string => {
    // Remove all CDM chars (https://en.wikipedia.org/wiki/Combining_Diacritical_Marks)
    name = name.normalize("NFD").replace(/[\u0300-\u036F]/g, "");

    return (
        name
            .toLowerCase()
            // replace spaces with dashes
            .replace(/\s/g, "-")
            // replace multiple dashes with one
            .replace(/(?:-)+/g, "-")
            // replace special characters with a dash
            .replace(/(,|'|‘|’|\(|\))+/g, "-")
            // Replace ? with nothing
            .replace(/\?/g, "")
            // Replace . with nothing
            .replace(/\./g, "")
            .replace(/"/g, "")
            .replace(/:/g, "")
    );
};

export const makeNavigationPath = (path: { label: string }[]): string => {
    return path.map((entry) => safeName(entry.label)).join("/");
};

export const makeSlug = (title: string): string => {
    const slug = safeName(title);

    return slug;
};

export const buildUrlFromPublication = (
    publication: MinimizedPublicationType | undefined,
    path: PathType[] = [],
    isElection: boolean = false
): string => {
    if (!publication) {
        return "";
    }
    if (publication.metadata.language.locale) {
        const language = publication.metadata.language.locale;
        const isoCode = getIsoCodeFromLocale(language);

        const electionPath = isElection ? electionSlugs[isoCode] + "/" : "";
        if (!publication.metadata.title) {
            publication.metadata.title = "No-Title";
        }

        const slug = makeSlug(publication.metadata.title);
        let url;
        if (path && path.length > 0) {
            const navigationPath = makeNavigationPath(path);
            url = `/${isoCode}/${electionPath}${navigationPath}`;
        } else {
            url = `/${isoCode}/${electionPath}${slug}`;
        }

        // Remove any colons from the URL
        return url.replace(/:/g, "");
    }
    return "/"
};