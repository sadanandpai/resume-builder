import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createResumeMcpServer } from '../lib/server';
import { clientIdFromRequest } from '../lib/rateLimit';

// Vercel Node.js runtime Web Standard handler (see README: "Deploying").
// Authless, stateless -- a fresh server + transport per request, matching
// the SDK's documented stateless serverless pattern. Rate limiting happens
// per tool call inside createResumeMcpServer, not here: every tool call
// arrives as a POST in stateless mode, so the HTTP layer alone can't tell
// reads from writes.
export default {
  async fetch(request: Request): Promise<Response> {
    const clientId = clientIdFromRequest(request);
    const server = createResumeMcpServer(clientId);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    await server.connect(transport);
    return transport.handleRequest(request);
  },
};
