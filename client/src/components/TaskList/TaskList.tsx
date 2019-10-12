import React, { Component } from "react";
import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { ITasks, ITask } from "../../models/task.model";
import TaskTable from "../TaskTable/TaskTable";
import "./taskList.scss";
import { parseDate } from "../../assets/unitls/Utils";

interface IState {
  selectedDate: Date;
  monthTasks: ITasks[];
  tasks: ITask[];
}

export default class TaskList extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      monthTasks: [],
      tasks: []
    };
  }

  componentDidMount() {
    this.getTasks(new Date());
  }

  getTasks = (selectedDate: Date) => {
    const dateStr = parseDate(selectedDate);
    fetch("tasks/" + dateStr)
      .then(res => res.json())
      .then((monthTasks: ITasks[]) => {
        const selectedDateTask = monthTasks.find(task => task.date == dateStr);
        const tasks = selectedDateTask ? selectedDateTask.tasks : [];
        this.setState(prevState => ({
          ...prevState,
          selectedDate,
          monthTasks,
          tasks
        }));
      });
  };

  handleDateChange = ({ value }: DatePickerChangeEvent) => {
    if (value) {
      this.getTasks(value);
    }
  };

  setDate = (index: number) => {
    const newDate = this.state.selectedDate;
    newDate.setDate(newDate.getDate() + index);
    this.getTasks(newDate);
  };

  render() {
    const { tasks, selectedDate } = this.state;
    return (
      <div className="task-list-card h-100 rounded">
        <header className="d-flex align-items-center p-1">
          <a className="nav prev" onClick={() => this.setDate(-1)}>
            <i className="fas fa-caret-left" />
          </a>
          <div className="col text-center">
            <DatePicker
              onChange={this.handleDateChange}
              format="dd/MMMM/yyyy"
              value={selectedDate}
            />
          </div>
          <a className="nav next" onClick={() => this.setDate(1)}>
            <i className="fas fa-caret-right" />
          </a>
        </header>
        <div className="row m-0" style={{ height: "calc(100% - 40px)" }}>
          <TaskTable tasks={tasks} selectedDate={selectedDate} getTasks={this.getTasks} />
        </div>
      </div>
    );
  }
}
