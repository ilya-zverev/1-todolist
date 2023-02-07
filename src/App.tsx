import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type filterValuesType = 'active' | 'completed' | 'all'

function App() {

	let initTasks = [
		{id: 1, title: 'HTML&CSS', isDone: true},
		{id: 2, title: 'JS', isDone: true},
		{id: 3, title: 'ReactJS', isDone: false},
		{id: 4, title: 'TS', isDone: false}

	];
	let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
	let [filter, setFilter] = useState<filterValuesType>('all');

	function removeTask(id: number) {
		let resultTasks = tasks.filter(t => t.id !== id);
		setTasks(resultTasks);
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
		/>
	</div>
);
}


export default App;
