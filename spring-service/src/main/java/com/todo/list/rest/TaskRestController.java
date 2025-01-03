package com.todo.list.rest;

import com.todo.list.dao.TaskDAO;
import com.todo.list.entity.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskRestController {
    private TaskDAO taskDAO;
    public TaskRestController(TaskDAO theTaskDAO){
        taskDAO = theTaskDAO;
    }
    @GetMapping(value="/tasks")
    public List<Task> findAll(){
        return taskDAO.findAll();
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task theTask){
        theTask.setId(0);
        Task dbTask = taskDAO.save(theTask);
        return dbTask;
    }
    @PutMapping("/tasks")
    public Task updateTask(@RequestBody Task theTask){
        Task dbTask = taskDAO.save(theTask);
        return dbTask;
    }
    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(@PathVariable int taskId){
        Task tempTask = taskDAO.findById(taskId);

        if(tempTask == null){
            throw new RuntimeException("Task id not found: " + taskId);
        }
        taskDAO.deleteById(taskId);
        return "Deleted a task with id = " + taskId;
    }

}
