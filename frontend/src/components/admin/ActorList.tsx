import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import { getActors } from "../../features/actorSlice";
import { ToastContainer } from "react-toastify";
import { ModalProps } from "../../utils/types";
import CustomModal from "../popup/Modal";

export const ActorList = () => {
  const tableHeader = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Gender", key: "gender" },
    { title: "Actor's Age", key: "age" },
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

  const addActorHandler = (type: string, action: string) => {
    setModal({ ...modal, action: action, type: type });
  };
  const ActorList = useAppSelector(({ actorList }) => actorList.data.actors);
  const actorCount = useAppSelector(({ actorList }) => actorList.data.count);
  const dispatch = useAppDispatch();

  const fetchData = (page: number) => {
    const skip = (page - 1) * 10;
    dispatch(getActors({ skip: skip, limit: 10 }));
  };
  useEffect(() => {
    dispatch(getActors({ skip: 0, limit: 10 }));
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
                onClick={() => addActorHandler("actors", "add")}
              >
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add Actor</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          {ActorList.length > 0 && (
            <Table
              headers={tableHeader}
              data={ActorList}
              dataCount={actorCount}
              minRow={10}
              tableType="actors"
              modal={modal}
              fetchData={fetchData}
            />
          )}
        </div>
      </div>
      <CustomModal {...modal} />
    </section>
  );
};
