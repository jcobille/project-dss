import { useEffect, useMemo, useState } from "react";
import { Actor, ModalProps, Movie, User } from "../../utils/types";
import Pagination from "./Pagination";
import TableRow from "./Row";

interface TableProps {
  data: Movie[] | Actor[] | User[];
  headers: {
    title: string;
    key: string;
  }[];
  minRow: number;
  tableType: string;
  modal: ModalProps;
}

let PageSize = 10;

const Table = ({ data, headers, tableType, minRow, modal }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  const length =
    currentTableData.length < minRow ? minRow : currentTableData.length;
  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                scope="col"
                className={index > 0 ? "centered" : ""}
                key={index}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(length)].map((_, i) => {
            if (currentTableData[i]) {
              return (
                <TableRow
                  key={i}
                  index={i}
                  tableType={tableType}
                  data={currentTableData[i]}
                  headers={headers}
                  modal={modal}
                />
              );
            } else {
              return (
                <TableRow
                  key={i}
                  index={i}
                  tableType={tableType}
                  headers={headers}
                  modal={modal}
                />
              );
            }
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};
export default Table;
