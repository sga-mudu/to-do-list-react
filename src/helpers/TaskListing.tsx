import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function TaskListing() {
    // Initialize tasks from localStorage directly
    const [tasks, setTasks] = useState<string[]>(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            try {
                return JSON.parse(storedTasks);
            } catch (e) {
                return [];
            }
        }
        return [];
    });
    const [inputVal, setInputVal] = useState("");

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (inputVal.trim() === "") {
            alert("Please enter a task");
            return;
        }
        setTasks([...tasks, inputVal]);
        setInputVal(""); // Clear input after adding
    };

    const editTask = (index: number) => {
        const newTask = prompt("Edit task:", tasks[index]);
        if (newTask !== null && newTask.trim() !== "") {
            const updatedTasks = tasks.map((t, i) => i === index ? newTask : t);
            setTasks(updatedTasks);
        }
    };

    const removeTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const removeAllTasks = () => {
        setTasks([]);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col text-center">
            <CardHeader className="flex flex-col items-center gap-2">
                <h1 className="text-lg font-semibold">To Do List</h1>
                <p className="text-sm text-muted-foreground">Manage your tasks efficiently</p>
                <div className="flex flex-row gap-2 mt-4">
                    <Input
                        value={inputVal}
                        type="text"
                        placeholder="Add task"
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    <div className="flex flex-row gap-2">
                        <Button onClick={addTask} className="hover:bg-amber-500 hover:text-black">Add</Button>
                        <Button onClick={removeAllTasks} className="hover:bg-amber-500 hover:text-black">Remove All</Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-grow overflow-y-auto">
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className="flex flex-row p-2 justify-center items-center border-b last:border-b-0 gap-3">
                            {task}
                            <Button onClick={() => removeTask(index)}
                                className="hover:bg-amber-500 hover:text-black">Remove</Button>
                            <Button onClick={() => editTask(index)}
                                className="hover:bg-amber-500 hover:text-black">Edit</Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default TaskListing;