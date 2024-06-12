import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL padrão do back-end
});

export { api };
