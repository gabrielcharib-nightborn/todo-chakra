import { useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

type AddTaskFormProps = {
  onAddTask: (newTaskTitle: string) => void;
};

function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTaskTitle) {
      onAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <Flex as='form' onSubmit={handleSubmit}>
      <Input
        placeholder='Add a task'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Button type='submit'>Add Task</Button>
    </Flex>
  );
}

export default AddTaskForm;
