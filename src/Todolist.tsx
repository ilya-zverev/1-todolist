import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';

export type  TaskType = {
	id: string
	title: string
	isDone: boolean
}
type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string) => void
	changeFilter: (value: filterValuesType) => void
	addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	};
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTask();
		}
	};
	const addTask = () => {
		props.addTask(newTaskTitle);
		setNewTaskTitle('');
	};
	const onAllClickHandler = () => {props.changeFilter('all')}
	const onActiveClickHandler = () => {props.changeFilter('active')}
	const onCompletedClickHandler = () => {props.changeFilter('completed')}

	return (<div>
		<h3>{props.title}</h3>
		<div>
			<input value={newTaskTitle}
						 onChange={onChangeHandler}
						 onKeyDown={onKeyDownHandler}
			/>
			<button onClick={addTask}>+
			</button>
		</div>
		<ul>
			{
				props.tasks.map(t => {
						const onRemoveHandler = () => {
							props.removeTask(t.id);
						};
						return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
							<span>{t.title} </span>
							<button onClick={onRemoveHandler}>x</button>
						</li>;
					}
				)
			}
		</ul>
		<div>
			<button onClick={onAllClickHandler}>All</button>
			<button onClick={onActiveClickHandler}>Active</button>
			<button onClick={onCompletedClickHandler}>Completed</button>
		</div>
	</div>);
}