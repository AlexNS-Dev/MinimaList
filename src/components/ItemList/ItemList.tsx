import useTodoStore, { TodoList, TodoTask } from '../../store/todoStore'
import './ItemList.css'
import React, { FormEvent, useEffect, useState } from 'react'
import { CgCloseR, CgCheckR, CgMoreR } from 'react-icons/cg'
import { motion } from 'framer-motion';
import { capitalize } from '../../utils/helpers';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Zoom from '@mui/material/Zoom';
import CustomTooltip from '../CusotmTooltip/CustomTooltip';

interface TaskDialogProps {
    open: boolean
    onClose: () => void
    list: TodoList | null
    task: TodoTask | null
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, list, task }) => {
    const [inputTask, setInputTask] = useState('')
    const updateTaskTitle = useTodoStore((state) => state.updateTaskTitle)

    useEffect(() => {
        setInputTask(capitalize(task?.title || '') || '')
    }, [task])

    const handleClose = () => {
        onClose()
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!list || !task) return

        // Avoid renaming to the same value it had before
        if (capitalize(task.title) === capitalize(inputTask)) {
            onClose()
            console.log('titles are the same');
            return
        }

        // Upsert the new task title
        updateTaskTitle(list.id, task.id, inputTask)
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className='edit-dialog'
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--background-color)'
                },
            }}
        >
            <DialogTitle className='title'>Change Task Name</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent className='content'>
                    <input type="text" value={inputTask} onChange={(e) => setInputTask(e.target.value)} placeholder='New task name' />
                </DialogContent>
                <DialogActions className='actions'>
                    <button onClick={handleClose}>Discard</button>
                    <button name='save-task-name' type='submit' disabled={inputTask === ''}>Save</button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

interface ItemListProps {
    listCollection?: TodoList[]
    selectedList?: TodoList | null
    list?: TodoList | null
    type: 'lists' | 'tasks'
    onListClick?: (list: TodoList) => void
    onTaskRemoveClick?: (taskId: number) => void
}

const ItemList: React.FC<ItemListProps> = ({ listCollection, selectedList, list, type, onListClick, onTaskRemoveClick }) => {
    const toggleTaskStatus = useTodoStore((state) => state.toggleTaskStatus)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editTask, setEditTask] = useState<TodoTask | null>(null)

    const handleOpenDialog = (task: TodoTask) => {
        setEditTask(task)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    if (list?.items.length === 0) {
        return (
            <ul>
                <h4 className='ItemList no-items'>Create some tasks.</h4>
            </ul>
        )
    } else if (listCollection?.length === 0) {
        return (
            <ul>
                <h4 className='ItemList no-items'>Create a new list.</h4>
            </ul>
        )
    }

    if (type === 'lists' && listCollection) {
        return (
            <ul className='ItemList lists'>
                {listCollection.map((item: TodoList) =>
                    item &&
                    <motion.li
                        key={item.id}
                        layout
                        className={selectedList?.id === item.id ? 'active' : ''}
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={onListClick?.bind(null, item)}
                    >
                        <span>
                            {capitalize(item.title)}
                        </span>
                    </motion.li>
                )}
            </ul>
        )

    } else if (type === 'tasks' && list) {
        const sortedList = [...list.items].sort((a: TodoTask, b: TodoTask) => {
            return Number(a.isCompleted) - Number(b.isCompleted)
        })

        return (
            <>
                <TaskDialog open={isDialogOpen} onClose={handleCloseDialog} list={list} task={editTask} />
                <ul className='ItemList tasks'>
                    {sortedList.map((task) =>
                        <motion.li
                            key={task.id}
                            layout
                            className={task.isCompleted ? 'completed' : ''}
                        >
                            <div
                                className='item-content'
                                onClick={() => toggleTaskStatus(list.id, task.id)}
                            >
                                <span className='icon-checked'>
                                    <CgCheckR />
                                </span>
                                <span className='task-title'>
                                    {capitalize(task.title)}
                                </span>
                            </div>
                            <CustomTooltip title={task.isCompleted ? 'Delete' : 'Edit & Delete'} placement='left' TransitionComponent={Zoom}>
                                <div className="actions">
                                    <button className='icon-edit' onClick={() => handleOpenDialog(task)}>
                                        <CgMoreR />
                                    </button>
                                    <button className='icon-delete' onClick={onTaskRemoveClick?.bind(null, task.id)}>
                                        <CgCloseR />
                                    </button>
                                </div>
                            </CustomTooltip>
                        </motion.li>
                    )}
                </ul>
            </>
        )
    }

}

export default ItemList