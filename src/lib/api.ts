const API_URL = 'https://todo-worker.jrbofficial31.workers.dev';
// const API_URL = 'http://127.0.0.1:8787'

export const fetchTodos = async () => {
  const res = await fetch(`${API_URL}/todos`)
  console.log(res);
  return res.json()
}

export const createTodo = async (title: string) => {
  await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
}

export const updateTodo = async (id: number, title: string, completed: boolean) => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed }),
  })
}

export const deleteTodo = async (id: number) => {
  await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' })
}
