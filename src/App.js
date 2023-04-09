import { useState, useEffect } from "react";
import "./App.css";
import { NewTask } from "./components/ExpenseForm/NewTask";
import Expenses from "./components/ExpenseList/Expenses";
import FilterExpense from "./components/ExpenseList/FilterExpense";
import { useGetAllExpenseQuery } from "./services/expenseApi";
import Card from "./components/UI/Card";
import Navbar from "./components/Navbar/Navbar";
import { getToken } from "./services/setJWTKeys";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "./Reducers/AuthReducer";

function App() {
  const [currYear, setYear] = useState("2020");
  const dispatch = useDispatch();

  // from state
  const accessToken = useSelector((state) => state.auth.access_token);
  console.log("app.js", accessToken);

  // local storage
  const { access } = getToken();

  useEffect(() => {
    const stored_year = localStorage.getItem("selected_year");
    dispatch(setAccessToken({ access: access }));
    if (stored_year) {
      setYear(stored_year);
    }
  }, [currYear, access, dispatch]);

  const filteredYearHandler = (year) => {
    localStorage.setItem("selected_year", year);
    setYear(year);
  };

  return (
    <div className="">
      <div>
        <Navbar> </Navbar>
      </div>

      {accessToken && (
        <div>

          {/* new task form  */}
          <div>
            <NewTask year={currYear}></NewTask>
          </div>
          {/* filter expense button */}
          <div>
            <FilterExpense
              onchangeFilter={filteredYearHandler}
              selected_year={currYear}
            ></FilterExpense>
          </div>

          {/* expenses list */}
          <div>
            <Expenses year={currYear} />
          </div>

        </div>
      )}
    </div>
  );
}
export default App;
