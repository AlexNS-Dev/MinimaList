import useTodoStore, { TodoList, TodoTask } from '../../store/todoStore'
import './ItemList.css'
import React from 'react'
import { CgCloseR, CgCheckR, CgMoreR } from 'react-icons/cg'
import { motion } from 'framer-motion';
import { capitalize } from '../../utils/helpers';

interface ItemListProps {
    listCollection?: TodoList[]
    selectedList?: TodoList | null
    list?: TodoList | null
    type: 'lists' | 'tasks'
    onListClick?: (list: TodoList) => void
    onTaskClick?: (taskId: number) => void
}



const ItemList: React.FC<ItemListProps> = ({ listCollection, selectedList, list, type, onListClick, onTaskClick }) => {
    const toggleTaskStatus = useTodoStore((state) => state.toggleTaskStatus)

    if (list?.items.length === 0 || listCollection?.length === 0) {
        return (
            <ul>
                <span className='ItemList no-items'>No items available</span>
            </ul>
        )
    }

    if (type === 'lists' && listCollection) {
        return (
            <ul className='ItemList lists'>
                {listCollection.map((item: TodoList) =>
                    item &&
                    <li
                        key={item.id}
                        className={selectedList?.id === item.id ? 'active' : ''}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={onListClick?.bind(null, item)}
                    >
                        <span>
                            {capitalize(item.title)}
                        </span>
                    </li>
                )}
            </ul>
        )

    } else if (type === 'tasks' && list) {
        const sortedList = [...list.items].sort((a: TodoTask, b: TodoTask) => {
            return Number(a.isCompleted) - Number(b.isCompleted)
        })

        return (
            <ul className='ItemList tasks'>
                {sortedList.map((task) =>
                    <motion.li
                        key={task.id}
                        layout
                        className={task.isCompleted ? 'completed' : ''}
                    >
                        <div
                            className='item-content'
                            onClick={() => toggleTaskStatus(list.id, task.id)}>
                            <span>
                                <CgCheckR className='icon-checked' />
                            </span>
                            <span className='task-title'>
                                {capitalize(task.title)}
                            </span>
                        </div>
                        <div className="actions">
                            <button className='icon-edit'>
                                <CgMoreR />
                            </button>
                            <button className='icon-delete' onClick={onTaskClick?.bind(null, task.id)}>
                                <CgCloseR />
                            </button>
                        </div>
                    </motion.li>
                )}
            </ul>
        )
    }

}

export default ItemList