const input = document.querySelector("#input-task");
const addButton = document.querySelector("#btn-add-task");
const tasksContainer = document.querySelector(".tasks");

// keyboard
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addButton.click();
    }
});

let currentTask = 1;

addButton.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    //store input in a task
    const taskText = `${currentTask}. ${input.value}`;
    currentTask++;
    
    //reset the input
    input.value = "";

    //-------------- Creating the Task Row --------------
    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");
    
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = taskText;

    const checkButton = document.createElement("button");
    checkButton.classList.add("btn-check");
    
    
    let checkButtonFlag = false;
    // checkButton functionallity
    checkButton.addEventListener("click", () => {
        if(!checkButtonFlag) {
            // Asociating the image to the button
            const checkImage = document.createElement("img");
            checkImage.classList.add("check-image")
            checkImage.src = "./images/check.png";
            checkButton.appendChild(checkImage);
        
            // Styling the task
            task.style.textDecoration = "line-through";
            task.style.opacity = "0.6";
            task.style.fontStyle = "italic";

            checkButtonFlag = true;

        } else {
            // Reseting the values
            checkButton.innerHTML = "";
            task.style.textDecoration = "none";
            task.style.opacity = "1";
            checkButtonFlag = false;
        }
        

    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    const deleteImage = document.createElement("img");
    deleteImage.classList.add("trash-image");
    deleteImage.src = "./images/trash.png";
    deleteButton.appendChild(deleteImage);

    // delete button functionallity
    deleteButton.addEventListener("click", () => {
        taskRow.remove();

        const allTasks = document.querySelectorAll(".task");
        allTasks.forEach((task, index) => {
            const taskText = task.textContent.split(". ")[1]; // ["1", "task"] <-- stores task
            task.textContent = `${index + 1}. ${taskText}`; // giving the correct index
        });

        currentTask--;

    });

    task.addEventListener("dblclick", () => {
        const originalText = task.textContent.split(". ")[1];
        const taskNumber = task.textContent.split(". ")[0];
    
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = originalText;
        editInput.classList.add("edit-input");
    
        // Replace the task div with the input
        taskRow.replaceChild(editInput, task);
    
        const saveEdit = () => {
            if (editInput.value.trim() === "") {
                editInput.value = originalText; // restore original if empty
            }
    
            task.textContent = `${taskNumber}. ${editInput.value}`;
            taskRow.replaceChild(task, editInput);
        };
    
        // Save on Enter
        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        });
    });
    
    
    taskRow.appendChild(checkButton);
    taskRow.appendChild(task);
    taskRow.appendChild(deleteButton);

    tasksContainer.appendChild(taskRow);

    // ----------------------------------------------------------------------
});
