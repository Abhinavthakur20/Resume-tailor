export interface TailorRequest {
  latex: string;
  jobDescription: string;
}

export interface TailorResponse {
  atsScoreBefore: number;
  atsScoreAfter: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  keywordsAdded: string[];
  updatedLatex: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
