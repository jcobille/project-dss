import { Actor, ModalProps, Movie, User } from "../../utils/types";
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
const Table = ({ data, headers, tableType, minRow, modal }: TableProps) => {
  const length = data.length < minRow ? minRow : data.length;
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
            }
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
