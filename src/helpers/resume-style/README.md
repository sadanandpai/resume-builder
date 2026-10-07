# Resume presentation settings

`useResumeStyleStore` owns global, version 1 browser preferences. Resume data and JSON import/export are independent. Hydration happens in an effect; absent fields retain original template styles. Preview transactions do not write storage, and commit records one bounded in-memory undo step. Storage failures leave editing functional.

Rendering uses inherited custom properties with explicit fallbacks in actual component styles. Rich-text HTML is left intact so author inline formatting still wins. Typography role helpers preserve supporting-text proportions. Presets multiply original spacing and line heights, never previously scaled values.

## Padding mapping

| Templates                                       | Override containers                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Modern, Professional, Classic, Technical, Plain | Root content wrapper                                                                     |
| Sidebar Left, Sidebar Right, Straightforward    | Main and sidebar wrappers; never the parent grid                                         |
| Header Band                                     | Background header and body grid                                                          |
| Creative                                        | Decorative background header and body grid                                               |
| Inspired                                        | Outer profile header and body grid; inner identity/sidebar cards keep decorative padding |

Section boxes retain their decorative padding. A global override replaces each designated container's complete four-side padding rather than adding another wrapper. Metadata describes primary content defaults; individual original fallbacks remain in components, because defaults can differ within the same template.

Explicit column percentages use fractional tracks over width remaining after the gap. Gap overrides/density presets also activate fractional tracks with the original secondary ratio; an untouched template retains its original tracks. Secondary remains on the same side.

Page margins are border-box insets inside fixed A4. The stylesheet retains zero print page margins. Overflow remains clipped without a preview warning.

## Verification

Automated store, control, and all-template integration tests cover validation, hydration, grouped history, resets, preset behavior, numeric recovery, side linking, and retaining unsupported overrides. Real browser geometry, default visual comparison, extreme settings, zoom, and print/PDF acceptance must additionally be checked in a connected browser; jsdom cannot verify those.
