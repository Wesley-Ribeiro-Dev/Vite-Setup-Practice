import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ModalContent() {
  return <p>Unfortunately an unexpected error ocurred ;C</p>
}

function App() {
  const [todos, setTodos] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    loadDataFromTodoAPI();
  }, []);

  function loadDataFromTodoAPI() {
    const URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${URL}/todos`)
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((e) => {
        MySwal.fire({
          title: "Oops...",
          html: <ModalContent />,
          text: e.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  }

  return (
    <>
      {todos.length > 0 ? (
        <>
          <ul>
            {todos.map((todo, i) => {
              return (
                <li key={i}>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  {todo.title}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No todos found!</p>
      )}
    </>
  );
}

export default App;
