import { useEffect, useState } from 'react'
import './App.css'
import { Button, List, Typography, AppBar, Toolbar, Box, TextField, ListItem, ListItemText, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [editTask, setEditTask] = useState(null);  
  const [updatedName, setUpdatedName] = useState('');  
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleEditButton = (edittask) => {
    setOpenUpdate(true);
    setEditTask(edittask);
    setUpdatedName(edittask.name); 
  };

  const handleCloseDialog = () => {
    setOpenUpdate(false);
  };
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {method:'GET'});
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      alert('Error fetching tasks, read more in the console.');
      console.error('Error fetching tasks:', error);
    }
  }
  useEffect(() => {fetchTasks();}, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = { name: newTask, checked: false };

    try {
      await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await fetch(`http://localhost:8080/api/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedTask }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = (task) => {
    const updatedTask = { ...task, checked: !task.checked };
    updateTask(task.id, updatedTask);
  };

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => {if (a.checked === b.checked) return 0; return a.checked ? 1 : -1;
  });

  return (
    <>
        
        <AppBar position='fixed' sx={{bgcolor:'maroon', height:'95px'}}>
        <Toolbar>
        <Typography variant="h3" sx={{marginLeft:2, marginRight:2, marginTop:2, marginBottom:2}}>ToDoList</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{marginLeft:'auto', marginRight:2}}>
        <SearchIcon sx={{marginRight:1}}/>
        <TextField
          
          label="Search Tasks..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete='off'
          sx={{minWidth:100,  "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", 
            },
          },
          "& .MuiInputLabel-root": {
              color: "white", 
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: "white", 
          },"& .MuiOutlinedInput-input": {
              color: "white", 
    },
       
        }} 
        />
        </Box>
        </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" alignItems="center" sx={{position:'fixed', marginTop:16, top:0, left: "50%",
          transform: "translateX(-50%)"}}>
        <TextField
          
          label="New Task"
          variant="outlined"
          value={newTask}
          autoComplete='off'
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ marginBottom: 2 ,marginTop:2, minWidth:100, "& .MuiOutlinedInput-root": {
            
            "&:hover fieldset": {
              borderColor: "brown", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "brown", 
            },
          },
          "& .MuiInputLabel-root": {
              color: "black", 
          },
          "& .MuiInputLabel-root.Mui-focused": {
              color: "black", 
          },"& .MuiOutlinedInput-input": {
              color: "black", 
    },}}
        />
        <Button variant="contained" color="primary" onClick={addTask} sx={{bgcolor:'brown' }}>
          Add
        </Button>
        
        </Box>
        
       
          <List sx={{position:'fixed', top:0, left: "50%", transform: "translateX(-50%)", marginTop:35, overflow:'auto', 
                      maxHeight:'calc(100vh - 95px - 200px)', scrollbarColor: 'red', scrollbarWidth:'thin',
                      bgcolor:'white', paddingLeft:1, paddingRight:1,borderRadius: '16px', width:'95vw', }}>
          
          {filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{

                width:'fit-content',
                marginLeft:'auto',
                marginRight:'auto',
                minWidth: 250,
                backgroundColor: task.checked ? '#671100' : 'Brown', 
                borderRadius: '16px', 
                marginBottom: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: task.checked ? 'line-through' : 'none',
                textDecorationColor:'white',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                transition: 'background-color 0.3s',
                fontSize: '20px', 
                
                ':hover': {
                  backgroundColor: task.checked ? '#561c00' : 'darkred', 
                }
              }}
            >
              <Checkbox
                checked={task.checked}
                onChange={() => toggleTaskCompletion(task)}
                sx={{ marginRight: '12px', color:"whitesmoke", '&.Mui-checked': {
                  color: 'whitesmoke' 
                }, }}
              />
              <ListItemText
                disableTypography
                primary={task.name}
                sx={{
                  
                  wordBreak: 'break-word',
                  flex: 1,
                  color:"whitesmoke"
                }}
              />
              <IconButton sx={{outline:'none',marginLeft:1,'&:active': {outline:'none',}, '&:focus-visible':{outline:'none'}}} onClick={() => handleEditButton(task)} >
                <EditIcon sx={{ color:"whitesmoke",}}/>
              </IconButton>
              <IconButton onClick={() => deleteTask(task.id)} >
                <DeleteIcon sx={{color:"whitesmoke"}}/>
              </IconButton>
              
            </ListItem>
          ))}
        </List>
        
        
        
        <Dialog
        sx={{width:'100%'}}
        open={openUpdate}
        fullWidth
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const taskname = formJson.task;
            const updatedTask = {name: taskname, checked: editTask.checked};
            updateTask(editTask.id, updatedTask);
            handleCloseDialog();
          },
        }}
      >
                <DialogTitle>Edit task...</DialogTitle>
                <DialogContent>
                  
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="task"
                    label="Edited Task"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={updatedName}
                    autoComplete='off'
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </DialogActions>
              </Dialog>
      
    </>
  );
};

export default App
