"use client";
import { useEffect, useState } from 'react'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../lib/api'

type Todo = {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos().then(setTodos)
  }, [])

  const addTodo = async () => {
    await createTodo(newTodo)
    setNewTodo('')
    setTodos(await fetchTodos())
  }

  const toggleTodo = async (todo: Todo) => {
    await updateTodo(todo.id, todo.title, !todo.completed)
    setTodos(await fetchTodos())
  }

  const removeTodo = async (id: number) => {
    await deleteTodo(id)
    setTodos(await fetchTodos())
  }

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='New todo...' className='border px-2 py-1 mt-4' />
      <button onClick={addTodo} className='ml-2 px-4 py-1 bg-blue-500 text-white'>Add</button>
      <ul className='mt-6'>
        {todos.map((todo) => (
          <li key={todo.id} className='flex items-center justify-between'>
            <label>
              <input type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo)} />
              <span className={todo.completed ? 'line-through ml-2' : 'ml-2'}>{todo.title}</span>
            </label>
            <button onClick={() => removeTodo(todo.id)} className='text-red-500'>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
