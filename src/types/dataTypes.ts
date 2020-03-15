export interface IRepository {
  full_name: string;
  name: string;
  owner: Owner;
  description: string;
}

export interface Owner {
  avatar_url: string;
  login: string;
}

export interface IIssue {
  id: number;
  user: IUserIssue;
  html_url: string;
  title: string;
  labels: IIssueLabel[];
}

export interface IUserIssue {
  avatar_url: string;
  login: string;
}

export interface IIssueLabel {
  id: number;
  name: string;
}
