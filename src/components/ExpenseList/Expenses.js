import React from "react";
import { ExpenseItem } from "./ExpenseItem";
import Card from "../UI/Card";
import { useGetAllExpenseQuery } from "../../services/expenseApi";
import { useSelector } from "react-redux";

const Expenses = (props) => {
  const { data, error, isLoading } = useGetAllExpenseQuery();
  {
    if (isLoading) {
      return (
        <div>
          <Card>data loading</Card>
        </div>
      );
    }
  }

  if (error){
    return (
      <div>
        <Card>no task found</Card>
      </div>
    )
  }


  const filtereditems = data.filter((expense) => {
    return new Date(expense.date).getFullYear().toString() === props.year;
  });

  {
    if (filtereditems.length === 0 || data === null) {
      return (
        <div className="flex flex-col justify-center items-center">
          <Card className=" bg-slate-900 py-2 mb-1 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 ">
            <p className="text-white text-center">
              No task found for selected year
            </p>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {filtereditems.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          item={expense.expense_item}
          date={expense.date}
          value={expense.value}
        ></ExpenseItem>
      ))}
    </div>
  );
};

export default Expenses;
