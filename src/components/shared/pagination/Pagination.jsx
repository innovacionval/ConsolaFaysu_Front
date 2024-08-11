
export const Pagination = ({ page, setPage, total }) => {
  const pages = Math.ceil(total / 10);
  const maxPages = 5;

  const start = Math.max(1, page - Math.floor(maxPages / 2));
  const end = Math.min(pages, start + maxPages - 1);

  const adjustedStart = Math.max(1, end - maxPages + 1);

  const numbers = Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  );

  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &laquo;
      </button>

      {numbers.map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          disabled={page === number}
        >
          {number}
        </button>
      ))}

      <button onClick={() => setPage(page + 1)} disabled={page === pages}>
        &raquo;
      </button>
    </div>
  );
};
