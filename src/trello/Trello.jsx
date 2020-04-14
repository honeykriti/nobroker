import React from "react";
import "./trello.css";
import CreateTask from "./CreateTask";

export default class Trello extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    taskId: 1,
                    status: "toDo",
                    title: "Task1",
                    description: "This is task1",
                },
                {
                    taskId: 2,
                    status: "inProgress",
                    title: "Task2",
                    description: "This is task2",
                },
                {
                    taskId: 3,
                    status: "completed",
                    title: "Task3",
                    description: "This is task3",
                },
                {
                    taskId: 4,
                    status: "toDo",
                    title: "Task4",
                    description: "This is task4",
                },
            ],
            showCreateTask: false,
            showEditTask: false,
            selectedtask: {},
        };
    }
    onClick = () => {
        this.setState({
            showCreateTask: !this.state.showCreateTask,
        });
    };
    onClickTask = (taskId) => {
        this.setState({
            showEditTask: !this.state.showEditTask,
        });
        if (taskId !== null) {
            this.setState(
                {
                    selectedtask: this.state.tasks.find((task) => {
                        return task.taskId === taskId;
                    }),
                },
                () => {
                    console.log(this.state.selectedtask);
                }
            );
        }
    };
    onUpdateTasks = (taskId, title, description, status, id) => {
        console.log(taskId, title, description, status);
        if (id === "createTask") {
            this.setState({
                tasks: [
                    ...this.state.tasks,
                    {
                        taskid: taskId,
                        status: status,
                        title: title,
                        description: description,
                    },
                ],
                showCreateTask: !this.state.showCreateTask,
            });
        } else {
            const updatedTasks = this.state.tasks.map((task) => {
                return task.taskId === taskId
                    ? {
                          taskid: taskId,
                          status: status,
                          title: title,
                          description: description,
                      }
                    : task;
            });
            this.setState({
                tasks: updatedTasks,
                showEditTask: !this.state.showEditTask,
            });
        }
    };
    onDrop = (status, e) => {
        // e.preventDefault();
        var dataId = parseInt(e.dataTransfer.getData("text"), 10);
        this.setState({
            tasks: this.state.tasks.map((_task) => {
                if (_task.taskId === dataId) {
                    _task.status = status;
                }
                return _task;
            }),
        });

        // this.state.tasks
        //     .filter((task) => {
        //         return task.taskId === dataId;
        //     })
        //     .map((task) => {
        //         _task =
        //         return null;
        //     });
        // e.target.appendChild(document.getElementById(dataId));
    };
    allowDrop = (e) => {
        e.preventDefault();
        return null;
    };
    onDrag = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    };
    render() {
        return (
            <div>
                <div className="banner">Task Management Board</div>
                <button id="createButton" onClick={this.onClick}>
                    + Create
                </button>
                {this.state.showCreateTask === true ? (
                    <CreateTask
                        id="createTask"
                        taskId={this.state.tasks.length + 1}
                        title={null}
                        description={null}
                        status={"toDo"}
                        onClick={this.onClick}
                        onUpdateTasks={this.onUpdateTasks}
                    />
                ) : null}
                <table className="trelloTable">
                    <thead className="trelloHead">
                        <tr className="headerRow">
                            <th>To DO</th>
                            <th>In Progress</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="dataRow">
                            <td
                                onDrop={this.onDrop.bind(this, "toDo")}
                                onDragOver={this.allowDrop}
                            >
                                {this.state.tasks
                                    .filter((task) => task.status === "toDo")
                                    .map((task) => {
                                        return (
                                            <div
                                                id={task.taskId}
                                                draggable="true"
                                                onDragStart={this.onDrag}
                                                key={task.taskId}
                                                onClick={this.onClickTask.bind(
                                                    this,
                                                    task.taskId
                                                )}
                                            >
                                                <span
                                                    className="deleteButton"
                                                    onClick={this.onDelete.bind(
                                                        this,
                                                        task.taskId
                                                    )}
                                                >
                                                    Delete
                                                </span>
                                                <div>Title : {task.title}</div>
                                                <div>
                                                    Description:{" "}
                                                    {task.description}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </td>
                            <td
                                onDrop={this.onDrop.bind(this, "inProgress")}
                                onDragOver={this.allowDrop}
                            >
                                {this.state.tasks
                                    .filter(
                                        (task) => task.status === "inProgress"
                                    )
                                    .map((task) => {
                                        return (
                                            <div
                                                id={task.taskId}
                                                draggable="true"
                                                onDragStart={this.onDrag}
                                                key={task.taskId}
                                                onClick={this.onClickTask.bind(
                                                    this,
                                                    task.taskId
                                                )}
                                            >
                                                <span
                                                    className="deleteButton"
                                                    onClick={this.onDelete.bind(
                                                        this,
                                                        task.taskId
                                                    )}
                                                >
                                                    Delete
                                                </span>
                                                <div>Title : {task.title}</div>
                                                <div>
                                                    Description:{" "}
                                                    {task.description}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </td>
                            <td
                                onDrop={this.onDrop.bind(this, "completed")}
                                onDragOver={this.allowDrop}
                            >
                                {this.state.tasks
                                    .filter(
                                        (task) => task.status === "completed"
                                    )
                                    .map((task) => {
                                        return (
                                            <div
                                                id={task.taskId}
                                                draggable="true"
                                                onDragStart={this.onDrag}
                                                key={task.taskId}
                                                onClick={this.onClickTask.bind(
                                                    this,
                                                    task.taskId
                                                )}
                                            >
                                                <span
                                                    className="deleteButton"
                                                    onClick={this.onDelete.bind(
                                                        this,
                                                        task.taskId
                                                    )}
                                                >
                                                    Delete
                                                </span>
                                                <div>Title : {task.title}</div>
                                                <div>
                                                    Description:{" "}
                                                    {task.description}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </td>
                            {this.state.showEditTask === true ? (
                                <CreateTask
                                    id="editTask"
                                    taskId={this.state.selectedtask.taskId}
                                    title={this.state.selectedtask.title}
                                    description={
                                        this.state.selectedtask.description
                                    }
                                    status={this.state.selectedtask.status}
                                    onClick={this.onClickTask.bind(this, null)}
                                    onUpdateTasks={this.onUpdateTasks}
                                />
                            ) : null}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    onDelete = (taskId, e) => {
        e.stopPropagation();
        this.setState({
            tasks: this.state.tasks.filter((_task) => _task.taskId !== taskId),
        });
    };
}
