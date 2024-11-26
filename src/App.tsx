import React, { useState } from 'react';
import style from './App.module.css';

import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

import { ITask } from './interfaces/Task';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  const deleteTask = (id: number)=>{
    setTaskList(
      taskList.filter((item)=>{
        return item.id !== id;
      })
    )
  }

  const ShowOrHide = (param: boolean)=>{
    const modal = document.querySelector('#modal');
    if(param){
      modal!.classList.add('hide')
    }else{
      modal!.classList.remove('hide')
    }
  }
  const handleEdit = (task: ITask): void=>{
    ShowOrHide(false)
    setTaskToUpdate(task);
  }

  const updateTask = (id:number, title:string, difficulty: number): void =>{
    const updatedTask:ITask = {id, title, difficulty};
    const searchTask = taskList.map(item =>{
      return item.id === updatedTask.id ? updatedTask : item;
    })
    setTaskList(searchTask);
    ShowOrHide(true);
  }

  return (
    <div>
      <Modal hidden={ShowOrHide} children={<TaskForm btnText='Criar Tarefa' TaskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header/>
      <main className={style.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm
            btnText='Criar Tarefa'
            TaskList={taskList}
            setTaskList={setTaskList}/>
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList TaskList={taskList} handleDelete={deleteTask} handleEdit={handleEdit}/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default App
