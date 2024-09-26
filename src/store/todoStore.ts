import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoTask = {
    id: number,
    title: string,
    isCompleted: boolean,
}

export type TodoList = {
    id: number,
    title: string,
    items: TodoTask[]
}

interface TodoStoreState {
    //  TodoList list
    todoLists: TodoList[],

    //  - Add List
    addList: (listTitle: string) => TodoList | null,
    //  - Remove List
    removeList: (listId: number) => void,
    //  - Update List
    //  - Remove All List (Optional)

    //  - Add Task
    addTask: (listId: number, taskTitle: string) => void,
    //  - Remove Task
    removeTask: (listId: number, taskId: number) => void,
    //  - Change completion status
    toggleTaskStatus: (listId: number, taskId: number) => void,
    //  - Update Task
    updateTaskTitle: (listId: number, taskId: number, newTitle: string) => void,
    //  - Remove All Task (Optional)
}

/* const mockItems: TodoList[] = [
    {
        id: Date.now() + 0,
        title: 'Hacer la compra',
        items: [
            {
                id: Date.now() + 1,
                title: 'Milk',
                isCompleted: false
            },
            {
                id: Date.now() + 2,
                title: 'Sugar',
                isCompleted: true
            },
            {
                id: Date.now() + 3,
                title: 'Noodles',
                isCompleted: false
            },
        ],
    },
    {
        id: Date.now() + 3,
        title: 'Tirar la basura',
        items: [],
    },
] */

const useTodoStore = create<TodoStoreState>()(persist((set, get) => ({
    //  TodoList list
    todoLists: [], // todoLists: mockItems || [],

    //  - Add List
    addList: (listTitle): TodoList | null => {
        const listExists = get().todoLists.some(list => list.title.toLocaleLowerCase() === listTitle.toLocaleLowerCase())

        if (listExists) { // Check for duplicates
            const formattedTitle = listTitle.charAt(0).toLocaleUpperCase() + listTitle.slice(1).toLocaleLowerCase()
            console.warn(`List with title: '${formattedTitle}' already exists!`)
            alert(`List with title: '${formattedTitle}' already exists!`) // Convert to fancier alert in the future
            return null
        }

        const newList: TodoList = { // Create list
            id: Date.now(),
            title: listTitle,
            items: [],
        }

        set((state) => { // Update state with new list
            const updatedList = [newList, ...state.todoLists]
            return { todoLists: updatedList }
        })

        return newList
    },
    //  - Remove List (Double step confirms delete)
    removeList: (listId) => {
        set((state) => {
            const updatedList = [...state.todoLists].filter((list) => list.id !== listId)
            return { todoLists: updatedList }
        })
    },
    //  - Update List (Dialog?)
    //  - Remove All List (Optional)


    //  - Add Task
    addTask: (listId, taskTitle) => {
        set((state) => {
            const updatedList = state.todoLists.map(list => {
                if (list.id === listId) {
                    const taskExists = list.items.some(task => task.title.toLocaleLowerCase() === taskTitle.toLocaleLowerCase())

                    if (taskExists) { // Check for duplicates
                        const formattedTitle = taskTitle.charAt(0).toLocaleUpperCase() + taskTitle.slice(1).toLocaleLowerCase()
                        console.warn(`Task with title: '${formattedTitle}' already exists!`)
                        alert(`Task with title: '${formattedTitle}' already exists!`) // Convert to fancier alert in the future
                        return list
                    }

                    const newTask: TodoTask = {
                        id: Date.now(),
                        title: taskTitle,
                        isCompleted: false
                    }

                    return {
                        ...list,
                        items: [newTask, ...list.items]
                    }
                }
                return list // Return al map
            })

            return { todoLists: updatedList } // Return al set()
        })
    },
    //  - Remove Task (Double step confirms delete)
    removeTask: (listId, taskId) => {
        set((state) => {
            const updatedList = state.todoLists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        items: list.items.filter(task => task.id !== taskId)
                    }
                }
                return list // Return al map
            })
            return { todoLists: updatedList } // Return al set()
        })
    },
    //  - Change completion status
    toggleTaskStatus: (listId, taskId) => {
        set((state) => {
            const updatedList = state.todoLists.map((list) => {
                if (list.id !== listId) return list

                const updatedTasks = list.items.map((task) => {
                    if (task.id !== taskId) return task

                    // Return de updatedTasks
                    return {
                        ...task,
                        isCompleted: !task.isCompleted,
                    }
                })

                // Return de updatedLists
                return {
                    ...list,
                    items: updatedTasks,
                }
            })

            // Return del state
            return { todoLists: updatedList }
        })
    },
    //  - Update Task (Dialog?)
    updateTaskTitle: (listId, taskId, newTitle) => {
        set((state) => {
            const updatedList = state.todoLists.map((list) => {
                if (list.id !== listId) return list

                const updatedTasks = list.items.map((task) => {
                    if (task.id !== taskId) return task

                    // Return de updatedTasks
                    return {
                        ...task,
                        title: newTitle,
                    }
                })

                // Return de updatedLists
                return {
                    ...list,
                    items: updatedTasks,
                }
            })

            // Return del state
            return { todoLists: updatedList }
        })
    },
    //  - Remove All Task (Optional)
}),
{
    name: 'todoListState'
}))

export default useTodoStore;