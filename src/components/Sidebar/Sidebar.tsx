import './Sidebar.css'
import React, { FormEvent, useEffect, useState } from 'react';
import useTodoStore, { TodoList } from '../../store/todoStore';
import ItemList from '../ItemList/ItemList';
import Drawer from '@mui/material/Drawer'

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
    const [isMobile, setIsMobile] = useState(false)

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {isMobile ? (
                <Drawer
                    open={open}
                    onClose={() => setIsMenuOpen(!open)}
                    className='drawer'
                >
                    <aside className='Sidebar'>
                        <div className='list'>
                            <ItemList listCollection={items} selectedList={selectedList} onListClick={onListClick} type='lists' />
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
                </Drawer >
            ) : (
                <aside className='Sidebar'>
                    <div className='list'>
                        <ItemList listCollection={items} selectedList={selectedList} onListClick={onListClick} type='lists' />
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
        </>
    )
}

export default Sidebar;