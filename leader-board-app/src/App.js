import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4000/leader-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setName(name);
        setMessage("User created successfully");
        fetchData();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = ({ id, name }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setName(name);
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the unit price state value
    setName(null);
  };

  const handleDelete = async (val) => {
    console.log("tests", val);
    try {
      let res = await fetch(`http://localhost:4000/leader-board/${val}`, {
        method: "DELETE",
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setMessage("User Deleted successfully");
        fetchData();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (val) => {
    try {
      let res = await fetch(`http://localhost:4000/leader-board/${val.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setMessage("User Update successfully");
        fetchData();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (val, newindex) => {
    let x = array_move(users, val.target.value, newindex);
    setUsers([...x]);
    console.log([...x]);
    setName(name);
    try {
      let res = await fetch("http://localhost:4000/leader-board/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [...x],
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setName(name);
        setMessage("Reordered successfully");
        fetchData();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = () => {
    fetch("http://localhost:4000/leader-board")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data.board);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {}
    }
    console.log(old_index, new_index);
    arr.splice(new_index - 1, 0, arr.splice(old_index - 1, 1)[0]);
    console.log(arr);
    return arr; // for testing
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div className="container">
        <h1>Leader Board </h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <tr key={item.rank}>
                <td>{item.rank}</td>
                <td>
                  <select
                    value={item.rank}
                    onChange={(e) => handleChange(e, item.rank)}
                  >
                    {users.map((option, i) => (
                      <option key={i} value={option.rank}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.rank ? (
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.rank ? (
                    <React.Fragment>
                      <button
                        className={"btn-success"}
                        onClick={() =>
                          handleUpdate({
                            id: item.rank,
                            name: item.name,
                          })
                        }
                      >
                        Save
                      </button>

                      <button
                        className={"btn-secondary"}
                        style={{ marginLeft: 8 }}
                        onClick={() => onCancel()}
                      >
                        Cancel
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <button
                        className={"btn-primary"}
                        onClick={() =>
                          onEdit({
                            id: item.rank,
                            name: item.name,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={"btn-primary"}
                        onClick={() => handleDelete(item.rank)}
                      >
                        X
                      </button>
                    </React.Fragment>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Add</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
