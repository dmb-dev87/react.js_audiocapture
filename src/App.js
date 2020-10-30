import React from "react";
import { Route } from "react-router";
import "./custom.css";

import Transcription from "./scenes/Transcription";

const App = () => {
  return <Route exact path="/" component={Transcription} />;
};

export default App;
