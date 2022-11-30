export interface JobSearchResult {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: null | string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}

export interface JobSearchFilter {
  description?: string;
  location?: string;
  full_time?: boolean;
}
