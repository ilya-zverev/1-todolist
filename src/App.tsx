import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterValuesType = 'active' | 'completed' | 'all'
type TodolistType = {
	id: string
	title: string
	filter: filterValuesType
}

function App() {

	let todolistId1 = v1(), todolistId2 = v1();

	let [tasksObj, setTasksObj] = useState({
			[todolistId1]: [
				{id: v1(), title: 'HTML&CSS', isDone: true},
				{id: v1(), title: 'JS', isDone: true},
				{id: v1(), title: 'ReactJS', isDone: false},
				{id: v1(), title: 'TS', isDone: false}
			],
			[todolistId2]: [
				{id: v1(), title: 'Milk', isDone: true},
				{id: v1(), title: 'Book', isDone: true}
			]
		})
	;

	function removeTask(id: string, todolistId: string) {
		let tasks = tasksObj[todolistId];
		let resultTasks = tasks.filter(t => t.id !== id);
		tasksObj[todolistId] = resultTasks;
		setTasksObj({...tasksObj});
	}

	function addTask(title: string, todolistId: string) {
		let newTask = {id: v1(), title: title, isDone: false};
		let tasks = tasksObj[todolistId];
		let newTasks = [newTask, ...tasks];
		tasksObj[todolistId] = newTasks;
		setTasksObj({...tasksObj});
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		let tasks = tasksObj[todolistId];
		let task = tasks.find(t => (t.id === taskId));
		if (task) {
			task.isDone = isDone;
			setTasksObj({...tasksObj});
		}
	}

	function changeFilter(value: filterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId);
		if (todolist) {
			todolist.filter = value;
			setTodolists([...todolists]);
		}
	}

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{id: todolistId1, title: 'What to learn', filter: 'active'},
		{id: todolistId2, title: 'What to buy', filter: 'completed'}
	]);
	let removeTodolist = (todolistId: string) => {
		let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
		setTodolists(filteredTodolists);
		delete tasksObj[todolistId];
		setTasksObj({...tasksObj});
	};
	return (
		<div className="App">
			{
				todolists.map((tl) => {
					let tasksForTodolist = tasksObj[tl.id];
					if (tl.filter === 'completed') {
						tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
					}
					if (tl.filter === 'active') {
						tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
					}
					return <Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
					/>;
				})
			}

		</div>
	);
}


export default App;
