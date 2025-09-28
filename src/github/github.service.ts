import { Injectable } from '@nestjs/common';
import { GithubEvent, GithubIssues, GithubPayload, GithubStar } from './interfaces/github.interface';

@Injectable()
export class GithubService {

    public handleWebhook(event: GithubEvent, payload: GithubPayload) {
        let message = "";
        console.log(`Github webhook received: ${event}`);
        switch (event) {
            case "star":
                message = this.handleStarEvent(payload as GithubStar);               
                break;
            case "issues":
                message = this.handleIssuesEvent(payload as GithubIssues);
                break;
            default:
                message = `Unknown event: ${event}`;
                break;
        }
        console.log(message);
    }

    private handleStarEvent(payload: GithubStar) {
        const { action, repository, sender } = payload;
        return `New star event: ${action} by ${sender.login} for ${repository.name}`;
    }

    private handleIssuesEvent(payload: GithubIssues) {
        const { action, issue, repository, sender } = payload;
        return `New issues event: ${action} at ${issue.title} by ${sender.login} for ${repository.name}`;
    }
}
