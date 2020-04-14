import React from "react";
import "./createTask.css";

export default class CreateTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            taskId: this.props.taskId,
            title: this.props.title,
            description: this.props.description,
            status: this.props.status,
        };
    }
    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    };
    onChangeDescription = (e) => {
        this.setState( {
            description: e.target.value,
        });
    };
    onClick =() => {
        this.props.onUpdateTasks(this.state.taskId, this.state.title, this.state.description, this.state.status, this.state.id)
    }
    render() {
        return (
            <div className="popup">
                <div>Task Id : {this.state.taskId}</div>
                <div>
                    <span>Title</span>
                    <input
                        type="text"
                        onChange={this.onChangeTitle}
                        value={this.state.title}
                    ></input>
                </div>
                <div>
                    <span>Description</span>
                    <input
                        type="text"
                        onChange={this.onChangeDescription}
                        value={this.state.description}
                    ></input>
                </div>
                <button onClick={this.props.onClick}>Cancel</button>
                <button onClick={this.onClick}>
                    {" "}
                    {this.props.id === "createTask" ? "Create" : "Save"}
                </button>
            </div>
        );
    }
}
