// document.addEventListener('DOMContentLoaded', () => {
const tasks = document.querySelectorAll(".task");
const boards = document.querySelectorAll(".boards");
const addItem = document.querySelector(".add-item");
const addItemToBoard = document.querySelector(".submit-btn")
const input = document.querySelector("#taskTitle");
const description = document.querySelector("#taskDesc");
const priority = document.querySelector(".priority-container");
const tagContainer = document.querySelectorAll(".tag-container");



let draggedTask = null;

function updateTotalCount() {
    boards.forEach((board, index) => {
        const taskList = board.querySelector(".task-list");
        if (taskList) {
            const taskCount = taskList.querySelectorAll(".task").length;

            const updateCount = board.querySelector(".task-count");
            console.log("updateCount: ", updateCount)
            if (updateCount) {
                // const originalTitle = boardTitle.textContent.split('(')[0].trim();
                updateCount.textContent = taskCount
            }

            console.log(`Board ${index} count updated: ${taskCount} tasks`);
        }
    });
}



tasks.forEach((task, index) => {
    task.setAttribute("draggable", true);
    task.id = `task-${index}`;
    console.log("task", task)

    updateTotalCount()

    task.addEventListener("dragstart", function () {
        draggedTask = task;
    });

});

boards.forEach((board, index) => {
    board.id = `board-${index}`;
    const taskList = board.querySelector(".task-list");
    if (taskList) {
        taskList.id = `list-${index}`;
    }

    board.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    board.addEventListener("drop", function (e) {
        e.preventDefault();

        if (draggedTask) {
            const taskList = this.querySelector(".task-list");
            if (taskList) {
                taskList.appendChild(draggedTask);
                updateTotalCount()



            } else {
                console.error("No task list found in board:", this.id);
            }
        } else {
            console.error("No dragged task reference");
        }
    });
});

addItem.addEventListener("click", () => {
    document.querySelector(".container").style.display = "block";
    document.querySelector("#nav").style.filter = "blur(1px)";
    document.querySelector("#nav").style.pointerEvents = "none";
    document.querySelector(".kanban-container").style.filter = "blur(1px)";
    document.querySelector(".kanban-container").style.pointerEvents = "none";
})


function closeModal() {
    document.querySelector(".container").style.display = "none";
    document.querySelector("#nav").style.filter = "blur(0px)";
    document.querySelector("#nav").style.pointerEvents = "auto";
    document.querySelector(".kanban-container").style.filter = "blur(0px)";
    document.querySelector(".kanban-container").style.pointerEvents = "auto";
}


let selectedPriority = null;

let tags = [];

function selectPriority(priority, element) {
    document.querySelectorAll(".priority").forEach(div => {
        div.classList.remove("selected");
    });

    element.classList.add("selected");
    selectedPriority = priority;
}

document.getElementById("tagInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefaul();
        if (this.value.trim() === "" || tags.length >= 2) {
            return;
        }
        addTag(this.value.trim());
        this.value = "";
    }
});

function addTag(tagText) {
    if (tags.length >= 2) return;
    if (
        tagText.includes(`'`) ||
        tagText.includes(`"`) ||
        tagText.includes("`") ||
        tags.includes(tagText)
      ) {
        alert("Valid and unique tags only");
        return;
      }
    tags.push(tagText);
    console.log("add tags: ", tags)
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerHTML = `${tagText} <button onclick="removeTag(this, '${tagText}')">&times;</button>`;
    document.getElementById("tags-container").appendChild(tag);
}

function removeTag(button, tagText) {
    tags = tags.filter(tag => tag !== tagText);
    console.log(tags)
    button.parentElement.remove();
}

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const taskData = {
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDesc").value,
        priority: selectedPriority,
        tags: tags,
    };
    console.log(taskData);
    if(taskData.title.length === 0 || description.length === 0 || priority=== null){
        alert("Please Fill the required fields")
        console.log("Please Fill the required fields")
        return;
    }
});

document.querySelector(".cancel-btn").addEventListener("click", function (event) {
    event.preventDefault();
    closeModal();

})



// });