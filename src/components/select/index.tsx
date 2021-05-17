import React from "react";
import { GenreType } from "../../interfaces/Genre";

interface Props {
  selectList?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  genres?: GenreType[];
  optionElements?: string[];
  initialValue?: number;
}

const renderOption = (props: Props) => {
  if (props.genres !== undefined) {
    return (
      props.genres &&
      props.genres.map((genre: GenreType) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))
    );
  } else if (props.optionElements !== undefined) {
    const values = props.optionElements;
    return values.map((val, index) => (
      <option key={val} value={index}>
        {val}
      </option>
    ));
  }
};

export const Select = (props: Props) => {
  return (
    <select
      value={props.initialValue}
      className="select"
      onChange={props.selectList}
    >
      {props.genres !== undefined && <option value={0}></option>}
      {renderOption(props)}
    </select>
  );
};