const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_USER = "SET_USER";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_APPLICATION_DATA:
      return {
        ...state,
        users: action.users,
      };

    case SET_USER:
      return {
        ...state,
        users: action.users,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_APPLICATION_DATA,
  SET_USER,
};