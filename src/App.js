import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react';
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [tasks, setTasks] = useState([])
  const [addFormVisibility, setAddFormVisibility] = useState(false)

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5003/api/tasks/${id}`,{method : `DELETE`})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5003/api/tasks/',
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},

    })
    console.log(res)
    const data = await res.json()

    console.log(data)

    return data
  }
  // Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5003/api/tasks/${id}`)
    const data = await res.json()

    console.log(data)

    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5003/api/tasks',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })
    console.log(JSON.stringify(task))
    const data = await res.json()
    setTasks([...tasks, data])
    console.log(tasks)

  } 

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    console.log("Task before", taskToToggle)
    console.log(updatedTask)
    const res = await fetch(`http://localhost:5003/api/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    

    setTasks(tasks.map((task) => (task.id === id ? {...task, reminder: data.reminder} : task)))
    console.log(tasks)
  }  

  const changeWindowView = (openStatus) => {
    console.log("Change status: ", openStatus)
    setAddFormVisibility(openStatus)
  }

  return (
    <Router>
      <div className="container">
        <Header title = 'My Tasks' onClick = {() => changeWindowView(!addFormVisibility)} showAdd = {addFormVisibility}/>
        
        <Route path = '/' exact render = {(props) => (
          <>
            {addFormVisibility && <AddTask addTask = {addTask}/>}
            {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} toggleReminder = {toggleReminder}/>: 'No tasks added'}
          </>
        )} />

        <Route path = '/about' component = {About}/>
        <Footer/>
      </div>
    </Router>
  );
}


export default App;
