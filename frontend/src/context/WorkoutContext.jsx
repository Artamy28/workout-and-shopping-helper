import { createContext, useReducer } from "react";

const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
	switch (action.type) {
		case "SET_WORKOUTS":
			return {
				workouts: action.payload,
			};

		case "CREATE_WORKOUT":
			return {
				workouts: [action.payload, ...state.workouts],
			};

		case "DELETE_WORKOUT":
			return {
				workouts: state.workouts.filter((w) => w._id !== action.payload._id),
			};
		case "UPDATE_WORKOUT":
			const index = state.workouts.findIndex(
				(w) => w._id === action.payload._id
			);
			state.workouts[index] = action.payload;

			return {
				workouts: state.workouts,
			};
		default:
			return state;
	}
};

const WorkoutsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

	return (
		<WorkoutsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	);
};

export { WorkoutsContext, WorkoutsContextProvider, workoutsReducer };
