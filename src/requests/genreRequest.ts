import axiosBase from "axios";
import { GenreType } from "../interfaces/Genre";

type action = "fetchGenres" | "createGenres" | "deleteGenres";

type parameter = { data: GenreType };

const api = axiosBase.create({
  baseURL: "http://localhost:3000/genres",
  responseType: "json",
});

export const genreRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  if (parameter) {
    switch (action) {
      case "createGenres":
        const createGenres = await api.post(`/`, parameter.data);
        return createGenres.data;
      case "deleteGenres":
        const updateGenres = await api.delete(`/${parameter.data.id}`);
        return updateGenres.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchGenres":
        const genres = await api.get("/");
        return genres.data;
      default:
        return null;
    }
  }
};