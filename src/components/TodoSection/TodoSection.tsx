import useTodoStore, { TodoList } from '../../store/todoStore';
import { capitalize } from '../../utils/helpers';
import './TodoSection.css'
import React, { FormEvent, useMemo, useState } from 'react'
import ItemList from '../ItemList/ItemList';

interface TodoSectionProps {
    selectedList: TodoList | null,
}

const TodoSection: React.FC<TodoSectionProps> = ({ selectedList }) => {
    const [taskInput, setTaskInput] = useState('')
    const todoLists = useTodoStore((state) => state.todoLists)
    const removeList = useTodoStore((state) => state.removeList)
    const addTask = useTodoStore((state) => state.addTask)
    const removeTask = useTodoStore((state) => state.removeTask)

    const currentList = useMemo(() => {
        return todoLists.find(list => list.id === selectedList?.id) || null;
    }, [todoLists, selectedList]);

    /**
     * Handles the request to remove a list by its ID.
     * Calls the `removeList` function to delete the list. If an error occurs during the removal process, an error is thrown.
     * 
     * @param {number} listId - The ID of the list to be removed.
     */
    const handleRemoveList = (listId: number) => {
        // !!!
        // Agregar una modal para preguntar si estas seguro de borrar la lista
        try {
            removeList(listId)
            // Devolver en TodoSection el primer item de la lista
        } catch (e) {
            throw new Error((e as Error).message)
        }
    }

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
    const handleRemoveTask = (taskId: number) => {
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
                {/* Selected list section */}
                <header>
                    <h2>{capitalize(currentList.title)}</h2>
                    <button onClick={() => handleRemoveList(currentList.id)}>Delete List</button>
                </header>

                {/* Input section */}
                <form className='task-input' onSubmit={handleTaskSubmit}>
                    <input
                        type="text"
                        placeholder='New Task'
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)} />
                    <button type='submit' >Add Task</button>
                </form>

                {/* Tasks section */}
                {currentList.items.length > 0 &&
                    <ItemList list={currentList} type='tasks' onTaskClick={handleRemoveTask} />
                }
            </div>
        </section>
    )
}

export default TodoSection;