import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header, PrivateRoute } from '@/presentation/components'
import { Login, Register, TaskList } from '@/presentation/pages'
import { makeAuthentication, makeAddAccount, makeLoadTasks, makeAddTask, makeUpdateTask, makeDeleteTask } from '@/main/factories/use-case-factory'
import { makeLoginValidation, makeRegisterValidation } from '@/main/factories/validation-factory'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login authentication={makeAuthentication()} validation={makeLoginValidation()} />} />
        <Route path="/register" element={<Register addAccount={makeAddAccount()} authentication={makeAuthentication()} validation={makeRegisterValidation()} />} />
        <Route path="/" element={
          <PrivateRoute>
            <TaskList 
              loadTasks={makeLoadTasks()}
              addTask={makeAddTask()}
              updateTask={makeUpdateTask()}
              deleteTask={makeDeleteTask()}
            />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
