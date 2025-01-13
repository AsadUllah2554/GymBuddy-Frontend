import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

// Workout Form Component
const WorkoutForm = ({ isOpen, onClose, initialData = null }) => {
  const {
    dispatch,
    title,
    setTitle,
    load,
    setLoad,
    reps,
    setReps,
    error,
    setError,
    emptyFields,
    setEmptyFields,
    workoutID,
    update,
  } = useWorkoutsContext();
  
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a workout");
      return;
    }

    const workout = { title, load, reps };

    try {
      if (!update) {
        const response = await fetch(`${process.env.SERVER_URL}/api/workouts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(workout),
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
          return;
        }

        dispatch({ type: "CREATE_WORKOUT", payload: json });
      } else {
        const response = await fetch(
          `${process.env.SERVER_URL}/api/workouts/${workoutID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(workout),
          }
        );
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
          return;
        }

        dispatch({ type: "UPDATE_WORKOUT", payload: json });
      }

      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {!update ? "Add New Workout" : "Update Workout"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Exercise Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
              emptyFields.includes("title") ? "border-red-500" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Load (in kg):
          </label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className={`mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
              emptyFields.includes("load") ? "border-red-500" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reps:
          </label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={`mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
              emptyFields.includes("reps") ? "border-red-500" : ""
            }`}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          {!update ? "Add Workout" : "Update Workout"}
        </button>
      </form>
    </Modal>
  );
};

// Workout Details Component
const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch, setUpdate, setworkoutID } = useWorkoutsContext();
  
  const handleDelete = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/api/workouts/${workout._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  const handleUpdate = () => {
    if (!user) return;
    setUpdate(true);
    setworkoutID(workout._id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{workout.title}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-gray-600">
              <span className="font-medium">Load:</span> {workout.load} kg
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Reps:</span> {workout.reps}
            </p>
            <p className="text-gray-500 text-sm">
              <Calendar className="w-4 h-4 inline mr-1" />
              {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleUpdate}
            className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Workout List Container
const WorkoutContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { workouts } = useWorkoutsContext();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Workouts</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Workout</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts?.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>

      <WorkoutForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export { WorkoutContainer, WorkoutDetails, WorkoutForm };