import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Actor, ModalProps } from "../../utils/types";
import { createActor, deleteActor, editActor } from "../../features/actorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CustomInput, CustomRadioButton } from "../views/CustomInput";
import { toast } from "react-toastify";
import { isUrl } from "../../utils/misc";

export const ActorModalBody = (props: ModalProps) => {
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

  let title = props.action
    ? props.action[0].toUpperCase() + props.action.substring(1)
    : "";

  const submitHandler = () => {
    if (props.action === "add" || props.action === "edit") {
      handleAddandEdit(formData);
    } else {
      if (props.id) {
        handleDelete(props.id);
      }
    }
  };

  const handleAddandEdit = (data: Actor) => {
    setError("");
    if (!data.firstName) {
      setError("First name is empty");
    } else if (!data.lastName) {
      setError("Last Name is empty");
    } else if (!data.gender) {
      setError("Gender is required");
    } else if (!data.age) {
      setError("Age is empty");
    } else if (!data.image) {
      setError("Image is empty");
    } else {
      if (!isUrl(data.image)) {
        setError("Image is not valid");
        return;
      }

      if (props.action === "add") {
        dispatch(createActor(data))
          .then(() => {
            notify("Actor has been created");
            props.setModalProps("");
          })
          .catch((error: string) => notify(error));
      } else {
        dispatch(editActor(data))
          .then(() => {
            notify("Actor has been updated");
            props.setModalProps("");
          })
          .catch((error: string) => notify(error));
      }
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteActor(id))
      .then(() => {
        notify("Actor has been deleted");
        props.setModalProps("");
      })
      .catch((error: string) => notify(error));
  };
  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setError("");

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    let actor = actors.find((actor: Actor) => actor.id === props.id);
    if (actor) {
      setFormData({
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName,
        age: actor.age,
        gender: actor.gender,
        image: actor.image,
      });
    }
  }, [props.id]);

  const notify = (message: string) =>
    toast(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div>
      <div className="custom-modal-header">
        <div className="title" data-testid="modalTitle">
          {title} Actor
        </div>
      </div>
      <div
        className={
          "custom-modal-body " + (props.action === "delete" ? "div-hidden" : "")
        }
      >
        {error && (
          <div className="error text-center" data-testid="modalError">
            {error}
          </div>
        )}
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
          (props.action !== "delete" ? "div-hidden" : "")
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
