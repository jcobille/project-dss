import { useEffect, useMemo, useState } from "react";
import { Actor, ModalProps, Movie, User } from "../../utils/types";
import Pagination from "./Pagination";
import TableRow from "./Row";

interface TableProps {
  data: Movie[] | Actor[] | User[];
  dataCount?: number;
  headers: {
    title: string;
    key: string;
  }[];
  minRow: number;
  tableType: string;
  modal: ModalProps;
  fetchData?: (page: number) => void;
}

let PageSize = 10;

const Table = ({
  data,
  dataCount,
  headers,
  tableType,
  minRow,
  modal,
  fetchData,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const length = data.length < minRow ? minRow : data.length;
  const getNextPage = (page: number) => {
    if (fetchData) fetchData(page);
    setCurrentPage(page);
  };
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
            if (data[i]) {
              return (
                <TableRow
                  key={i}
                  index={i}
                  tableType={tableType}
                  data={data[i]}
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
        totalCount={dataCount}
        pageSize={PageSize}
        onPageChange={(page: number) => getNextPage(page)}
      />
    </>
  );
};
export default Table;
