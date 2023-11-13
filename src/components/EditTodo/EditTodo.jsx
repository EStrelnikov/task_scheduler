import React, { useState } from 'react';
import classes from "./EditTodo.module.css"

const EditTodo = (props) => {
    const { 
        handleUpdateItem,
        id,
        name, 
        description, 
        deadline, 
        isDone,
        createDate,
        handleChangeEdit,
        handleReset
    } = props;
    const [formValue, setFormValue] = useState({
        id,
        name,
        description,
        deadline,
        isDone,
        createDate
    })

    const handlerChange = (e) => {
        const name = e.target.name;
        setFormValue(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    return (
        <form 
            className={classes.form}
            onSubmit={ (e) => {
                e.preventDefault();
                handleUpdateItem({ ...formValue })
                handleChangeEdit();
            }}>
                <input 
                    name="name" 
                    placeholder="Введите название... " 
                    value={formValue.name} 
                    maxLength="80"
                    onChange={ (e) => handlerChange(e) } 
                    type="text" 
                    required 
                />
                <textarea  
                    name="description" 
                    maxLength="400" 
                    value={formValue.description} 
                    onChange={ (e) => handlerChange(e) } 
                    placeholder="Введите описание..."
                    type="text" 
                />
                <div className={classes.footer}>
                    <label htmlFor="deadline">Выполнить: </label>
                    <input 
                        name="deadline" 
                        id="deadline"
                        value={formValue.deadline} 
                        onChange={ (e) => handlerChange(e) } 
                        type="datetime-local" 
                        required
                    />
                    <button className={classes.change_todo} onClick={handleReset} type="button">Отмена</button>
                    <button className={classes.change_todo} type="submit">Изменить</button>
                </div>
            
        
        </form>
    )
};

export default EditTodo;