import React, { Component } from "react";
import { IProviderProps } from "../../models/providerProps.model";
import ToDoList from "./ToDoList/ToDoList";
import "./ToDoListWrapper.scss";
import ConsumerWrapper from "../Context/ConsumerWrapper";
import { ToDoListHeader } from "./ToDoListHeader/ToDoListHeader";

class ToDoListWrapper extends Component<IProviderProps, any> {
  render() {
    return (
      <div className="to-do-wrapper to-do-card h-100 rounded">
        <ToDoListHeader {...this.props} />
        <ToDoList {...this.props} />
      </div>
    );
  }
}

export default ConsumerWrapper(ToDoListWrapper);
