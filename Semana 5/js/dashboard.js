document.addEventListener('DOMContentLoaded', function(){ 

    const tasks = [
        {
            id: 1,
            title: "Complete Project Report",
            description: "Prepare and submit the final project report by the end of the week.",
            due_date: "2024-08-25",
            comments: ["Great work!", "Don't forget to review."]
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Schedule a team meeting to discuss the next sprint.",
            due_date: "2024-08-26",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Review the codebase and ensure all pull requests are merged.",
            due_date: "2024-08-27",
            comments: ["Review completed."]
        }
    ];

    let editingTaskId = null;

    function loadTasks(){
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(function(task){
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text text-muted">${task.due_date}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);

            const commentsSection = document.getElementById('comments-section');
            commentsSection.innerHTML = '';
            task.comments.forEach(function(comment, index){
                const commentDiv = document.createElement('div');
                commentDiv.className = 'd-flex justify-content-between mb-2';
                commentDiv.innerHTML = `
                    <p>${comment}</p>
                    <button class="btn btn-danger btn-sm delete-comment" data-task-id="${task.id}" data-comment-index="${index}">Delete</button>
                `;
                commentsSection.appendChild(commentDiv);
            });
        });

        document.querySelectorAll('.edit-task').forEach(function(btnEdit){
            btnEdit.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function(btnDelete){
            btnDelete.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.delete-comment').forEach(function(btnDeleteComment){
            btnDeleteComment.addEventListener('click', handleDeleteComment);
        });
    }

    function handleEditTask(event){
        editingTaskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === editingTaskId);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.due_date;
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }

    function handleDeleteTask(event){
        alert('Task deleted with ID: ' + event.target.dataset.id);
    }

    function handleDeleteComment(event){
        const taskId = parseInt(event.target.dataset.taskId);
        const commentIndex = parseInt(event.target.dataset.commentIndex);
        const task = tasks.find(t => t.id === taskId);
        task.comments.splice(commentIndex, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function(e){
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if(!editingTaskId){
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                due_date: dueDate,
                comments: []
            };
            tasks.push(newTask);
        } else {
            const task = tasks.find(t => t.id === editingTaskId);
            task.title = title;
            task.description = description;
            task.due_date = dueDate;
        }

        loadTasks();
        document.getElementById('task-form').reset();
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.hide();
    });

    document.getElementById('comment-form').addEventListener('submit', function(e){
        e.preventDefault();
        const comment = document.getElementById('comment-input').value;
        const task = tasks.find(t => t.id === editingTaskId);
        task.comments.push(comment);
        loadTasks();
        document.getElementById('comment-input').value = '';
    });

    loadTasks();
});
