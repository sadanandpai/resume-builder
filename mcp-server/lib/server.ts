import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { checkRateLimit } from './rateLimit';
import {
  createResume,
  createResumeAnnotations,
  createResumeDescription,
  createResumeInputSchema,
} from './tools/createResume';
import {
  getResume,
  getResumeAnnotations,
  getResumeDescription,
  getResumeInputSchema,
} from './tools/getResume';
import {
  updateResume,
  updateResumeAnnotations,
  updateResumeDescription,
  updateResumeInputSchema,
} from './tools/updateResume';
import {
  tailorResume,
  tailorResumeAnnotations,
  tailorResumeDescription,
  tailorResumeInputSchema,
} from './tools/tailorResume';
import {
  listTemplates,
  listTemplatesAnnotations,
  listTemplatesDescription,
  listTemplatesInputSchema,
} from './tools/listTemplates';

function textResult(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] };
}

function errorResult(message: string) {
  return { content: [{ type: 'text' as const, text: message }], isError: true };
}

// A fresh server per request -- this runs in a stateless serverless function,
// so there is no connection to keep tool registrations alive across requests.
// clientId scopes the in-memory rate limiter (see rateLimit.ts); it's checked
// per tool category here, since every tool call arrives as a POST in
// stateless mode and the HTTP layer alone can't tell reads from writes.
export function createResumeMcpServer(clientId: string): McpServer {
  const server = new McpServer({ name: 'e-resume', version: '0.1.0' });

  server.registerTool(
    'create_resume',
    {
      description: createResumeDescription,
      inputSchema: createResumeInputSchema,
      annotations: createResumeAnnotations,
    },
    async (input) => {
      try {
        checkRateLimit('write', clientId);
        return textResult(await createResume(input));
      } catch (error) {
        return errorResult(error instanceof Error ? error.message : 'Could not create resume.');
      }
    }
  );

  server.registerTool(
    'get_resume',
    {
      description: getResumeDescription,
      inputSchema: getResumeInputSchema,
      annotations: getResumeAnnotations,
    },
    async (input) => {
      try {
        checkRateLimit('read', clientId);
        return textResult(await getResume(input));
      } catch (error) {
        return errorResult(error instanceof Error ? error.message : 'Could not load resume.');
      }
    }
  );

  server.registerTool(
    'update_resume',
    {
      description: updateResumeDescription,
      inputSchema: updateResumeInputSchema,
      annotations: updateResumeAnnotations,
    },
    async (input) => {
      try {
        checkRateLimit('write', clientId);
        return textResult(await updateResume(input));
      } catch (error) {
        return errorResult(error instanceof Error ? error.message : 'Could not update resume.');
      }
    }
  );

  server.registerTool(
    'tailor_resume',
    {
      description: tailorResumeDescription,
      inputSchema: tailorResumeInputSchema,
      annotations: tailorResumeAnnotations,
    },
    async (input) => {
      try {
        checkRateLimit('read', clientId);
        return textResult(await tailorResume(input));
      } catch (error) {
        return errorResult(error instanceof Error ? error.message : 'Could not load resume.');
      }
    }
  );

  server.registerTool(
    'list_templates',
    {
      description: listTemplatesDescription,
      inputSchema: listTemplatesInputSchema,
      annotations: listTemplatesAnnotations,
    },
    async () => {
      checkRateLimit('read', clientId);
      return textResult(await listTemplates());
    }
  );

  return server;
}
