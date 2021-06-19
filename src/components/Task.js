import React from 'react'
import {FaTimes} from 'react-icons/fa'
import PropTypes from 'prop-types';

const Task = ({task, onDelete, toggleReminder}) => {
    return (
        <div className = {`task ${task.reminder ? 'reminder': ''}`} onDoubleClick = {() => toggleReminder(task.id)}>
            <h3>{task.text} 
            <FaTimes style = {{color: 'red', cursor:'pointer'}} onClick = {() => onDelete(task.id)} onToggle = {toggleReminder}></FaTimes></h3>
            <p>{task.day}</p>
        </div>
    )
}

Task.propTypes = {
    task: PropTypes.object,
    onDelete: PropTypes.func,
    toggleReminder: PropTypes.func,
    className: PropTypes.string
}



export default Task
