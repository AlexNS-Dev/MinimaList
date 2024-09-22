import { create } from 'zustand';

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
    addList: (listTitle: string) => TodoList,
    //  - Remove List
    removeList: (listId: number) => void,
    //  - Update List
    //  - Remove All List (Optional)

    //  - Add Task
    addTask: (listId: number, taskTitle: string) => void,
    //  - Remove Task
    removeTask: (listId: number, taskId: number) => void,
    //  - Update Task
    //  - Remove All Task (Optional)
}

const mockItems: TodoList[] = [
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
                isCompleted: false
            },
        ],
    },
    {
        id: Date.now() + 3,
        title: 'Tirar la basura',
        items: [],
    },
]

const useTodoStore = create<TodoStoreState>((set) => ({
    //  TodoList list
    todoLists: mockItems || [],

    //  - Add List
    addList: (listTitle): TodoList => {
        const newList: TodoList = {
            id: Date.now(),
            title: listTitle,
            items: [],
        }

        set((state) => {
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
        const newTask: TodoTask = {
            id: Date.now(),
            title: taskTitle,
            isCompleted: false
        }
        set((state) => {
            const updatedList = state.todoLists.map(list => {
                if (list.id === listId) {
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
    //  - Update Task (Dialog?)
    //  - Remove All Task (Optional)
}))

export default useTodoStore;