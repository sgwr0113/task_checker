import React, { useState, useContext } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { DataContext } from "../../pages/home";
import { GenreType } from "../../interfaces/Genre";
import { genreRequest } from "../../requests/genreRequest";
import "./style.css";

export const GenreBody = () => {
  const [genreName, setGenreName] = useState<string>("");
  const { data, dispatch } = useContext(DataContext);

  const onClickSubmit = async () => {
    const newData: GenreType = {
      id: 0,
      name: genreName,
    };
    try {
      const genres: GenreType[] = await genreRequest("createGenres", {
        data: newData,
      });
      dispatch({ type: "success", payload: { genre: genres } });
      setGenreName("");
    } catch (err) {
      dispatch({ type: "failure", payload: { error: err.message } });
    }
  };

  const handleOnDelete = async (genre: GenreType) => {
    try {
      const genres: GenreType[] = await genreRequest("deleteGenres", {
        data: genre,
      });
      dispatch({ type: "success", payload: { genre: genres } });
    } catch (err) {
      dispatch({ type: "failure", payload: { error: err.message } });
    }
  };

  const handleChangeGenre = (val: React.ChangeEvent<HTMLInputElement>) => {
    setGenreName(val.target.value);
  };

  return (
    <div className="flex direction_column horizontal_center vertical_center">
      <h2 className="input_menu">ジャンル編集</h2>
      <ul>
        {data.genreData.map((genre: GenreType) => {
          return (
            <li className="genre_title flex space_between" key={genre.id}>
              <span>{genre.name}</span>
              <CancelIcon onClick={() => handleOnDelete(genre)} />
            </li>
          );
        })}
      </ul>
      <input type="text" value={genreName} onChange={handleChangeGenre} />
      <input
        className="input_submit"
        type="button"
        value="追加"
        onClick={onClickSubmit}
      />
    </div>
  );
};