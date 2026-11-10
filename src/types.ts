// Shared types. TodoList owns the data; the child components only read it.
export type Task = {
  id: number
  text: string
  done: boolean
}
