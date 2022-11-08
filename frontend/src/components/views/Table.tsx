import { Actor, Movie, User } from "../types/ActionTypes";
import TableRow from "./Row";

interface TableProps {
  data: Movie[] | Actor[] | User[];
  headers: {
    title: string;
    key: string;
  }[];
  minRow: number;
  tableType: string;
  changeModal: (type: string) => void;
  buttonModalTypes: string[];
}
const Table = ({
  data,
  headers,
  tableType,
  minRow,
  changeModal,
  buttonModalTypes,
}: TableProps) => {
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
                  changeModal={changeModal}
                  buttonModalTypes={buttonModalTypes}
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
