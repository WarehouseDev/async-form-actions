import { useState, useActionState } from "react";

import Loader from "./components/Loader";

function App() {
  const [universities, setUniversities] = useState([]);

  async function universityAction(prevState, formData) {
    const country = formData.get("country");

    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      if (!response.ok) {
        throw new Error("Oops! Something went wrong!" + response.status);
      }
      const data = await response.json();
      console.log(data);
      setUniversities(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [formState, formAction, pending] = useActionState(universityAction);

  return (
    <div className="App">
      <h1>Search Universities in every country!</h1>
      <form action={formAction}>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="enter country name"
        />
        <button type="submit" disabled={pending}>
          {pending ? "Searching" : "Serach"}
        </button>
      </form>
      {pending ? (
        <Loader />
      ) : (
        <ul>
          {universities.length > 0 &&
            universities.map((uni) => <li key={uni.name}>{uni.name}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
