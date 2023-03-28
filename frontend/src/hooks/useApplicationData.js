import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_APPLICATION_DATA,
} from "../reducers/application";

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    users: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/users"),
    ]).then((all) => {
      // copy users into an object
      // console.log("APPLICATION USERS: >>>> ", all[0].data)
      const users = {};
      for (const user of all[0].data) {
        users[user.id] = user;
      }

      dispatch({
        type: SET_APPLICATION_DATA,
        users,
      });
    });
  }, []);

  return {
    state,
  };
}

export default useApplicationData;