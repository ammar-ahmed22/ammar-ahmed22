import axios, { AxiosInstance } from "axios";

export namespace GitHub {
  export type Options = {
    token: string,
    version?: string
  }

  export type RepoOptions = {
    visibility?: "all" | "public" | "private",
    affiliation?: string[]
  }
}

export class GitHubClient {
  private token: string;
  private version: string = "2022-11-28";
  private http: AxiosInstance;
  private baseURL: string = "https://api.github.com";
  constructor(opts: GitHub.Options) {
    this.token = opts.token;
    this.version = opts.version ?? this.version;
    this.http = axios.create({
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "X-GitHub-Api-Version": this.version
      }
    })
  }

  public repos = async (opts?: GitHub.RepoOptions) => {
    const url = new URL("/user/repos", this.baseURL);
    const searchParams = new URLSearchParams();

    if (opts?.affiliation) {
      searchParams.append("affiliation", opts.affiliation.map(p => encodeURIComponent(p)).join(","));
    }

    if (opts?.visibility) {
      searchParams.append("visibility", opts.visibility);
    }

    url.search = searchParams.toString();
    
    console.log(url.href);
    const res = await this.http.get(url.href);
    console.log(res.data[0]);
  }
}