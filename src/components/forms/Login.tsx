import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { loginUser, registerUser } from "../../features/user/userAction";

export type authData = {
  email: string;
  password: number;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authData>();

  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { success, userInfo } = useSelector((state: any) => state.user);

  const onSubmit = async (data: authData) => {
    if (showLogin) {
      data.email = data.email.toLowerCase();
      dispatch(loginUser(data));

      // console.log(data);
      // try {
      //   const res = await axios.post("/auth/login", data);
      //   console.log("🚀 ~ res", res);
      //   if (!res?.data?.success) toast.error(res?.data?.message);
      //   // navigate("/personal_info");
      // } catch (error: unknown) {
      //   const err = error as AxiosError;
      //   toast.error(err?.message);
      // }
    } else {
      data.email = data.email.toLowerCase();
      dispatch(registerUser(data));
    }
  };

  useEffect(() => {
    if (success && showLogin) navigate("/personal_info");

    return () => {};
  }, [success, showLogin]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input {...register("email", { required: true })} type="email" />
        <p>
          {errors.email && errors.email.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      <label>
        Password:
        <input {...register("password", { required: true })} type="password" />
        <p>
          {errors.password && errors.password.type === "required" && (
            <span>This is required</span>
          )}
        </p>
      </label>
      {showLogin ? (
        <button type="submit">Login</button>
      ) : (
        <button type="submit">Register</button>
      )}
      <p>
        No Account?{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowLogin(!showLogin)}
        >
          Click here to register
        </span>
      </p>
    </form>
  );
};

export default Login;
