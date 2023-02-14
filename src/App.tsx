import { useState } from "react";
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

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

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

function TaskItem({
  task,
  onToggle,
  onRemove,
}: {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <Checkbox isChecked={task.completed} onChange={onToggle}>
      {task.title}
      <CloseButton onClick={onRemove} />
    </Checkbox>
  );
}

function TaskList({
  tasks,
  onToggle,
  onRemove,
}: {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
}) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onRemove={() => onRemove(task.id)}
        />
      ))}
    </>
  );
}

function AddTaskForm({ onAdd }: { onAdd: (newTaskTitle: string) => void }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle) {
      onAdd(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder='Add a task'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />

      <Button type='submit' leftIcon={<AddIcon />} variant='outline'>
        Add Task
      </Button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTaskTitle: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
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
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleComplete} onRemove={removeTask} />
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
