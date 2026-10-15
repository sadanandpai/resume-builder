/** Change only presentation, preserving live edits and avoiding a saved-resume reload. */
export function setResumeView(view: boolean) {
  const url = new URL(window.location.href);
  if (view) url.searchParams.set('mode', 'edit');
  else url.searchParams.delete('mode');
  window.history.pushState(null, '', url.pathname + url.search + url.hash);
}
