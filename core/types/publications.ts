import type {Carousel} from "~/components/HomeCarousel/types/types";
import type {RichtextComponent} from "~/core/types/contentComponents";

type Design = { name: string; version: string };
type Language = { label: string; locale: string; groupId: string };

interface Content extends PublicationComponent {
    containers: {
        left: PublicationContainerComponent[] | [];
        right: PublicationContainerComponent[] | [];
        body: RichtextComponent[] | [];
    };
}

export interface PublicationContainerComponent extends PublicationComponent {
    containers: {
        carousel: Carousel[];
        infobox: InfoBox[]
    };
}

export interface InfoBoxComponent {
    id: string;
    type: string;
    content: InfoBox;
}

export interface InfoBox {
    id: string;
    content: {
        content: {
            text: string;
        }
    }
}

export interface Link {
    params: {
        link: {
            $ref: string;
            reference: { id: string };
        };
    };
    service: string;
}

export interface PublicationComponent {
    component: string;
    indentifier: string;
    id: string;
    position?: string;
    content: {
        title?: string;
        text?: string;
        faq: FAQ
    };
}


export interface FAQ {
    service: "faq-teaser";
    params: {
        teaser: {
            $ref: "document";
            reference: {
                id: string;
            };
        };
    };
}

type teaserImage = string | undefined;

export interface SystemData {
    projectId: number;
    channelId: number;
    documentId: number;
    contentType: string;
    documentType: string;
    title: string;
    publicationId: number;
    firstPublicationDate: string;
    lastPublicationDate: string;
    updatedAt: string;
    significantPublicationDate: string;
    visiblePublicationDate: string;
    design: Design;
    layout: string;
}

export interface Metadata {
    twitterImage: any;
    openGraphImage: any;
    title: string;
    language: Language;
    description: string;
    canonical: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterCard: string;
    openGraphTitle: string;
    openGraphDescription: string;
    openGraphType: string;
    slug: string;
    seoRobots: string;
    teaserImage: teaserImage;
    "tag-category"?: {
        $ref: string;
        reference: {
            id: string;
        };
    };
}

export interface Publication {
    systemdata: SystemData;
    metadata: Metadata;
    content: Content[];
}

export type WrapFunction = (...args: any[]) => any;

export type MinimizedPublicationType = {
    metadata: { title: string; language: { locale: string } };
    systemdata: { documentId: number };
};

export interface PublicationOptions {
    offset: number;
    contentTypes?: string;
}