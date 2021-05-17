import { useState } from "react";
import { TaskType } from "../interfaces/Task";

export const useSortTasks = (): [
  TaskType[],
  (tasks: TaskType[], selectGenreId: number) => void
] => {
  const initialTasks = [
    {
      id: 0,
      name: "",
      explanation: "",
      deadline_date: "",
      status: 0,
      genre_id: 0,
    },
  ];

  const [sortedTasks, setSortedTasks] = useState<TaskType[]>(initialTasks);  // sortedTasksはタスクの集合（配列）

  const fetchSortedTasks = (tasks: TaskType[], selectGenreId: number) => {
    setSortedTasks(() => {  /* setSortedTasksをどう変化させるか */
      if (selectGenreId === 0) {
        return tasks;
      }
      return tasks.filter((task: TaskType) => {  /* filter(()=> true)で適合したもののみ返す */
        return selectGenreId === task.genre_id;
      });
    });
  };

  return [sortedTasks, fetchSortedTasks];
};