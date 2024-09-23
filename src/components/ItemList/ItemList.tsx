import { TodoList, TodoTask } from '../../store/todoStore'
import './ItemList.css'
import React from 'react'
import { CgCloseR, CgCheckR, CgMoreR } from 'react-icons/cg'

interface ItemListProps {
    lists?: TodoList[] | null
    tasks?: TodoTask[]
    type: 'lists' | 'tasks'
    onListClick?: (list: TodoList) => void
    onTaskClick?: (taskId: number) => void
}

const ItemList: React.FC<ItemListProps> = ({ lists, tasks, type, /* onListClick, */ onTaskClick }) => {
    if (type === 'lists' && lists) {
        return (
            <>
                {/* <ul>
                    <li key={list.id} className={className}>
                        {list.title}
                    </li>
                </ul> */}
            </>
        )
    } else if (type === 'tasks' && tasks) {
        return (
            <ul className='ItemList tasks'>
                {tasks.map((task) =>
                    <li
                        key={task.id}
                        className={task.isCompleted ? 'completed' : ''}
                        onClick={() => {/* TODO Handle check status */ }}
                    >
                        <CgCheckR className='icon-checked' />
                        <span>
                            {task.title}
                        </span>
                        <CgMoreR className='icon-edit' />
                        <CgCloseR className='icon-delete' onClick={() => onTaskClick && onTaskClick(task.id)} />
                    </li>
                )}
            </ul>
        )
    }

    return (
        <span className='ItemList no-items'>No items available</span>
    )
}

export default ItemList