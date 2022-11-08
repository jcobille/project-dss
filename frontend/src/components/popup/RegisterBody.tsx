import { useEffect, useState } from "react";
import { BodyProps } from "../types/ActionTypes";
import { clearErrorMessage, createUser } from "../features/currentUserSlice";
import { useAppDispatch } from "../store/hooks";
import { emailChecker } from "../utils/misc";
import { CustomInput } from "../views/CustomInput";

interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterBody = ({ type, changeModal, closeModal }: BodyProps) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [formRegisterData, setFormRegisterData] = useState<SignupProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormRegisterData({ ...formRegisterData, [name]: value });
  };

  const submitRegisterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRegisterData.firstName) {
      setError("First name is required");
    } else if (!formRegisterData.lastName) {
      setError("Last name is required");
    } else if (!formRegisterData.email) {
      setError("Email is required");
    } else if (!formRegisterData.password) {
      setError("Password is required");
    } else {
      if (!emailChecker(formRegisterData.email)) {
        setError("Email is invalid");
        return;
      } else if (formRegisterData.password.length < 6) {
        setError("Password is fewer than 6 characters");
      } else if (
        formRegisterData.password !== formRegisterData.confirmPassword
      ) {
        setError("Password didn't match");
        return;
      }

      let userDetails = {
        firstName: formRegisterData.firstName,
        lastName: formRegisterData.lastName,
        email: formRegisterData.email,
        password: formRegisterData.password,
      };
      dispatch(createUser(userDetails))
        .unwrap()
        .then((res) => {
          changeModal("successRegistration");
        })
        .catch((error) => setError(error));
    }
  };

  useEffect(() => {
    setError("");
    dispatch(clearErrorMessage());
  }, [type, dispatch]);

  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">Create an Account</div>
      </div>
      <div className="custom-modal-body">
        {error ? <div className="error text-center">{error}</div> : ""}
        <form onSubmit={submitRegisterHandler}>
          <div className="form-input text-start">
            <div>
              <label className="form-label">FIRST NAME</label>
              <CustomInput
                type="text"
                className="input"
                name="firstName"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">LAST NAME</label>
              <CustomInput
                type="text"
                className="input"
                name="lastName"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">EMAIL</label>
              <CustomInput
                type="text"
                className="input"
                name="email"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                name="password"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">CONFIRM PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                changeHandler={changeHandler}
                name="confirmPassword"
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button className="custom-btn full-width-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="custom-modal-footer">
        Have an account?&nbsp;
        <button
          className="btn-link active"
          onClick={() => changeModal("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterBody;
