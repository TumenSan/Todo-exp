import React, { useState } from "react";

import "./TaskPanel.css";

export default function TaskPanel() {
  const [task, setTask] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setEditing] = useState(false);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  //tasks[tasks.length - 1].id + 1
  function addTask(name) {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 0,
      name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("new-todo-input").value = "";
    addTask(task);
    //setTasks([...tasks, task]);
  };

  const ClearAllTasks = (e) => {
    e.preventDefault();
    setTasks([]);
  };

  const ClearTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  };

  const EditTask = (id) => {
    /*
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        item.name = "12345";
        return item;
      } else {
        return item;
      }
    });
    console.log("123 " + newTasks);
    setTasks(newTasks);
    */
    setEditing(true);
  };

  const handleSubmitEdit = (props) => {
    const newTasks = tasks.map((item) => {
      if (item.id === props.id) {
        item.name = task;
        return item;
      } else {
        return item;
      }
    });
    setTasks(newTasks);
    setEditing(false);
  };

  const handleChangeEdit = (e) => {
    setTask(e.target.value);
  };

  const handleCheckboxChange = (props) => {
    const newTasks = tasks.map((item) => {
      if (item.id === props.id) {
        item.completed = !props.completed;
        return item;
      } else {
        return item;
      }
    });
    setTasks(newTasks);
  };

  const CheckTask = () => {
    //const newTasks = tasks.filter((item) => item.id !== id);
    //tasks
    //tasks.filter((item) => item.id !== id);
    return (
      <>
        <ul className="todo-list stack-large stack-exception">
          {tasks.map((item) => (
            <li key={item.id} id={item.name} className="todo stack-small">
              <div className="c-cb">
                <input
                  id={item.id}
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={() => handleCheckboxChange(item)}
                />
                <label className="todo-label" htmlFor="todo-0">
                  {item.name}
                </label>
              </div>
              <br />
              <div>{isEditing ? null : buttons(item)}</div>
              <div className="todo">
                {isEditing ? editingTemplate(item) : null}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const NotCheckTask = () => {};

  const editingTemplate = (props) => (
    <form onSubmit={() => handleSubmitEdit(props)} className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name: {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={handleChangeEdit}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden"></span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save new name
          <span className="visually-hidden"></span>
        </button>
      </div>
    </form>
  );

  const buttons = (item) => (
    <>
      <button
        type="button"
        onClick={() => EditTask(item.id)}
        className="btn toggle-btn"
      >
        edit
      </button>
      <button
        type="button"
        onClick={() => ClearTask(item.id)}
        className="btn toggle-btn"
      >
        delete
      </button>
    </>
  );

  return (
    <div className="todoapp stack-large">
      <h2> To do list </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Добавить
        </button>
      </form>
      <button
        type="button"
        onClick={ClearAllTasks}
        className="btn btn__primary btn__lg"
      >
        удалить всё
      </button>
      <button
        type="button"
        onClick={() => CheckTask()}
        className="btn todo-cancel"
      >
        сделано
      </button>
      <button
        type="button"
        onClick={() => NotCheckTask()}
        className="btn todo-cancel"
      >
        Надо сделать
      </button>
      <ul className="todo-list stack-large stack-exception">
        {tasks.map((item) => (
          <li key={item.id} id={item.name} className="todo stack-small">
            <div className="c-cb">
              <input
                id={item.id}
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => handleCheckboxChange(item)}
              />
              <label className="todo-label" htmlFor="todo-0">
                {item.name}
              </label>
            </div>
            <br />
            <div>{isEditing ? null : buttons(item)}</div>
            <div className="todo">
              {isEditing ? editingTemplate(item) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
