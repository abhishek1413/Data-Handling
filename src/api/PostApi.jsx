import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//GET[Read]
export const getPost = () => {
  return api.get("/posts");
};

//Delete
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//post[Create]
export const postData = (post) => {
  return api.post("/posts", post);
};

//put[update]
export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
