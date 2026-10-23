
import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import "./data-table.css";

export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  searchable = true,
  pageSize = 5,
  emptyMessage = "No records found.",
  actions
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "", direction: "asc" });
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = data.filter((row) =>
      !query ||
      columns.some((column) => {
        const value = column.accessor
          ? column.accessor(row)
          : row[column.key];

        return String(value ?? "").toLowerCase().includes(query);
      })
    );

    if (!sort.key) return result;

    return [...result].sort((a, b) => {
      const column = columns.find((item) => item.key === sort.key);
      const aValue = column?.accessor ? column.accessor(a) : a[sort.key];
      const bValue = column?.accessor ? column.accessor(b) : b[sort.key];

      const comparison =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, {
              numeric: true,
              sensitivity: "base"
            });

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [data, columns, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function toggleSort(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
    setPage(1);
  }

  return (
    <section className="data-table-card">
      <div className="data-table-toolbar">
        <div>
          <h2 className="data-table-title">Records</h2>
          <p className="data-table-subtitle">
            {filteredData.length} record{filteredData.length === 1 ? "" : "s"}
          </p>
        </div>

        {searchable && (
          <label className="data-table-search">
            <Search size={17} aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search records..."
              aria-label="Search table records"
            />
          </label>
        )}
      </div>

      <div className="data-table-scroll">
        <table className="reusable-data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.sortable === false ? (
                    column.label
                  ) : (
                    <button
                      type="button"
                      className="table-sort-button"
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.label}
                      <ArrowUpDown size={13} aria-hidden="true" />
                    </button>
                  )}
                </th>
              ))}
              {actions && <th scope="col">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {visibleData.map((row, index) => (
              <tr key={row[rowKey] ?? index}>
                {columns.map((column) => {
                  const value = column.accessor
                    ? column.accessor(row)
                    : row[column.key];

                  return (
                    <td key={column.key}>
                      {column.type === "status" ? (
                        <StatusBadge status={String(value ?? "Unknown")} />
                      ) : column.render ? (
                        column.render(value, row)
                      ) : (
                        value ?? "—"
                      )}
                    </td>
                  );
                })}
                {actions && (
                  <td>
                    <div className="table-row-actions">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {visibleData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="data-table-empty"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="data-table-footer">
        <span>
          {filteredData.length === 0
            ? "No results"
            : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(
                currentPage * pageSize,
                filteredData.length
              )} of ${filteredData.length}`}
        </span>

        <div className="data-table-pagination">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </Button>

          <span className="data-table-page-number">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() =>
              setPage((value) => Math.min(totalPages, value + 1))
            }
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </footer>
    </section>
  );
}
