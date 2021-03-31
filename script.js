class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: "",
      preVal: "",
      currentVal: "",
      displayVal: "" };

    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEqualSign = this.handleEqualSign.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleNumber(e) {
    let updateVal = e.target.value;
    let { operation, preVal, displayVal } = this.state;
    if (preVal == "=") {
      operation = "";
      displayVal = "";
    }
    if (updateVal == "0" && /^0/.test(displayVal)) {//prevent multiple zeros at the beginning of a number

    } else {
      this.setState({
        currentVal: updateVal,
        displayVal:
        /[+\-\/*]/.test(preVal) ?
        updateVal :
        displayVal + updateVal,
        operation: operation + updateVal,
        preVal: updateVal });

    }
  }

  handleOperator(e) {
    let updateVal = e.target.value;
    let { operation, preVal, displayVal } = this.state;
    if (preVal == "=") {
      operation = displayVal;
      displayVal = "hello";
    }
    this.setState({
      currentVal: updateVal,
      displayVal: updateVal });

    if (updateVal == "-") {//if input is "-"
      this.setState({
        operation:
        /[+\-\/*]-$/.test(operation) ?
        operation :
        operation + updateVal,
        preVal: updateVal });

    } else {//if input is "+","/" or "*"
      if (/[+\-\/*]/.test(preVal)) {
        this.setState({
          operation:
          /[+\-\/*]-$/.test(operation) ?
          operation.slice(0, -2) + updateVal :
          operation.slice(0, -1) + updateVal,
          preVal: updateVal });

      } else {
        this.setState({
          operation: operation + updateVal,
          preVal: updateVal });

      }
    }
  }

  handleDecimal(e) {
    let updateVal = e.target.value;
    let { operation, preVal, displayVal } = this.state;
    if (preVal == "=") {
      operation = "";
      displayVal = "";
    }
    if (displayVal == "" || /[+\-\/*]/.test(displayVal)) {
      this.setState({
        displayVal: "0" + updateVal,
        operation: operation + "0" + updateVal });

    } else if (!/\./.test(displayVal)) {
      this.setState({
        displayVal: displayVal + updateVal,
        operation: operation + updateVal });

    } else {}
    this.setState({
      currentVal: updateVal,
      preVal: updateVal });

  }

  handleEqualSign() {
    const { operation, preVal, displayVal } = this.state;
    let endTrimmed = operation.replace(/[+\-\/*]{1,2}$/, " ");
    let result = eval(endTrimmed.replace(/\-\-/, "+"));
    if (!/=/.test(preVal) && !/^[\/*]/.test(operation)) {
      this.setState({
        currentVal: "=",
        operation: endTrimmed + "=" + result,
        displayVal: result,
        preVal: "=" });

    }
  }

  handleClear() {
    this.setState({
      operation: "",
      preVal: "",
      currentVal: "",
      displayVal: "" });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "appWrapper" }, /*#__PURE__*/
      React.createElement(Display, {
        upperScreen: this.state.operation,
        lowerScreen: this.state.displayVal }), /*#__PURE__*/
      React.createElement(Buttons, {
        clear: this.handleClear,
        number: this.handleNumber,
        operator: this.handleOperator,
        decimal: this.handleDecimal,
        equalSign: this.handleEqualSign })));


  }}


class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let answer = this.props.lowerScreen; //for answer display
    let display;
    if (answer === "") {
      display = /*#__PURE__*/React.createElement("div", { id: "display" }, "0");
    } else if (answer.length > 21) {
      answer = Math.round(1000000000000 * answer) / 1000000000000;
      display = /*#__PURE__*/React.createElement("div", { id: "display", style: { "font-size": "30px" } }, "OVER DIGIT LIMIT");
    } else {
      display = /*#__PURE__*/React.createElement("div", { id: "display" }, this.props.lowerScreen);
    }

    let operation = this.props.upperScreen; // for operation display
    let upperscreen;
    if (operation.length > 111) {
      upperscreen = operation.slice(-111);
    } else {
      upperscreen = operation;
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "displayWrapper" }, /*#__PURE__*/
      React.createElement("div", { id: "operation" }, upperscreen),
      display));

  }}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "buttonsWrapper" }, /*#__PURE__*/
      React.createElement("button", { id: "clear", value: " ", onClick: this.props.clear }, "Clear"), /*#__PURE__*/
      React.createElement("button", { id: "nine", value: "9", onClick: this.props.number }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "eight", value: "8", onClick: this.props.number }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "seven", value: "7", onClick: this.props.number }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "six", value: "6", onClick: this.props.number }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "five", value: "5", onClick: this.props.number }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "four", value: "4", onClick: this.props.number }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "three", value: "3", onClick: this.props.number }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "two", value: "2", onClick: this.props.number }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "one", value: "1", onClick: this.props.number }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "zero", value: "0", onClick: this.props.number }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "add", value: "+", onClick: this.props.operator }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", value: "-", onClick: this.props.operator }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", value: "*", onClick: this.props.operator }, "x"), /*#__PURE__*/
      React.createElement("button", { id: "divide", value: "/", onClick: this.props.operator }, "/"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", value: ".", onClick: this.props.decimal }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", value: "=", onClick: this.props.equalSign }, "=")));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));