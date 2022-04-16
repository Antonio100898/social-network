import reactDom from 'react-dom';
import MainApp from './App';
import React from "react";

test('renders without crashing', () => {
  const div = document.createElement("div");
  reactDom.render(<MainApp/>, div);
  reactDom.unmountComponentAtNode(div);
});
