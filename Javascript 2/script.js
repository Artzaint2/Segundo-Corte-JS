document.addEventListener("DOMContentLoaded", function() {
  const activityForm = document.getElementById("activity-form");
  const activityList = document.getElementById("activity-list");
  const clearButton = document.getElementById("clear-button");
  const saveButton = document.getElementById("save-button");

  let activities = JSON.parse(localStorage.getItem('activities')) || [];

  let editIndex = -1; 

  function addActivity(activity) {
    if (editIndex === -1) {
      activities.push(activity);
    } else {
      activities[editIndex] = activity;
      editIndex = -1;
    }
    updateActivityList();
    saveActivitiesLocally();
  }

  function deleteActivity(index) {
    activities.splice(index, 1);
    updateActivityList();
    saveActivitiesLocally();
  }

  function editActivity(index) {
    const editedActivity = activities[index];
    document.getElementById("activity-name").value = editedActivity.activityName;
    document.getElementById("description").value = editedActivity.description;
    document.getElementById("days").value = editedActivity.days;
    document.getElementById("start-date").value = editedActivity.startDate;
    document.getElementById("end-date").value = editedActivity.endDate;
    document.getElementById("responsible").value = editedActivity.responsible;

    editIndex = index;
    saveButton.style.display = "block";
  }

  function saveActivitiesLocally() {
    localStorage.setItem('activities', JSON.stringify(activities));
  }

  function updateActivityList() {
    activityList.innerHTML = "";
    activities.forEach((activity, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <b>Nombre de la Actividad:</b> ${activity.activityName}<br>
        <b>Descripción:</b> ${activity.description}<br>
        <b>Cantidad de días:</b> ${activity.days}<br>
        <b>Fecha de inicio:</b> ${activity.startDate}<br>
        <b>Fecha de fin:</b> ${activity.endDate}<br>
        <b>Responsable:</b> ${activity.responsible}<br>
        <button class="edit-button" data-index="${index}">Modificar</button>
        <button class="delete-button" data-index="${index}">Eliminar</button>
      `;
      activityList.appendChild(li);
    });

    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        editActivity(index);
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        deleteActivity(index);
      });
    });
  }

  clearButton.addEventListener("click", function() {
    showConfirmation();
  });

  saveButton.addEventListener("click", function() {
    saveEditedActivity();
  });

  activityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const activityName = document.getElementById("activity-name").value;
    const description = document.getElementById("description").value;
    const days = document.getElementById("days").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const responsible = document.getElementById("responsible").value;

    addActivity({
      activityName,
      description,
      days,
      startDate,
      endDate,
      responsible
    });

    activityForm.reset();
  });

  function saveEditedActivity() {
    const activityName = document.getElementById("activity-name").value;
    const description = document.getElementById("description").value;
    const days = document.getElementById("days").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const responsible = document.getElementById("responsible").value;

    const editedActivity = {
      activityName,
      description,
      days,
      startDate,
      endDate,
      responsible
    };

    activities[editIndex] = editedActivity;

    activityForm.reset();

    saveButton.style.display = "none";
    editIndex = -1;

    updateActivityList();
    saveActivitiesLocally();
  }

  function showConfirmation() {
    const result = confirm("¿Seguro que desea eliminar todas las actividades?");
    if (result) {
      activities = [];
      updateActivityList();
      saveActivitiesLocally();
    }
  }

  updateActivityList();
});
