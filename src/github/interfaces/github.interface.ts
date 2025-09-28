export type GithubEvent = "issues" | "star" ;
export type GithubPayload = GithubStar | GithubIssues;

export interface GithubStar {
    action:     string;
    repository: Repository;
    sender: Sender;
}

export interface Repository {
    name: string;
}

export interface Sender {
    login: string;
}

export interface GithubIssues {
    action:   string;
    issue: Issue;
    repository: Repository;
    sender: Sender;
}

export interface Issue {
    title: string;
}