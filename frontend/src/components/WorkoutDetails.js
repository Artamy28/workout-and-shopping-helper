import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";

// Date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(workout.title);
	const [load, setLoad] = useState(workout.load);
	const [reps, setReps] = useState(workout.reps);

	const handleClick = async () => {
		if (!user) {
			return;
		}

		const response = await fetch("/api/workouts/" + workout._id, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		const data = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: data });
		}
	};

	const handleEdit = () => {
		setEditing(true);
	};

	const handleCancel = () => {
		setEditing(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			return;
		}

		const editedWorkout = { title, load, reps };

		const response = await fetch("/api/workouts/" + workout._id, {
			method: "PATCH",
			body: JSON.stringify(editedWorkout),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		});

		const data = await response.json();

		if (response.ok) {
			console.log("Workout edited", data);
			dispatch({ type: "UPDATE_WORKOUT", payload: data });
			setEditing(false);
		}
	};

	return (
		<>
			{!editing && (
				<div className="workout-details">
					<h4>{workout.title}</h4>
					<p>
						<strong>Load (kg): </strong>
						{workout.load}
					</p>
					<p>
						<strong>Reps: </strong>
						{workout.reps}
					</p>
					<p>
						{formatDistanceToNow(new Date(workout.createdAt), {
							addSuffix: true,
						})}
					</p>

					<span
						className="material-symbols-outlined delete-icon"
						onClick={handleClick}
					>
						delete
					</span>

					<span
						className="material-symbols-outlined edit-icon"
						onClick={handleEdit}
					>
						edit
					</span>
				</div>
			)}

			{editing && (
				<div className="workout-details">
					<form onSubmit={handleSubmit}>
						<p>
							<strong>Exercise Title:</strong>
							<input
								type="text"
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								value={title}
								placeholder={workout.title}
								required
							/>
						</p>

						<p>
							<strong>Load (kg): </strong>
							<input
								type="number"
								onChange={(e) => {
									setLoad(e.target.value);
								}}
								value={load}
								placeholder={workout.load}
								required
							/>
						</p>

						<p>
							<strong>Reps: </strong>

							<input
								type="number"
								onChange={(e) => {
									setReps(e.target.value);
								}}
								value={workout.reps}
								placeholder={workout.reps}
								required
							/>
						</p>

						<button>Submit</button>
					</form>

					<button className="cancel-button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			)}
		</>
	);
};

export default WorkoutDetails;
