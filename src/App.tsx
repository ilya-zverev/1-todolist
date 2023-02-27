import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterValuesType = 'active' | 'completed' | 'all'

function App() {

	let [tasks, setTasks] = useState([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'TS', isDone: false}
	]);

	let [filter, setFilter] = useState<filterValuesType>('all');

	function removeTask(id: string) {
		let resultTasks = tasks.filter(t => t.id !== id);
		setTasks(resultTasks);
	}

	function addTask(title: string) {
		let newTask = {id: v1(), title: title, isDone: false};
		let newTasks = [newTask, ...tasks];
		setTasks(newTasks);
	}

	function changeStatus(taskId: string, isDone: boolean) {
		let task = tasks.find(t => (t.id === taskId));
		if (task) {
			task.isDone = isDone;
		}
		setTasks([...tasks]);
	}

	function changeFilter(value: filterValuesType) {
		setFilter(value);
	}

	let tasksForTodolist = tasks;
	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(t => t.isDone);
	}
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(t => !t.isDone);
	}
	return (
		<div className="App">
			<Todolist
				title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeStatus}
				filter={filter}
			/>
		</div>
	);
}


export default App;
