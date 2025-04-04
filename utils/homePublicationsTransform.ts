import type { Publication } from "~/core/types/publicationsTypes";
import path from "path";

export const getElectionLabel = (locale: string) => {
  switch (locale) {
    case "de":
      return `wahlen${process.env.ELECTION_YEAR}`;
    case "fr":
      return `elections${process.env.ELECTION_YEAR}`;
    case "it":
      return `elezioni${process.env.ELECTION_YEAR}`;
    case "rm":
      return `elecziuns${process.env.ELECTION_YEAR}`;
    case "en":
      return `elections${process.env.ELECTION_YEAR}`;
    default:
      return `wahlen${process.env.ELECTION_YEAR}`;
  }
};

const checkIsElection = (title: string, publication: Publication): boolean => {
  const electionKeywords = [
    `Wahlen ${process.env.ELECTION_YEAR}`,
    `Elections ${process.env.ELECTION_YEAR}`,
    `Elezioni ${process.env.ELECTION_YEAR}`,
    `Elecziuns ${process.env.ELECTION_YEAR}`,
    `Elezioni federali ${process.env.ELECTION_YEAR}`,
    `Élections fédérales ${process.env.ELECTION_YEAR}`,
    `Bundesratswahlen ${process.env.ELECTION_YEAR}`,
    `ch.ch elections ${process.env.ELECTION_YEAR}`,
  ];

  const titlesToCheck = [
    publication?.systemdata?.title || '',
    publication?.metadata?.title || '',
    title
  ];

  const isElection = titlesToCheck.some(checkTitle => 
    electionKeywords.some(keyword => checkTitle.includes(keyword))
  );

  return isElection;
};

export const transformPublicationsToHomeRoutes = (
  publications: Publication[]
) => {
  return publications.map((publication: Publication) => {
    const title = publication?.metadata?.title || publication?.systemdata?.title || "";
    const isElection = checkIsElection(title, publication);
    
    const routePath = isElection
      ? `/${publication?.metadata?.language?.locale}/${getElectionLabel(
          publication?.metadata?.language?.locale
        )}`
      : `/${publication?.metadata?.language?.locale}`;
    
    const documentId = publication?.systemdata?.documentId;
    const groupId = publication?.metadata?.language?.groupId;
    const language = publication?.metadata?.language?.locale;
    const rootDir = path.resolve(__dirname, "../");
    
    return {
      name: title,
      path: routePath,
      file: isElection
        ? `${rootDir}/pages/election/index.vue`
        : `${rootDir}/pages/index.vue`,
      meta: {
        id: documentId,
        isElection: isElection,
        contentType: publication?.systemdata?.contentType || "",
        groupId: {
          id: groupId,
          language: language,
        },
      },
    };
  });
};