import { useState } from "react";

import { AddIcon, DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Heading,
  Input,
  Button,
  Checkbox,
  IconButton,
  CloseButton,
  extendTheme,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function TodoList() {
  //////////////////////////////////////////////////////
  // block 1 : les variables + setteurs
  //////////////////////////////////////////////////////
  const { colorMode, toggleColorMode } = useColorMode();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const [inputValue, setInputValue] = useState("");

  ////////////////////////////////////////////////////
  // Fonction pour ajouter une tâche
  ///////////////////////////////////////////////////
  const addTask = () => {
    if (newTaskTitle) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      //////////////////////////////////////////////////////
      // On ajoute la nouvelle
      /////////////////////////////////////////////////////
      setTasks([...tasks, newTask]);
      // On réinitialise le champ de saisie du nouveau titre
      setNewTaskTitle("");
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      console.log("L'utilisateur a appuyé sur la touche Entrée !");
      setNewTaskTitle(event.currentTarget.value);
      addTask();
    }
  }

  /////////////////////////////////////////////////////////
  // Fonction pour supprimer une tâche
  /////////////////////////////////////////////
  const removeTask = (taskId: number) => {
    // On filtre les tâches pour retirer celle qui a l'id correspondant
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  ////////////////////////////////////////////////////////////////
  // Fonction pour changer l'état d'une tâche
  //////////////////////////////////////////////////////////////////
  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          /////////////////////////////////////////////////////////////////////////////
          // On retourne une copie de la tache mis à jour
          ////////////////////////////////////////////////////////////////////////
          return { ...task, completed: !task.completed };
        } else {
          ////////////////////////////////////////////////
          // tout autre taches
          ///////////////////////////////////////////////
          return task;
        }
      })
    );
  };

  return (
    <VStack>

      <Button onClick={toggleColorMode} m={4}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Heading as='h1' size='2xl'>
        My Todo List
      </Heading>
      <Input
        placeholder='Add a task'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      {/*  centre le bouton  */}
      <Button mx='auto' onClick={addTask}>
        Add Task
      </Button>
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <TodoList />
    </ChakraProvider>
  );
}

export default App;
