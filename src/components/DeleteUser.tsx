import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteUser } from "../features/user/userAction";

const DeleteUser = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user);
  return (
    <button onClick={() => dispatch(deleteUser(userToken))}>Delete User</button>
  );
};

export default DeleteUser;
