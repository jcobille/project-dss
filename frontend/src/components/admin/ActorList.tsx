import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import Modal from "../popup/Modal";
import { getActors } from "../features/actorSlice";
import { ToastContainer } from "react-toastify";

export const ActorList = () => {
  const tableHeader = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Actor's Age", key: "age" },
    { title: "", key: "id" },
  ];

  const buttonModalTypes = ["editActor", "deleteActor"];
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

  const ActorList = useAppSelector((state) => state.actorList.actors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getActors());
  }, [dispatch]);
  return (
    <section>
      <ToastContainer />
      <div className="section mt-3">
        <AdminNavTabs />
        <div className="section-container dark">
          <div className="header">
            <div>
              <span className="title">Actors Management</span>
              <button
                className="btn-float-end"
                onClick={() => openCloseModal("addActor")}
              >
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add Actor</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          <Table
            headers={tableHeader}
            data={ActorList}
            minRow={15}
            tableType="actors"
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
