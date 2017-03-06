import R from "ramda";
import React from "react";
import ReactDOM from "react-dom";
import Form from "./react-form";
import Comparison from "./react-comparison";
import * as calculator from "./calculator";
import * as accounts from "./accounts";

class Main extends React.Component {

  constructor(props) {
    super(props);
    var newState = {
      data: {},
      messages: {}
    };

    newState.data[accounts.DATA_KEY_VALUES.CURRENT_MARGIN_TAX_RATE] = null;
    newState.data[accounts.DATA_KEY_VALUES.RETIREMENT_AVERAGE_TAX_RATE] = null;
    newState.data[accounts.DATA_KEY_VALUES.AMOUNT_OF_DEPOSIT] = null;
    newState.data[accounts.DATA_KEY_VALUES.YEARS_INVESTED] = null;
    newState.data[accounts.DATA_KEY_VALUES.RETURN_ON_INVESTMENT] = null;
    newState.data[accounts.DATA_KEY_VALUES.INFLATION_RATE] = null;

    newState.messages[accounts.DATA_KEY_VALUES.CURRENT_MARGIN_TAX_RATE] = null;
    newState.messages[accounts.DATA_KEY_VALUES.RETIREMENT_AVERAGE_TAX_RATE] = null;
    newState.messages[accounts.DATA_KEY_VALUES.AMOUNT_OF_DEPOSIT] = null;
    newState.messages[accounts.DATA_KEY_VALUES.YEARS_INVESTED] = null;
    newState.messages[accounts.DATA_KEY_VALUES.RETURN_ON_INVESTMENT] = null;
    newState.messages[accounts.DATA_KEY_VALUES.INFLATION_RATE] = null;

    this.state = newState;

    this.updateState = this.updateState.bind(this);
    this.updatePropertyInState = this.updatePropertyInState.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  updateState (newState) {
    this.setState(previousState => {
      var newData = R.merge(previousState.data, newState.data);
      var newMessages = R.merge(previousState.messages, newState.messages);
      return { data: newData, messages: newMessages };
    });
  }

  updatePropertyInState (key, value, message) {
    var propertyState = { data: {}, messages: {} };
    propertyState.data[key] = value;
    propertyState.messages[key] = message;
    this.updateState(propertyState);
  }

  getMessage (key) {
    var message = this.state.messages[key];
    return message ? message : "";
  }

  render() {
    return (
      <div>
        <Form updatePropertyInState={this.updatePropertyInState} getMessage={this.getMessage} />
        <Comparison parentState={this.state} />
      </div>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
