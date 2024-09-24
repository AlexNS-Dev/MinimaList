import useTodoStore, { TodoList, TodoTask } from '../../store/todoStore'
import './ItemList.css'
import React from 'react'
import { CgCloseR, CgCheckR, CgMoreVerticalR } from 'react-icons/cg'

interface ItemListProps {
    listCollection?: TodoList[]
    list?: TodoList | null
    type: 'lists' | 'tasks'
    onListClick?: (list: TodoList) => void
    onTaskClick?: (taskId: number) => void
}

const ItemList: React.FC<ItemListProps> = ({ listCollection, list, type, /* onListClick, */ onTaskClick }) => {
    const toggleTaskStatus = useTodoStore((state) => state.toggleTaskStatus)

    if (type === 'lists' && listCollection) {
        return (
            <>
                {/* <ul>
                    <li key={list.id} className={className}>
                        {list.title}
                    </li>
                </ul> */}
            </>
        )
    } else if (type === 'tasks' && list) {
        const sortedList = [...list.items].sort((a: TodoTask, b: TodoTask) => {
            return Number(a.isCompleted) - Number(b.isCompleted)
        })

        return (
            <ul className='ItemList tasks'>
                {sortedList.map((task) =>
                    <li
                        key={task.id}
                        className={task.isCompleted ? 'completed' : ''}
                    >
                        <div
                            className='item-content'
                            onClick={() => toggleTaskStatus(list.id, task.id)}>
                            <span>
                                <CgCheckR className='icon-checked' />
                            </span>
                            <span className='task-title'>
                                {task.title}
                            </span>
                        </div>
                        <div className="actions">
                            <button className='icon-edit' disabled={task.isCompleted}>
                                <CgMoreVerticalR />
                            </button>
                            <button className='icon-delete' onClick={onTaskClick?.bind(null, task.id)}>
                                <CgCloseR />
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <ul>
            <span className='ItemList no-items'>No items available</span>
        </ul>
    )
}

export default ItemList