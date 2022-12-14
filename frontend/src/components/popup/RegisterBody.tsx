import { useEffect, useState } from "react";
import { ModalProps } from "../../utils/types";
import { clearErrorMessage, createUser } from "../../features/currentUserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { emailChecker } from "../../utils/misc";
import { CustomInput } from "../views/CustomInput";

interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterBody = (props: ModalProps) => {
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
    setError("");

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
      } else if (formRegisterData.password.length < 8) {
        setError("Password is fewer than 8 characters");
        return;
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
        .then(() => {
          props.setModalProps("successRegistration");
        })
        .catch((error: string) => setError(error));
    }
  };

  useEffect(() => {
    setError("");
    dispatch(clearErrorMessage());
  }, [props.type, dispatch]);

  return (
    <div>
      <div className="custom-modal-header">
        <div className="title" arial-label="registerLabel">
          Create an Account
        </div>
      </div>
      <div className="custom-modal-body">
        {error && (
          <div className="error text-center" data-testid="modalError">
            {error}
          </div>
        )}
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
            <button
              aria-label="registerUser"
              className="custom-btn full-width-button"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="custom-modal-footer">
        Have an account?&nbsp;
        <button
          aria-label="loginBody"
          className="btn-link active"
          onClick={() => props.setModalProps("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterBody;
