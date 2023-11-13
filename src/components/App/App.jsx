import { useEffect, useState } from 'react';
import classes from "./App.module.css"
import Form from "../Form"
import Todo from "../Todo";
import { renderPhrase, sendTaskNotification, updateFormatDate } from "../utills";

function App() {
  const [todos, setTodos] = useState([]);
  const [valueSort, setValueSort] = useState("deadline");


  useEffect(() => {
    const todosValue = JSON.parse(localStorage.getItem("todos"));
    if (todosValue) setTodos(sortTodos(todosValue));
  }, []);

  useEffect(() => {
    const timersArr = [];
    if (todos?.length) {
      todos.forEach(todo => {
        const now = new Date();
        const deadline = new Date(todo.deadline).getTime();
        const daysUntilDue = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
        const title = `Cрок выполнения задачи: ${todo.name}`;
          const options = {
            body: `У вас осталось ${daysUntilDue} ${renderPhrase(daysUntilDue)}. Дедлайн: ${updateFormatDate(todo.deadline)}`
          };
        if (daysUntilDue <= 3 && daysUntilDue >= 0 && !todo.isDone) {
          sendTaskNotification(title, options);
          const timer = setTimeout(() => {
            sendTaskNotification(title, options);
          }, new Date(todo.deadline) - now);
          timersArr.push(timer);
        } else if (!todo.isDone && daysUntilDue >= 0) {
          const timer = setTimeout(() => {
            sendTaskNotification(title, options);
          }, new Date(!todo.deadline) - now);
          timersArr.push(timer);
        }
      })
    }

    return () => {
      timersArr.forEach(timer => clearTimeout(timer));
    }
  },[todos]);

  function sortTodos(arr, sort = valueSort) {
      const arrValue = [...arr].sort((a, b) => {
        const aValue = sort === "date" ? new Date(a.createDate).getTime() : new Date(a.deadline).getTime();
        const bValue = sort === "date" ? new Date(b.createDate).getTime() : new Date(b.deadline).getTime();
        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
      });
      return arrValue;
  }

  function handlerTodo(iTodo) {
    const newValueTodos = [ ...todos, { ...iTodo, id: new Date().getTime() }];
    setTodos(sortTodos(newValueTodos));
    localStorage.setItem("todos", JSON.stringify(newValueTodos));
  }

  function handleUpdateItem (obj) {
    const newValueTodos = todos.map(item => item.id === obj.id ? obj : item);
    setTodos(sortTodos(newValueTodos)); 
    localStorage.setItem("todos", JSON.stringify(newValueTodos));
  }

  function handleCHangeItem(e, id) {
    const newValueTodos = todos.map(item => {
      if (item.id === id) {
        const { type } = e.target;
        item[e.target.name] = type === 'checkbox' ? e.target.checked : e.target.value;
        return item;
      }
      return item;
    })
    setTodos(newValueTodos);
    localStorage.setItem("todos", JSON.stringify(newValueTodos));
  }

  function handleDeleteItem(id) {
    const newValueTodos = todos.filter(item => item.id !== id);
    setTodos(sortTodos(newValueTodos));
    localStorage.setItem("todos", JSON.stringify(newValueTodos));
  }

  function handleSortList(e) {
    setValueSort(e.target.value);
    setTodos(prev => sortTodos(prev, e.target.value));
  }


  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Планировщик задач</h1>
     <Form handlerTodo={(prop) => handlerTodo(prop)} />
     <div className={classes.main}>
      <h2 className={classes.main__title}>Список задач:</h2>
      {
        todos?.length > 0 && 
        <div className={classes.sort}>
          <label> 
            Сортировать по дате: 
            <select value={valueSort} onChange={(e) => handleSortList(e)} name="sort" id="sort">
              <option value="date">создания</option>
              <option value="deadline">выполнения</option>
            </select>
          </label>
        </div>
      }
      {
        todos?.length > 0 && 
        <ul className={classes.list}>
          {todos.map((todo, index) => (<Todo key={todo.id} count={ index + 1 } { ...todo } handleUpdateItem={handleUpdateItem} handleCHange={handleCHangeItem} handleDeleteItem={handleDeleteItem} />)) }
        </ul>   
      }
      {
        todos?.length === 0 && <h4 className={classes.list_empty}>Список задач пока пуст</h4>
      }
     </div>
    </div>
  )
}

export default App
