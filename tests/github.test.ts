import { describe, expect, it } from 'vitest';
import { getFounderProjects } from '../src/lib/github';
describe('GitHub integration', () => {
  it('keeps curated projects visible when GitHub rejects requests', async () => { const result = await getFounderProjects((async () => new Response('', {status:403})) as typeof fetch); expect(result).toHaveLength(3); expect(result.every(project => project.repo === null)).toBe(true); });
  it('uses verified public metadata when the response is valid', async () => { const fetcher = (async (url: string) => new Response(JSON.stringify({ name:url.split('/').pop(), description:null, html_url:url.replace('api.github.com/repos/','github.com/'), language:'Rust', stargazers_count:2, pushed_at:null, archived:false }), {status:200})) as typeof fetch; const result = await getFounderProjects(fetcher); expect(result[0].repo?.name).toBe('logshield'); expect(result[0].repo?.stargazers_count).toBe(2); });
});
