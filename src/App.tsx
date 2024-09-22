import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TodoSection from './components/TodoSection/TodoSection';
import useTodoStore, { TodoList } from './store/todoStore';

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [selectedList, setSelectedList] = useState<TodoList | null>(null)
	const todoLists = useTodoStore((state) => state.todoLists)

	/**
	 * Toggling function to switch the state of the menu between open and closed.
	 * This function updates the `isMenuOpen` state to its opposite value.
	 * 
	 * @returns 
	 */
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	/**
	 * Handles the event of clicking on a list item.
	 * Sets the provided list as the currently selected list and, if the menu is open, closes it.
	 * 
	 * @param {TodoList} list - The list item that has been clicked and should be set as selected.
	 * @returns {void}
	 */
	const handleListClick = (list: TodoList): void => {
		setSelectedList(list)
		if (isMenuOpen) {
			setIsMenuOpen(false)
		}
	}

	/**
	 * Effect hook that syncronizes the `selectedList` state with the first element of `todoLists` from the store. In case there is no elements on `todoLists` it's set to null
	 */
	useEffect(() => {
		const lists = todoLists;

		if (selectedList && lists.some(list => list.id === selectedList.id)) {
			// Si la lista seleccionada actual aún existe, la mantenemos.
			setSelectedList(selectedList);
		} else if (lists.length > 0) {
			// Si la lista seleccionada no existe o no hay ninguna, seleccionamos la primera lista.
			setSelectedList(lists[0]);
		} else {
			// Si no hay listas, seteamos null o vacío.
			setSelectedList(null);
		}
	}, [todoLists, selectedList])

	return (
		<div className="App">
			<Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
			<main>
				<Sidebar
					open={isMenuOpen}
					onListClick={handleListClick}
					setIsMenuOpen={setIsMenuOpen}
					selectedList={selectedList}
				/>
				<TodoSection selectedList={selectedList} />
			</main>
		</div>
	)
}

export default App;