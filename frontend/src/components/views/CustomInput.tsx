import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";
import { Actor, Movie } from "../types/ActionTypes";
import "react-toastify/dist/ReactToastify.css";

export interface CustomInputProps {
  type: string;
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  min?: number;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomNumberProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomTextareaProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface CustomAutocompleteProps {
  name: string;
  className: string;
  placeHolder?: string;
  data?: Actor[] | Movie[];
  value?: string;
  type?: string;
  hidden?: boolean;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectMovie?: (data: Movie) => void;
  selectActor?: (data: Actor) => void;
}

export interface CustomButtonProps {
  dataId?: string;
  icon: IconProp;
  modalType: string;
  className: string;
  changeModal: (type: string, id: string) => void;
  disabled?: boolean;
}

export interface CustomRadioButtonProps {
  data: string[];
  name: string;
  dataId?: string;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StarRatingsProps {
  ratings?: number;
  changeHandler?: (rate: number) => void;
}
const CustomInput = ({
  type,
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value,
  min,
}: CustomInputProps) => {
  return (
    <div>
      <input
        data-testid={name}
        type={type}
        name={name}
        className={className}
        placeholder={placeHolder}
        hidden={hidden}
        onChange={changeHandler}
        value={value}
        min={min}
      />
    </div>
  );
};

const CustomTextArea = ({
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value,
}: CustomTextareaProps) => {
  return (
    <textarea
      data-testid={name}
      name={name}
      className={className}
      placeholder={placeHolder}
      hidden={hidden}
      onChange={changeHandler}
      value={value}
    />
  );
};

const AutoComplete = ({
  name,
  className,
  placeHolder,
  data,
  changeHandler,
  selectMovie,
  selectActor,
  value,
  type,
  hidden,
}: CustomAutocompleteProps) => {
  const handleClick = (data: Movie | Actor) => {
    if (data) {
      if (type === "Movie" && selectMovie) {
        selectMovie(data as Movie);
      } else if (type === "Actor" && selectActor) {
        selectActor(data as Actor);
      }
    }
  };
  return (
    <div className="autocomplete">
      <input
        data-testid={name}
        className={className}
        name={name}
        placeholder={placeHolder}
        autoComplete="off"
        onChange={changeHandler}
        value={value}
        hidden={hidden}
      />
      <div className="autocomplete-items" hidden={hidden}>
        {data?.map((val, i) => {
          return (
            <div
              key={i}
              className="text-start"
              onClick={() => handleClick(val)}
            >
              {type === "Actor" &&
                `${val["firstName" as keyof typeof val]} ${
                  val["lastName" as keyof typeof val]
                }`}
              {type === "Movie" && `${val["title" as keyof typeof val]}`}
            </div>
          );
        })}
        {data?.length === 0 && value && (
          <div className="text-start">No results found</div>
        )}
      </div>
    </div>
  );
};

const CustomButton = ({
  dataId = "",
  icon,
  modalType,
  changeModal,
  className,
  disabled = true,
}: CustomButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => changeModal(modalType, dataId)}
      disabled={!disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

const CustomRadioButton = ({
  data,
  name,
  value,
  dataId,
  changeHandler,
}: CustomRadioButtonProps) => {
  return (
    <div className="text-start">
      {data.map((gender, i) => {
        return (
          <div className="form-check form-check-inline" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              checked={gender === value}
              value={gender}
              onChange={changeHandler}
            />
            <label className="form-check-label">{gender}</label>
          </div>
        );
      })}
    </div>
  );
};

const StarRatings = ({ ratings, changeHandler }: StarRatingsProps) => {
  return (
    <span>
      {[...Array(5)].map((_, i) => {
        if (ratings && ratings > i) {
          return (
            <span
              key={i}
              className={changeHandler ? "pointer" : ""}
              onMouseEnter={() => {
                if (changeHandler) changeHandler(i);
              }}
            >
              <FontAwesomeIcon icon={faStar} color="yellow" />
            </span>
          );
        } else {
          return (
            <span
              key={i}
              className={changeHandler ? "pointer" : ""}
              onMouseEnter={() => {
                if (changeHandler) changeHandler(i);
              }}
            >
              <FontAwesomeIcon icon={faStar} key={i} />
            </span>
          );
        }
      })}
    </span>
  );
};

export {
  CustomInput,
  CustomTextArea,
  AutoComplete,
  CustomButton,
  CustomRadioButton,
  StarRatings,
};
