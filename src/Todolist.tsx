import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';

export type  TaskType = {
	id: string
	title: string
	isDone: boolean
}
type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: filterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	filter: filterValuesType
	removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setNewTaskTitle(e.currentTarget.value);
	};
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTask();
		}
	};
	const addTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is reqired');
		}
		props.addTask(newTaskTitle.trim(), props.id);
		setNewTaskTitle('');
	};
	const onAllClickHandler = () => {
		props.changeFilter('all', props.id);
	};
	const onActiveClickHandler = () => {
		props.changeFilter('active', props.id);
	};
	const onCompletedClickHandler = () => {
		props.changeFilter('completed', props.id);
	};
	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}

	return (<div>
		<h3>{props.title}<button onClick={removeTodolist}>X</button></h3>
		<div>
			<input value={newTaskTitle}
						 onChange={onChangeHandler}
						 onKeyDown={onKeyDownHandler}
						 className={error ? 'error' : ''}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div>}
		</div>
		<ul>
			{
				props.tasks.map(t => {
						const onRemoveHandler = () => {
							props.removeTask(t.id, props.id);
						};
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
						};
						return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox"
																																							 onChange={onChangeHandler}
																																							 checked={t.isDone}/>
							<span>{t.title} </span>
							<button onClick={onRemoveHandler}>x</button>
						</li>;
					}
				)
			}
		</ul>
		<div>
			<button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
			<button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
			</button>
			<button className={props.filter === 'completed' ? 'active-filter' : ''}
							onClick={onCompletedClickHandler}>Completed
			</button>
		</div>
	</div>);
}