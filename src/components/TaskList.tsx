import React from 'react'
import Style from "./TaskList.module.css"

import { ITask } from '../interfaces/Task'

type Props = {
  TaskList: ITask[],
  handleDelete(id: number):void,
  handleEdit(task: ITask): void
}

export default function TaskList({TaskList, handleDelete, handleEdit}: Props) {
  return (
    <>
      {
        TaskList.length > 0 ? (
          TaskList.map((item) =>(
            <div key={item.id} className={Style.task}>
              <div className={Style.details}>
                <h4>{item.title}</h4>
                <p>{item.difficulty}</p>
              </div>
              <div className={Style.actions}>
                <i className="bi bi-pencil" onClick={()=>{ handleEdit(item)}}></i>
                <i className="bi bi-trash" onClick={()=>{handleDelete(item.id)}}></i>
              </div>
            </div>
          ))
        ):(
          <p>Não há tarefas cadastradas.</p>
        )
      }
    </>
  )
}