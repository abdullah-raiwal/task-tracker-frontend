import React from "react";
import Card from "../UI/Card";
import { deleteTask } from "../../Reducers/TaskReducer";
import { useDispatch } from "react-redux";
import { useDeleteExpenseMutation } from "../../services/expenseApi";

export const ExpenseItem = (props) => {
  const [deleteExpense, responseInfo] = useDeleteExpenseMutation();
  const date = new Date(Date.parse(props.date));

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  const deleteHandler = async () => {
    await deleteExpense(props.id);
  };

  return (
    <Card className=" bg-slate-900 py-2 mb-1 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 ">
      <div className="grid grid-cols-4 ">
        <div className="mr-0 ml-0">
          <Card className="bg-white grid-rows-3 m-3 w-20 text-center">
            <div>
              <div className="text-black">{month}</div>
              <div className="font-bold text-black">{day}</div>
              <div className="text-black">{year}</div>
            </div>
          </Card>
        </div>

        <div className="mr-0 ml-0 text-white">
          <p className="font-sans  text-sm">{props.item}</p>
        </div>

        <div className="my-auto mx-5">
          <Card className="bg-red-700 py-2">
            <div className="text-center text-white">${props.value}</div>
          </Card>
        </div>

        <div className="my-auto mx-5">
          <Card className="bg-red-700">
            <button
              className="rounded-md px-1 py-1 text-white"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </Card>
        </div>
      </div>
    </Card>
  );
};
