import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  saveUserInfo,
  updateUserInfo,
} from "../../features/user_info/userInfoAction";

export type userData = {
  first_name: string;
  last_name: string;
  mob_no: string;
  dob: string;
  weight: number;
  height: number;
  country_origin: string;
  is_diabetic: boolean;
  has_cardiac_issues: boolean;
  has_bp_issue: boolean;
};

const PersonalDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();

  const { userToken } = useSelector((state: RootState) => state.user);
  const data = useSelector((state: RootState) => state.userInfo);

  console.log("🚀 ~ data", data.res);

  const { res } = data;

  let body = {
    first_name: "",
    last_name: "",
    mob_no: "",
    dob: "",
    weight: 0,
    height: 0,
    country_origin: "",
    is_diabetic: false,
    has_cardiac_issues: false,
    has_bp_issue: false,
  };

  if (res) {
    body = {
      first_name: res["first_name"],
      last_name: res["last_name"],
      mob_no: res["mob_no"],
      dob: res["dob"],
      weight: res["weight"],
      height: res["height"],
      country_origin: res["country_origin"],
      is_diabetic: res["is_diabetic"],
      has_cardiac_issues: res["has_cardiac_issues"],
      has_bp_issue: res["has_bp_issue"],
    };
  }

  const {
    first_name,
    last_name,
    mob_no,
    dob,
    weight,
    height,
    country_origin,
    is_diabetic,
    has_cardiac_issues,
    has_bp_issue,
  } = body;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (userData: userData) => {
    console.log("provided data", userData);
    if (!res) {
      let body = {
        userInfo: userData,
        userToken,
      };
      dispatch(saveUserInfo(body));
    } else {
      let body = {
        userInfo: userData,
        userToken,
      };
      dispatch(updateUserInfo(body));
    }
    navigate("/family_info");
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name:
        <input
          defaultValue={first_name}
          {...register("first_name", { required: true, maxLength: 30 })}
          type="text"
        />
        <p>
          {errors.first_name && errors.first_name.type === "required" && (
            <span>This is required</span>
          )}
          {errors.first_name && errors.first_name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </p>
      </label>
      <label>
        Last Name:
        <input
          defaultValue={last_name}
          {...register("last_name", { required: true, maxLength: 30 })}
          type="text"
        />
        <p>
          {errors.last_name && errors.last_name.type === "required" && (
            <span>This is required</span>
          )}
          {errors.last_name && errors.last_name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </p>
      </label>
      <label>
        Mobile No:
        <input
          defaultValue={mob_no}
          {...register("mob_no", {
            required: true,
          })}
          type="tel"
          minLength={10}
          maxLength={10}
        />
        <p>
          {errors.mob_no && errors.mob_no.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        DOB:
        <input
          defaultValue={dob}
          {...register("dob", { required: true })}
          type="date"
          max={new Date().toISOString().slice(0, 10)}
        />
        <p>
          {errors.dob && errors.dob.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Weight (in Kgs):
        <input
          defaultValue={weight}
          {...register("weight", { required: true })}
          type="number"
        />
        <p>
          {errors.weight && errors.weight.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Height (in meters):
        <input
          defaultValue={height}
          {...register("height", { required: true })}
          type="number"
        />
        <p>
          {errors.height && errors.height.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Country of Origin:
        <input
          defaultValue={country_origin}
          {...register("country_origin", { required: true, maxLength: 30 })}
          type="text"
        />
        <p>
          {errors.country_origin &&
            errors.country_origin.type === "required" && (
              <span>This is required</span>
            )}
          {errors.country_origin &&
            errors.country_origin.type === "maxLength" && (
              <span>Max length exceeded</span>
            )}
        </p>
      </label>
      <label>
        <div>
          <p>Are you Diabetic?:</p>
          <input
            defaultChecked={is_diabetic}
            {...register("is_diabetic")}
            type="checkbox"
          />
        </div>
      </label>
      <label>
        <div>
          <p>Do you have any Cardiac Issues?:</p>
          <input
            defaultChecked={has_cardiac_issues}
            {...register("has_cardiac_issues")}
            type="checkbox"
          />
        </div>
      </label>
      <label>
        <div>
          <p>Do you have High BP?:</p>
          <input
            defaultChecked={has_bp_issue}
            {...register("has_bp_issue")}
            type="checkbox"
          />
        </div>
      </label>
      <button type="submit">Proceed</button>
    </form>
  );
};

export default PersonalDetails;
