import { useState } from 'react';
import classes from "./Form.module.css"

const Form = ({handlerTodo}) => {
    const [formValue, setFormValue] = useState({
        name: "",
        description: "",
        deadline: "",
        isDone: false
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
            handlerTodo({ ...formValue, createDate: new Date() })
            setFormValue({ name: "", description: "", deadline: "" });
        }}>
            <input 
                name="name" 
                placeholder="Введите название... " 
                maxLength="80"
                value={formValue.name} 
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
                    className={classes.calendar}
                    name="deadline" 
                    id="deadline"
                    value={formValue.deadline} 
                    onChange={ (e) => handlerChange(e) } 
                    type="datetime-local" min={new Date()}
                    required
                />
                <button className={classes.add_todo} type="submit">Добавить</button>
            </div>
           
       
    </form>
  )
};

export default Form;