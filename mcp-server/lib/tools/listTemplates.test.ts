import { describe, expect, it } from 'vitest';
import { COLORS, listTemplates, TEMPLATES } from './listTemplates';

// No automated check against the real TEMPLATE_REGISTRY here: that registry's
// module (templates.ts) type-checks only inside the main app's full Next.js
// environment (JSX, CSS modules, MUI/emotion theme augmentation), via its
// dynamic import()s of the real .tsx template components. Pulling that into
// this package's type-check surface for a drift check isn't worth coupling
// this server to the main app's entire frontend toolchain -- see
// listTemplates.ts's own comment. Keep TEMPLATES manually in sync instead.
describe('listTemplates', () => {
  it('has one entry per known template id', () => {
    expect(TEMPLATES.map((t) => t.id).sort()).toEqual(
      ['classic', 'modern', 'professional', 'spotlight'].sort()
    );
  });

  it('returns templates and colors', async () => {
    const result = await listTemplates();
    expect(result.templates).toEqual(TEMPLATES);
    expect(result.colors).toEqual(COLORS);
    expect(result.colors.system.id).toBe(1);
    expect(result.colors.customizable.id).toBe(2);
  });
});
