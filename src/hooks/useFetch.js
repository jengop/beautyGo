/**
 * useFetch – lightweight async data-fetching hook.
 *
 * @param {() => Promise<any>} fetcher   - async function that returns data
 * @param {(state: FetchState) => void} onUpdate  - callback with { data, loading, error }
 * @returns {{ refetch: Function }}
 *
 * @example
 *  const { refetch } = useFetch(
 *    () => professionalService.getAll(),
 *    ({ data, loading, error }) => { ... }
 *  );
 */
export function useFetch(fetcher, onUpdate) {
  let aborted = false;

  async function run() {
    onUpdate({ data: null, loading: true, error: null });
    try {
      const data = await fetcher();
      if (!aborted) onUpdate({ data, loading: false, error: null });
    } catch (err) {
      if (!aborted) onUpdate({ data: null, loading: false, error: err.message || 'Error desconocido' });
    }
  }

  run();

  return {
    refetch: run,
    abort: () => { aborted = true; },
  };
}
