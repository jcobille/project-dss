import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actor, Movie } from "../../utils/types";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
  testId?: string;
  icon: IconProp;
  modalType?: string;
  className: string;
  action?: string;
  onClickHandler?: (id: string, action: string) => void;
  disabled?: boolean;
}

export interface CustomRadioButtonProps {
  data: string[];
  name: string;
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
        aria-label={name}
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
      aria-label={name}
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
  value,
  type,
  hidden,
}: CustomAutocompleteProps) => {
  return (
    <div className="autocomplete">
      <input
        aria-label="search"
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
            <Link to={`/${type}/details/${val.id}`} className="link" key={i}>
              <div className="text-start" data-testid="dataSelection">
                {type === "movie" && `${val["title" as keyof typeof val]}`}
                {type === "actor" &&
                  `${val["firstName" as keyof typeof val]} ${
                    val["lastName" as keyof typeof val]
                  }`}
              </div>
            </Link>
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
  icon,
  dataId,
  testId,
  onClickHandler,
  className,
  disabled = true,
  action,
}: CustomButtonProps) => {
  return (
    <button
      className={className}
      data-testid={testId}
      onClick={() => {
        if (onClickHandler && dataId && action) onClickHandler(dataId, action);
      }}
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
  changeHandler,
}: CustomRadioButtonProps) => {
  return (
    <div className="text-start">
      {data.map((gender, i) => {
        return (
          <div className="form-check form-check-inline" key={i}>
            <label className="form-check-label">
              <input
                aria-label={name}
                className="form-check-input"
                type="radio"
                name={name}
                checked={gender === value}
                value={gender}
                onChange={changeHandler}
              />
              {gender}
            </label>
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
