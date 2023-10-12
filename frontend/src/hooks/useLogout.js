import useAuthContext from "../hooks/useAuthContext";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkoutsContext();

	const logout = () => {
		// Remove the user from local storage
		localStorage.removeItem("user");

		// Update the Auth context
		dispatch({ type: "LOGOUT" });

		// Update the Workouts context
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};

export default useLogout;
