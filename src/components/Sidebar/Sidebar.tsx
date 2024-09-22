import './Sidebar.css'
import React, { FormEvent, useState } from 'react';
import useTodoStore, { TodoList } from '../../store/todoStore';
import { IoMdTrash } from 'react-icons/io'

interface SidebarProps {
    open: boolean
    onListClick: (list: TodoList) => void
    setIsMenuOpen: (isOpen: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onListClick, setIsMenuOpen }) => {
    const items = useTodoStore((state) => state.todoLists)
    const addList = useTodoStore((state) => state.addList)
    const removeList = useTodoStore((state) => state.removeList)
    const [listInput, setListInput] = useState('')

    /**
     * Handles the form submission event for adding a new list.
     * Prevents the default form submission behavior, validates the input, and attempts to add the list using the `addList` function.
     * If the list input is empty or undefined, the function exits early. After adding the list, the input field is cleared.
     * 
     * @param {FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {void}
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (listInput === '' || listInput === undefined) return

        try {
            const newList = addList(listInput)
            
            if (newList) {
                onListClick(newList)
            }

            setListInput('')

            if (open) {
                setIsMenuOpen(false)
            }
        } catch (e) {
            throw new Error((e as Error).message)
        }
        
    }

    /**
     * Handles the request to remove a list by its ID.
     * Calls the `removeList` function to delete the list. If an error occurs during the removal process, an error is thrown.
     * 
     * @param {number} listId - The ID of the list to be removed.
     * @returns {void}
     */
    const handleRemoveList = (listId: number) => () => {
        // !!!
        // Agregar una modal para preguntar si estas seguro de borrar la lista
        try {
            removeList(listId)
            // Devolver en TodoSection el primer item de la lista
        } catch (e) {
            throw new Error((e as Error).message)
        }
    }

    return (
        <aside className={`Sidebar ${open ? 'open' : ''}`}>
            <div className='list'>
                <ul>
                    {/* Crear componente de List */}
                    {items.map((item: TodoList) =>
                        item &&
                        <li
                            key={item.id}
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => onListClick(item)}
                        >
                            <span>
                                {item.title}
                            </span>
                            <button
                                style={{
                                    padding: '0',
                                    marginLeft: 'auto',
                                    marginTop: '.2rem',
                                    backgroundColor: 'transparent',
                                    fontSize: 20,
                                }}
                                onClick={handleRemoveList(item.id)}
                            >
                                <IoMdTrash />
                            </button>
                        </li>
                    )}
                    {/* Aqui terminaria el componente List */}
                </ul>
            </div>
            <form className="list-input" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id='add-list-input'
                    name='add-list-input'
                    value={listInput}
                    placeholder='New List'
                    onChange={(event) => setListInput(event.target.value)} />
                <button type='submit'>
                    Add List
                </button>
            </form>
        </aside>
    )
}

export default Sidebar;