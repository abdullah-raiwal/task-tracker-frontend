import React from "react";
import Card from "../UI/Card";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../Reducers/TaskReducer";
import { addExpense } from "../../Reducers/expenseReducer";
import { useCreateExpenseMutation } from "../../services/expenseApi";
import { getToken } from "../../services/setJWTKeys";

export const ExpenseForm = (props) => {
  const [currTask, setTask] = useState("");
  const [currDate, setDate] = useState("");
  const [currValue, setValue] = useState("");
  const dispatch = useDispatch();
  const [createExpense, responseInfo] = useCreateExpenseMutation();

  const taskHandler = (event) => {
    setTask(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  const SubmitHandler = async(event) => {
    event.preventDefault();

    const { access, refresh, user_id } = getToken();
    const form_data = {
      expense_item: currTask,
      date: new Date(currDate).toISOString(),
      value: currValue,
      user: user_id,
    };
    console.log("in expense form", form_data);

    const response = await createExpense(form_data);
    console.log(response)
    setDate("");
    setTask("");
    setValue("");
  };

  return (
    <Card className=" mt-1  mb-2 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 bg-slate-900 mx-auto">
      <form className="flex flex-col justify-center" onSubmit={SubmitHandler}>
        <div className="flex flex-col mx-10 py-1 ">
          <label className="my-1 text-white font-sans font-bold-400">
            Task
          </label>
          <input
            type="text"
            className="rounded-md py-1"
            placeholder="Enter task"
            onChange={taskHandler}
            value={currTask}
          />
        </div>
        <div className="flex flex-col mx-10 py-1">
          <label className="my-1 text-white font-sans font-bold-400">
            Date
          </label>
          <input
            type="date"
            className="rounded-md py-1"
            placeholder=""
            onChange={dateHandler}
            value={currDate}
          />
        </div>
        <div className="flex flex-col mx-10 py-1">
          <label className="my-1 text-white font-sans font-bold-400">
            Value
          </label>
          <input
            type="text"
            className="rounded-md py-1"
            placeholder="Enter reward"
            onChange={valueHandler}
            value={currValue}
          />
        </div>

        <button
          className="mb-2 mt-2 bg-slate-600 mx-10 rounded-md text-white"
          onClick={props.onCancel}
        >
          Cancel
        </button>

        <button className="mb-2 mt-2 bg-slate-600 mx-10 rounded-md text-white">
          Add Task
        </button>
      </form>
    </Card>
  );
};
