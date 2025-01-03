package com.todo.list.dao;

import com.todo.list.entity.Task;

import java.util.List;

public interface TaskDAO {
    List<Task> findAll();
    Task save(Task theTask);
    void deleteById(int theId);
    Task findById(int theId);
}
