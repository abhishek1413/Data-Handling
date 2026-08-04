import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmp = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);//if changes setAddData runs

  const inputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePostData = async () => {
    try {
      const safeId = updateDataApi.id > 100 ? (updateDataApi.id % 100) || 1 : updateDataApi.id; 
      const res = await updateData(safeId, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((present) => {
            return present.id === updateDataApi.id ? { ...res.data, id: updateDataApi.id } : present;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPostData = async () => {
    if(addData.title===""||addData.body===""){
      alert("Please enter the filled.. ");
      return;
    }
    try {
      const res = await postData(addData);
      if (res.status === 201) {
        setData([res.data,...data]);
        alert("Successfully added");
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };
  return (
    <div className="fDiv">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add Title"
              value={addData.title}
              onChange={inputchange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="body">
            <input
              type="text"
              id="body"
              name="body"
              placeholder="Add Post"
              value={addData.body}
              onChange={inputchange}
            />
          </label>
        </div>
        <button type="submit" value={isEmp ? "Add" : "Edit"}>
          {isEmp ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};
