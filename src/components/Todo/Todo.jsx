import React, { useState } from 'react';

import Change from "../../assets/icons/change.svg?react"; 
import Delete from "../../assets/icons/delete.svg?react"; 
import classes from "./Todo.module.css";
import EditTodo from "../EditTodo";
import { updateFormatDate } from "../utills";

const Todo = (props) => {
  const { id, name, description, deadline, isDone, handleCHange, handleDeleteItem, handleUpdateItem, count } = props;
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return <EditTodo {...props} handleReset={() => setIsEdit(false)} handleUpdateItem={handleUpdateItem} handleChangeEdit={() => setIsEdit(false)} />
  }
  return (
    <div className={`${classes.item} ${isDone ? classes.item_comleted : ""}` }>
      <div className={classes.main}>
        <div className={classes.name}><span className={classes.count}>{`${count}.`}</span>{name}</div> 
        <div className={classes.actions}>
          <div className={classes.done}>
            <input name="isDone" type="checkbox" checked={isDone} onChange={(e) => handleCHange(e, id)} />
          </div>
          <div className={classes.change} onClick={() => setIsEdit(true)}>
              <Change />
          </div>
          <div className={classes.remove} onClick={() =>  handleDeleteItem(id)}>
             <Delete />
          </div>
        </div>
      </div>
        {description && <div className={classes.description}>{description}</div> }
        <div className={classes.deadline}>Выполнить: {updateFormatDate(deadline)}</div>
    </div>
  )
};

export default Todo;