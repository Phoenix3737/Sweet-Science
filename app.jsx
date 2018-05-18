// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Parent Component
var Home = require("./src/component/pages/Home.js");

// This code here allows us to render our main component (in this case Main)
// Note that the Id is "root" which matches that of the "index.html" file
ReactDOM.render(<Home />, document.getElementById("root"));
