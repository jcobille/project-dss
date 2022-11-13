import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ModalProps, User } from "../../utils/types";
import { addUser, deleteUser, editUser } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CustomInput, CustomRadioButton } from "../views/CustomInput";
import { toast } from "react-toastify";

interface BodyProps {
  userId?: string;
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
  isOpen: boolean;
}
export const UserModalBody = (props: ModalProps) => {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
    isActive: false,
    password: "",
  });
  const userType = ["Admin", "User"];
  const isActiveType = ["Active", "Inactive"];
  const [error, setError] = useState("");
  const users = useAppSelector((state) => state.userList.data);
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState("Active");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleAddandEdit = (data: User) => {
    setError("");
    if (!data.firstName) {
      setError("First Name is empty");
      return;
    } else if (!data.lastName) {
      setError("Last Name is empty");
      return;
    } else if (!data.email) {
      setError("Email is empty");
      return;
    } else if (!data.password && props.action === "add") {
      setError("Password is empty");
      return;
    } else if (!confirmPassword && props.action === "add") {
      setError("Confirm password is empty");
      return;
    }

    if (data.password) {
      if (data.password !== confirmPassword) {
        setError("Password isn't the same");
        return;
      }
    }

    if (props.action === "add") {
      dispatch(addUser(data)).then(() => {
        notify("New account has been created");
      });
    } else {
      dispatch(editUser(data)).then(() => {
        notify("Successfully edited the user");
      });
    }
    props.setModalProps("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id)).then(() => {
      notify("User has been deleted");
    });
    props.setModalProps("");
  };
  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "isActive") {
      let userActive = value === "Active";
      setFormData({ ...formData, [name]: userActive });
      setIsActive(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    let user = users.find((user) => user.id === props.id);
    if (user) {
      let isActive = user.isActive ? "Active" : "Inactive";
      setFormData(user);
      setIsActive(isActive);
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
        <div className="title">{title} User</div>
      </div>
      <div
        className={
          "custom-modal-body " + (props.action === "delete" ? "div-hidden" : "")
        }
      >
        {error && (
          <div className="error text-center" data-testid="movieError">
            {error}
          </div>
        )}
        <div className="row my-1">
          <div className="col-3">
            <label>Role</label>
          </div>
          <div className="col">
            <CustomRadioButton
              name="role"
              data={userType}
              changeHandler={changeHandler}
              value={formData.role}
            />
          </div>
        </div>
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
          <div className="col-3 text-center">
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
            <label>Email</label>
          </div>
          <div className="col">
            <CustomInput
              type="text"
              className="input"
              name="email"
              changeHandler={changeHandler}
              value={formData.email}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Password</label>
          </div>
          <div className="col">
            <CustomInput
              type="password"
              className="input"
              name="password"
              changeHandler={changeHandler}
              value={formData.password}
            />
          </div>
        </div>
        <div className="row my-1">
          <div className="col-3">
            <label>Confirm Password</label>
          </div>
          <div className="col">
            <CustomInput
              type="password"
              className="input"
              name="confirmPassword"
              changeHandler={changeHandler}
              value={confirmPassword}
            />
          </div>
        </div>

        <div className="row my-1">
          <div className="col-3">
            <label>Is Active</label>
          </div>
          <div className="col">
            <CustomRadioButton
              name="isActive"
              data={isActiveType}
              changeHandler={changeHandler}
              value={isActive}
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
            Are you sure you want to <br /> delete this user?
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
