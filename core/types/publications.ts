type Design = { name: string; version: string };
type Language = { label: string; locale: string; groupId: string };

export interface CarouselContent {
  component: string;
  identifier: string;
  id: string;
  content: {
    link?: {
      params: {
        link: {
          $ref: string;
          reference: {
            id: string;
          };
        };
      };
      service: string;
    };
    image?: {
      url: string;
      width: number;
      height: number;
      mediaId: string;
      mimeType: string;
      originalUrl: string;
      imageService: string;
    };
    title?: string;
    text?: string;
  };
}

export interface CarouselContainer {
  component: string;
  identifier: string;
  id: string;
  content: {
    link?: {
      params: {
        link: {
          $ref: string;
          reference: {
            id: string;
          };
        };
      };
      service: string;
    };
    image?: {
      url: string;
      width: number;
      height: number;
      mediaId: string;
      mimeType: string;
      originalUrl: string;
      imageService: string;
    };
    title?: string;
    text?: string;
  };
}

export interface Carousel {
  component: string;
  identifier: string;
  id: string;
  content: {
    link?: {
      params: {
        link: {
          $ref: string;
          reference: {
            id: string;
          };
        };
      };
      service: string;
    };
  };
  styles: {
    "carousel-color": string;
  };
  containers: {
    "carousel-content": CarouselContent[];
  };
}
interface Content extends PublicationComponent {
  containers: {
    left: PublicationContainerComponent[] | [];
    right: PublicationContainerComponent[] | [];
  };
}

export interface PublicationContainerComponent extends PublicationComponent {
  containers: {
    carousel: Carousel[];
  };
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
