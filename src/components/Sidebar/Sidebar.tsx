import './Sidebar.css'
import React, { FormEvent, useState } from 'react';
import useTodoStore, { TodoList } from '../../store/todoStore';
import { capitalize } from '../../utils/helpers';

interface SidebarProps {
    open: boolean
    onListClick: (list: TodoList) => void
    setIsMenuOpen: (isOpen: boolean) => void
    selectedList: TodoList | null
}

const Sidebar: React.FC<SidebarProps> = ({ open, onListClick, setIsMenuOpen, selectedList }) => {
    const items = useTodoStore((state) => state.todoLists)
    const addList = useTodoStore((state) => state.addList)
    const [listInput, setListInput] = useState('')

    /**
     * Handles the form submission event for adding a new list.
     * Prevents the default form submission behavior, validates the input, and attempts to add the list using the `addList` function.
     * If the list input is empty or undefined, the function exits early. After adding the list, the input field is cleared.
     * 
     * @param {FormEvent<HTMLFormElement>} event - The form submission event.
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

    return (
        <aside className={`Sidebar ${open ? 'open' : ''}`}>
            <div className='list'>
                <ul>
                    {/* Crear componente de List */}
                    {items.map((item: TodoList) =>
                        item &&
                        <li
                            key={item.id}
                            className={selectedList?.id === item.id ? 'active' : ''}
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => onListClick(item)}
                        >
                            <span>
                                {capitalize(item.title)}
                            </span>
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