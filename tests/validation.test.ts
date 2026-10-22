import { describe, expect, it } from 'vitest';
import { emptyEnquiry, formatEnquiry, validateEnquiry } from '../src/lib/validation';
const valid = { ...emptyEnquiry, name:'Ada', email:'ada@example.com', language:'Python', applicationType:'CLI or developer tool', codebaseSize:'Under 10k lines', reason:'Maintainability', description:'Migrate a parser.', repository:'https://github.com/example/parser' };
describe('enquiry validation', () => {
  it('requires the project details', () => { const errors = validateEnquiry(emptyEnquiry); expect(errors.name).toBeDefined(); expect(errors.description).toBeDefined(); });
  it('accepts a complete enquiry and formats its contents', () => { expect(validateEnquiry(valid)).toEqual({}); expect(formatEnquiry(valid)).toContain('Migrate a parser.'); });
  it('rejects invalid email, URL, oversized text, and honeypot', () => { const errors = validateEnquiry({ ...valid, email:'bad', repository:'ftp://example.com', description:'x'.repeat(4001), website:'bot' }); expect(errors.email).toBeDefined(); expect(errors.repository).toBeDefined(); expect(errors.description).toBeDefined(); expect(errors.website).toBeDefined(); });
});
