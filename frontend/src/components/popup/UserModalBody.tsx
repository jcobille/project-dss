import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { User } from "../types/ActionTypes";
import { addUser, deleteUser, editUser } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CustomInput, CustomRadioButton } from "../views/CustomInput";

interface BodyProps {
  userId?: string;
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
  isOpen: boolean;
}
export const UserModalBody = ({
  userId,
  type,
  changeModal,
  closeModal,
  isOpen,
}: BodyProps) => {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
    isActive: false,
    password: undefined,
  });
  const userType = ["Admin", "User"];
  const isActiveType = ["Active", "Inactive"];
  const [error, setError] = useState("");
  const users = useAppSelector((state) => state.userList.data);
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState("Active");
  const [confirmPassword, setConfirmPassword] = useState("");
  let title = "Add";
  if (type === "editUser") {
    title = "Edit";
  } else if (type === "deleteUser") {
    title = "Delete";
  }

  const submitHandler = () => {
    if (type === "addUser" || type === "editUser") {
      handleAddandEdit(formData);
    } else {
      if (userId) {
        handleDelete(userId);
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
    } else if (!data.password && type === "addUser") {
      setError("Password is empty");
      return;
    } else if (!confirmPassword && type === "addUser") {
      setError("Confirm password is empty");
      return;
    }

    if (data.password) {
      if (data.password !== confirmPassword) {
        setError("Password isn't the same");
        return;
      }
    }

    type === "addUser" ? dispatch(addUser(data)) : dispatch(editUser(data));
    closeModal(type);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    closeModal(type);
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
    let user = users.find((user) => user.id === userId);
    if (user) {
      let isActive = user.isActive ? "Active" : "Inactive";
      setFormData(user);
      setIsActive(isActive);
    }
  }, [userId]);
  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">{title} User</div>
      </div>
      <div
        className={
          "custom-modal-body " + (type === "deleteUser" ? "div-hidden" : "")
        }
      >
        {error ? <div className="error text-center">{error}</div> : ""}
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
          (type !== "deleteUser" ? "div-hidden" : "")
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
