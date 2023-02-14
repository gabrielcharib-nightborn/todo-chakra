import { useState } from "react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Heading,
  Input,
  Button,
  Checkbox,
  CloseButton,
  extendTheme,
} from "@chakra-ui/react";

// The default icon size is 1em (16px)
{
  /* <PhoneIcon />

// Use the `boxSize` prop to change the icon size
<AddIcon boxSize={6} />

// Use the `color` prop to change the icon color
<WarningIcon w={8} h={8} color="red.500" /> */
}

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const addTask = () => {
    if (newTaskTitle) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <VStack>
      <Heading as='h1' size='2xl'>
        My Todo List
      </Heading>
      <Input
        placeholder='Add a task'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <AddIcon onClick={addTask}>Add Task</AddIcon>
      {tasks.map((task) => (
        <Checkbox
          key={task.id}
          isChecked={task.completed}
          onChange={() => toggleComplete(task.id)}
        >
          {task.title}

          <DeleteIcon boxSize={4} onClick={() => removeTask(task.id)} />
        </Checkbox>
      ))}
    </VStack>
  );
}

function MainApp() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}

export default MainApp;
