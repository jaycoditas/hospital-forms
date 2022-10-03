import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { savefamilyInfo } from "../../features/family_info/familyInfoAction";

export type familyData = {
  father_name: string;
  father_age: number;
  father_origin: string;
  mother_name: string;
  mother_age: number;
  mother_origin: string;
  isParentDiabetic: boolean;
  parentHasCardiacIssue: boolean;
  parentHasBPIssue: boolean;
};

const FamilyDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<familyData>();

  const { userToken } = useSelector((state: RootState) => state.user);
  const { success } = useSelector((state: RootState) => state.familyInfo);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: familyData) => {
    console.log(data);
    let body = {
      familyInfo: data,
      userToken,
    };
    dispatch(savefamilyInfo(body));
    // navigate("/cards_info");
  };

  useEffect(() => {
    if (success) navigate("/delete_user");

    return () => {};
  }, [success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Father Name:
        <input
          {...register("father_name", { required: true, maxLength: 50 })}
          type="text"
        />
        <p>
          {errors.father_name && errors.father_name.type === "required" && (
            <span>This is required</span>
          )}
          {errors.father_name && errors.father_name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </p>
      </label>
      <label>
        Father Age:
        <input {...register("father_age", { required: true })} type="number" />
        <p>
          {errors.father_age && errors.father_age.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Father's Origin:
        <input
          {...register("father_origin", { required: true, maxLength: 50 })}
          type="text"
        />
        <p>
          {errors.father_origin && errors.father_origin.type === "required" && (
            <span>This is required</span>
          )}
          {errors.father_origin &&
            errors.father_origin.type === "maxLength" && (
              <span>Max length exceeded</span>
            )}
        </p>
      </label>
      <label>
        Mother Name:
        <input
          {...register("mother_name", { required: true, maxLength: 50 })}
          type="text"
        />
        <p>
          {errors.mother_name && errors.mother_name.type === "required" && (
            <span>This is required</span>
          )}
          {errors.mother_name && errors.mother_name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </p>
      </label>
      <label>
        Mother Age:
        <input {...register("mother_age", { required: true })} type="number" />
        <p>
          {errors.mother_age && errors.mother_age.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Mother's Origin:
        <input
          {...register("mother_origin", { required: true, maxLength: 50 })}
          type="text"
        />
        <p>
          {errors.mother_origin && errors.mother_origin.type === "required" && (
            <span>This is required</span>
          )}
          {errors.mother_origin &&
            errors.mother_origin.type === "maxLength" && (
              <span>Max length exceeded</span>
            )}
        </p>
      </label>

      <label>
        <div>
          <p>Is any of your parent Diabetic?:</p>
          <input {...register("isParentDiabetic")} type="checkbox" />
        </div>
      </label>
      <label>
        <div>
          <p>Does any of your parent have any Cardiac Issues?:</p>
          <input {...register("parentHasCardiacIssue")} type="checkbox" />
        </div>
      </label>
      <label>
        <div>
          <p>Does any of your parent have High BP?:</p>
          <input {...register("parentHasBPIssue")} type="checkbox" />
        </div>
      </label>
      <button type="submit">Proceed</button>
    </form>
  );
};

export default FamilyDetails;
