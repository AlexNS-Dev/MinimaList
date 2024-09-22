import useTodoStore, { TodoList } from '../../store/todoStore';
import './TodoSection.css'
import React, { FormEvent, useMemo, useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface TodoSectionProps {
    selectedList: TodoList | null,
}

const TodoSection: React.FC<TodoSectionProps> = ({ selectedList }) => {
    const [taskInput, setTaskInput] = useState('')
    const addTask = useTodoStore((state) => state.addTask)
    const removeTask = useTodoStore((state) => state.removeTask)
    const todoLists = useTodoStore((state) => state.todoLists)

    const currentList = useMemo(() => {
        return todoLists.find(list => list.id === selectedList?.id) || null;
    }, [todoLists, selectedList]);

    const handleTaskSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (taskInput === '' || taskInput === undefined || !selectedList) return

        try {
            addTask(selectedList.id, taskInput)
            setTaskInput('')
        } catch (e) {
            throw new Error((e as Error).message)
        }
    }
    const handleRemoveTask = (taskId: number) => () => {
        try {
            if (selectedList) {
                removeTask(selectedList.id, taskId)
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    if (todoLists.length === 0) return (
        <section className="TodoSection">
            <div className="content">
                <h2>No lists available</h2>
            </div>
        </section>
    )
    
    if (!currentList) return (
        <section className="TodoSection">
            <div className="content">
                <h2>Loading...</h2>
            </div>
        </section>
    )

    return (
        <section className='TodoSection'>
            <div className="content">

                <h2>{currentList.title}</h2>

                <form className='task-input' onSubmit={handleTaskSubmit}>
                    <input
                        type="text"
                        placeholder='New Task'
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)} />
                    <button type='submit'>Add Task</button>
                </form>

                {currentList.items.length > 0 &&
                    <ul>
                        {currentList.items.map((task) =>
                            <li key={task.id}>
                                {task.title}
                                <input type="checkbox" checked={task.isCompleted} onChange={() => { /* Handle task completion status change */ }} />
                                <button onClick={handleRemoveTask(task.id)}>
                                    <IoClose />
                                </button>
                            </li>
                        )}
                    </ul>
                }
            </div>
        </section>
    )
}

export default TodoSection;