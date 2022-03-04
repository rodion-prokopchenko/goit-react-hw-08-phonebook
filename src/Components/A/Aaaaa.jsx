import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "./data";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  padding: "8rem",
};
const Undo = ({ onUndo }) => {
  const handleClick = () => {
    onUndo();
  };

  return (
    <div>
      <h3>
        Row Deleted <button onClick={handleClick}>UNDO</button>
      </h3>
    </div>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "QUEUE_FOR_REMOVAL":
      return {
        collection: state.collection,
        toRemove: [...state.collection, action.id],
      };
    case "CLEAN_COLLECTION":
      return {
        collection: state.collection.filter(
          (v) => !state.toRemove.includes(v.id)
        ),
        toRemove: [],
      };
    case "UNDO":
      return {
        collection: state.collection,
        toRemove: state.toRemove.filter((v) => v !== action.id),
      };
    default:
      return state;
  }
}

export default function Aaaa() {
  const [state, dispatch] = React.useReducer(reducer, {
    collection: data,
    toRemove: [],
  });

  const removeRow = (e) => {
    const id = e.target.dataset.rowId;

    dispatch(
      {
        id,
        type: "QUEUE_FOR_REMOVAL",
      },
      console.log("QFR: ", id)
    );

    toast(
      <Undo
        onUndo={() => (
          dispatch({ id, type: "UNDO" }), console.log("undo: ", id)
        )}
      />,
      {
        onClose: () =>
          dispatch(
            { type: "CLEAN_COLLECTION" },

            console.log("C state: ", state.toRemove)
          ),
      }
    );
  };

  const renderRows = () => {
    return state.collection
      .filter((v) => !state.toRemove.includes(v.id))
      .map((v) => (
        <tr key={v.id}>
          <td>{v.firstName}</td>
          <td>{v.lastName}</td>
          <td>
            <button onClick={removeRow} data-row-id={v.id}>
              Delete
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <div style={styles}>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>firstname</th>
            <th />
          </tr>
          {renderRows()}
        </tbody>
      </table>
      <ToastContainer closeOnClick={false} closeButton={false} />
    </div>
  );
}
