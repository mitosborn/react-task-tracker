import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState} from 'react';

function App() {
  const [tasks, setTasks] = useState([{id:1,text: 'hi',day:'Today'},{id:2,text: 'hi',day:'Today'},{id:3,text: 'hi',day:'Today'}])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => (task.id !== id)))
  }

  return (
    <div className="container">
      <Header title = 'My Tasks'/>
      <Tasks tasks = {tasks} onDelete = {deleteTask}/>
    </div>
  );
}


export default App;
