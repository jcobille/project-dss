import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import { getUsers } from "../../features/userSlice";
import { ToastContainer } from "react-toastify";
import { ModalProps } from "../../utils/types";
import CustomModal from "../popup/Modal";

export const UserList = () => {
  const userTableHeaders = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { title: "Status", key: "isActive" },
    { title: "", key: "id" },
  ];
  const [modal, setModal] = useState<ModalProps>({
    id: "",
    type: "",
    action: "",
    setModalProps: (newType: string, newAction = "", newId = "") => {
      setModal({ ...modal, type: newType, action: newAction, id: newId });
    },
  });
  const addUserHandler = (type: string, action: string) => {
    setModal({ ...modal, action: action, type: type });
  };
  const UserList = useAppSelector(({ userList }) => userList.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <section>
      <ToastContainer />
      <div className="section mt-3">
        <AdminNavTabs />
        <div className="section-container dark">
          <div className="header">
            <div>
              <span className="title">Users Management</span>
              <button
                className="btn-float-end"
                onClick={() => addUserHandler("users", "add")}
              >
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add User</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          {UserList.length > 0 && <Table
            headers={userTableHeaders}
            data={UserList}
            minRow={10}
            tableType="users"
            modal={modal}
          />}
        </div>
      </div>
      <CustomModal {...modal} />
    </section>
  );
};
