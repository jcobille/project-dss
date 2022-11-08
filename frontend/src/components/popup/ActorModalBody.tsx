import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Actor } from "../types/ActionTypes";
import { createActor, deleteActor, editActor } from "../features/actorSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CustomInput, CustomRadioButton } from "../views/CustomInput";
import { toast } from "react-toastify";

interface BodyProps {
  actorId?: string;
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
  isOpen: boolean;
}
export const ActorModalBody = ({
  actorId,
  type,
  changeModal,
  closeModal,
  isOpen,
}: BodyProps) => {
  const [formData, setFormData] = useState<Actor>({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    image: "",
  });
  const radioButton = ["Male", "Female"];
  const [error, setError] = useState("");
  const actors = useAppSelector((state) => state.actorList.actors);
  const dispatch = useAppDispatch();

  let title = "Add";
  if (type === "editActor") {
    title = "Edit";
  } else if (type === "deleteActor") {
    title = "Delete";
  }

  const submitHandler = () => {
    if (type === "addActor" || type === "editActor") {
      handleAddandEdit(formData);
    } else {
      if (actorId) {
        handleDelete(actorId);
      }
    }
  };

  const handleAddandEdit = (data: Actor) => {
    setError("");
    if (!data.firstName) {
      setError("First name is empty");
      return;
    } else if (!data.lastName) {
      setError("Last Name is empty");
      return;
    } else if (!data.age) {
      setError("Age is empty");
      return;
    } else if (!data.image) {
      setError("Image is empty");
      return;
    }

    if (type === "addActor") {
      dispatch(createActor(data))
        .then((res) => {
          notify("Actor has been created");
          closeModal(type);
        })
        .catch((error) => notify(error));
    } else {
      dispatch(editActor(data))
        .then((res) => {
          notify("Actor has been updated");
          closeModal(type);
        })
        .catch((error) => notify(error));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteActor(id))
      .then((res) => {
        notify("Actor has been deleted");
        closeModal(type);
      })
      .catch((error) => notify(error));
  };
  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    let actor = actors.find((actor) => actor.id === actorId);
    if (actor) {
      setFormData(actor);
    }
  }, [actorId]);

  const notify = (message: string) =>
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">{title} Actor</div>
      </div>
      <div
        className={
          "custom-modal-body " + (type === "deleteActor" ? "div-hidden" : "")
        }
      >
        {error ? <div className="error text-center">{error}</div> : ""}
        <div className="row my-1">
          <div className="col-3 text-center">
            <label>First Name</label>
          </div>
          <div className="col">
            <CustomInput
              type="text"
              className="input"
              name="firstName"
              changeHandler={changeHandler}
              value={formData.firstName}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Last Name</label>
          </div>
          <div className="col">
            <CustomInput
              type="text"
              className="input"
              name="lastName"
              changeHandler={changeHandler}
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Gender</label>
          </div>
          <div className="col">
            <CustomRadioButton
              name="gender"
              data={radioButton}
              changeHandler={changeHandler}
              value={formData.gender}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Age</label>
          </div>
          <div className="col">
            <CustomInput
              type="text"
              className="input"
              name="age"
              changeHandler={changeHandler}
              value={formData.age}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Image</label>
          </div>
          <div className="col">
            <CustomInput
              type="text"
              className="input"
              name="image"
              changeHandler={changeHandler}
              value={formData.image}
            />
          </div>
        </div>
      </div>

      <div
        className={
          "custom-modal-body text-center " +
          (type !== "deleteActor" ? "div-hidden" : "")
        }
      >
        <div className="form-input">
          <div className="pb-3">
            <FontAwesomeIcon icon={faQuestionCircle} size="4x" />
          </div>
          <span>
            Are you sure you want to <br /> delete this actor?
          </span>
        </div>
      </div>
      <div className="footer py-2">
        <button
          type="submit"
          className="custom-btn full-width-button"
          onClick={submitHandler}
        >
          {title}
        </button>
      </div>
    </div>
  );
};
