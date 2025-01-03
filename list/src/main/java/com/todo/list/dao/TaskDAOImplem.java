package com.todo.list.dao;
import com.todo.list.entity.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class TaskDAOImplem implements TaskDAO{
    private EntityManager entityManager;

    @Autowired
    public TaskDAOImplem(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Task> findAll(){
        TypedQuery<Task> theQuery = entityManager.createQuery("FROM Task", Task.class);
        List<Task> tasks = theQuery.getResultList();
        return tasks;
    }
    @Override
    @Transactional
    public Task save(Task theTask){
        Task dbTask = entityManager.merge(theTask);
        return dbTask;
    }

    @Override
    @Transactional
    public void deleteById(int theId){
        Task theTask = entityManager.find(Task.class, theId);
        entityManager.remove(theTask);
    }
    @Override
    public Task findById(int theId){
        Task theTask = entityManager.find(Task.class, theId);
        return theTask;
    }

}
