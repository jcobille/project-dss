import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import Modal from "../popup/Modal";
import { getUsers } from "../features/userSlice";
import { ToastContainer } from "react-toastify";

export const UserList = () => {
  const tableHeader = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { title: "Status", key: "isActive" },
    { title: "", key: "id" },
  ];
  const buttonModalTypes = ["editUser", "deleteUser"];

  const [modal, setModal] = useState({
    id: "",
    type: "",
    isOpen: false,
  });

  const openCloseModal = (type: string) => {
    setModal({
      id: "",
      type: type,
      isOpen: !modal.isOpen,
    });
  };

  const changeModal = (type: string, id?: string) => {
    if (id) {
      setModal({ ...modal, id: id, type: type, isOpen: true });
    } else {
      setModal({ ...modal, type: type, isOpen: true });
    }
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
                onClick={() => openCloseModal("addUser")}
              >
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add User</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          <Table
            headers={tableHeader}
            data={UserList}
            minRow={15}
            tableType="user"
            changeModal={changeModal}
            buttonModalTypes={buttonModalTypes}
          />
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        changeModal={changeModal}
      />
    </section>
  );
};
