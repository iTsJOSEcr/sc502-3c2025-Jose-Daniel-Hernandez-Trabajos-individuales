document.addEventListener('DOMContentLoaded', function () {

    let isEditMode = false;
    let edittingId;
    const tasks = [{
            id: 1,
            title: "Revisión de presupuesto",
            description: "Revisar y aprobar el presupuesto del próximo trimestre",
            dueDate: "2024-11-20",
        },
        {
            id: 2,
            title: "Reunión de planificación",
            description: "Planificar las actividades del equipo para la próxima semana",
            dueDate: "2024-11-22",
        },
        {
            id: 3,
            title: "Análisis de código",
            description: "Revisar y mejorar el código del módulo de usuarios",
            dueDate: "2024-11-25",
        }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {

            let commentsList = '';
            if (task.comments && task.comments.length > 0) {
                commentsList = '<ul class="list-group list-group-flush">';
                task.comments.forEach(comment => {
                    commentsList += `<li class="list-group-item">${comment.description}</li>`;
                });
                commentsList += '</ul>';
            }
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Vence: ${task.dueDate}</small> </p>
                    ${commentsList}
                    <button type="button" class="btn btn-sm btn-link add-comment"  data-id="${task.id}">Agregar comentario</button>

                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task"data-id="${task.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Eliminar</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(function (button) {
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.add-comment').forEach(function (button) {
            button.addEventListener('click', function (e) {
                document.getElementById("comment-task-id").value = e.target.dataset.id;
                const modal = new bootstrap.Modal(document.getElementById("commentModal"));
                modal.show()

            })
        });
    }

    function handleEditTask(event) {
        try {
            const taskId = parseInt(event.target.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            isEditMode = true;
            edittingId = taskId;
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();


        } catch (error) {
            alert("Error intentando editar la tarea");
            console.error(error);
        }
    }

    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        loadTasks();
    }

    document.getElementById('comment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const comment = document.getElementById('task-comment').value;
        const selectedTask = parseInt(document.getElementById('comment-task-id').value);
        const task = tasks.find(t => t.id === selectedTask);

        let nextCommentId = 1;

        if (task.comments) {
            nextCommentId = task.comments.length + 1;
        } else {
            task.comments = [];
        }

        task.comments.push({ id: nextCommentId, description: comment });
        const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
        modal.hide();
        loadTasks();

    })

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const task = tasks.find(t => t.id === edittingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate
            };
            tasks.push(newTask);
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    document.getElementById('commentModal').addEventListener('show.bs.modal', function () {
        document.getElementById('comment-form').reset();
    })

    document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
        if (!isEditMode) {
            document.getElementById('task-form').reset();
        }
    });

    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function () {
        edittingId = null;
        isEditMode = false;
    })
    loadTasks();

});
