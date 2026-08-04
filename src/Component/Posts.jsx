import { getPost, deletePost } from "../api/PostApi";
import { useEffect, useState } from "react";
import "../App.css";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const [showForm, setShowForm] = useState(false); 

  //fetch all post from api
  const getPostData = async () => {
    const res = await getPost();
    console.log(res);
    setData(res.data);
  };
  //run once
  useEffect(() => {
    getPostData();
  }, []);

  //function to delete
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newupdated = data.filter((curElem) => {
          return curElem.id !== id;
        });
        setData(newupdated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update
  const handleUpdate = (curElem) => {
    setUpdateDataApi(curElem);
  };

  return (
    <>
      <section className="secForm">
        <div className="Div-btn">
        <button className="btn-open" onClick={() => setShowForm(true)}>
          ADD
        </button>
        </div>
     
      {showForm && (
        <Form
          data={data} //all post
          setData={setData} //update
          setUpdateDataApi={setUpdateDataApi} //edit
          updateDataApi={updateDataApi} //select
        />
      )}

      <section className="secBox">
        <ol>
          {data.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdate(curElem)}>Update</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
       </section>
    </> 
  );
};
