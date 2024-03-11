import { Form } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="form-signin text-center w-100 m-auto">
      <Form action="/home">
        <h1 className="h3 mb-3 fw-normal">Login</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="admin"
            value="admin"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="admin"
            value="admin"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </Form>
    </main>
  );
}

export default App;
