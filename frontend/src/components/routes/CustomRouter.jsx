import { Router } from "react-router-dom";
import { useState, useLayoutEffect } from "react";

export default function CustomRouter({ history, ...props }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
