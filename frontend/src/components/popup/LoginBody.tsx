import { useState } from "react";
import { BodyProps } from "../types/ActionTypes";
import { loginUser } from "../features/currentUserSlice";
import { useAppDispatch } from "../store/hooks";
import { emailChecker } from "../utils/misc";
import { CustomInput } from "../views/CustomInput";

export interface LoginProps {
  email: string;
  password: string;
}

export const LoginBody = ({ type, changeModal, closeModal }: BodyProps) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [formLoginData, setFormLoginData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormLoginData({ ...formLoginData, [name]: value });
  };
  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formLoginData.email) {
      setError("Email is required");
    } else if (!formLoginData.password) {
      setError("Password is required");
    } else {
      if (!emailChecker(formLoginData.email)) {
        setError("Invalid email");
        return;
      } else if (formLoginData.password.length <= 6) {
        setError("Invalid email or password");
        return;
      }

      dispatch(loginUser(formLoginData))
        .unwrap()
        .then(() => {
          closeModal(type);
        })
        .catch((error: string) => setError(error));
    }
  };
  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">Welcome Back!</div>
      </div>

      <div className="custom-modal-body">
        {error ? <div className="error text-center">{error}</div> : ""}
        <form onSubmit={submitLoginHandler} data-testid="login-form">
          <div className="form-input text-start">
            <label className="form-label">EMAIL</label>
            <CustomInput
              type="text"
              className="input"
              name="email"
              changeHandler={changeHandler}
            />

            <label className="form-label">PASSWORD</label>
            <div>
              <CustomInput
                type="password"
                className="input"
                name="password"
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button type="submit" className="custom-btn full-width-button">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="custom-modal-footer">
        Don't have an account?&nbsp;
        <button
          className="btn-link active"
          onClick={() => changeModal("register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};
