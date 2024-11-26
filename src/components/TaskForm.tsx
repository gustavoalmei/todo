import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import Style from './TaskForm.module.css'

import { ITask } from '../interfaces/Task';

type Props = {
  btnText: string,
  TaskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>; // é usado principalmente em conjunto com o Hook useState para tipar funções de atualização de estado.
  task?: ITask | null,
  handleUpdate?(id:number, title:string, difficulty: number): void
}

export default function TaskForm({btnText, TaskList, setTaskList, task, handleUpdate}: Props) {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(0);
  
  const addTaskHandler = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(handleUpdate){
      handleUpdate(id, title, difficulty);
    }else{
      const id = Math.floor(Math.random() * 100);
      const newTask:ITask = {id, title, difficulty};
      
      setTaskList!([...TaskList, newTask]);
      
      setTitle('');
      setDifficulty(0);
    }
  }
  useEffect(()=>{
  if(task){
    setId(task.id);
    setTitle(task.title);
    setDifficulty(task.difficulty);
  }
  }, [task])
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{ //Define que a função irá receber um evento de um elemento HTML do tipo input
    if(e.target.name == "title"){
      setTitle(e.target.value)
    }else{
      setDifficulty(parseInt(e.target.value));
    }
  }

  return (
    <form className={Style.form} onSubmit={addTaskHandler}>
      <div className={Style.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name='title'
          placeholder='Titulo da tarefa'
          value={title}
          onChange={handleChange}/>
      </div>
      <div className={Style.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="text"
          name='difficulty'
          placeholder='Dificuldade da tarefa'
          value={difficulty}
          onChange={handleChange}/>
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}