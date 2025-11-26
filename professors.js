
let professors = [
    { id: 1, name: "Juan Pérez", course: "Programación I", schedule: "Lunes y Miércoles 10:00 - 12:00" },
    { id: 2, name: "Ana Gómez", course: "Álgebra Lineal", schedule: "Martes y Jueves 8:00 - 10:00" },
    { id: 3, name: "Carlos Ruiz", course: "Bases de Datos", schedule: "Viernes 14:00 - 17:00" }
];

const container = document.getElementById("professorsContainer");

function renderProfessors() {
    container.innerHTML = "";

    professors.forEach(prof => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${prof.name}</h5>
                    <p class="card-text small"><strong>Curso:</strong> ${prof.course}</p>
                    <p class="card-text small"><strong>Horario:</strong> ${prof.schedule}</p>

                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-primary w-50 me-2" onclick="openEdit(${prof.id})">Editar</button>
                        <button class="btn btn-danger w-50" onclick="openDelete(${prof.id})">Borrar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

renderProfessors();



document.getElementById("btnAddProfessor").addEventListener("click", () => {
    const name = document.getElementById("addName").value;
    const course = document.getElementById("addCourse").value;
    const schedule = document.getElementById("addSchedule").value;

    if (!name || !course || !schedule) return;

    professors.push({
        id: Date.now(),
        name,
        course,
        schedule
    });

    renderProfessors();

    document.getElementById("formAddProfessor").reset();

    bootstrap.Modal.getInstance(document.getElementById("modalAddProfessor")).hide();
});



function openEdit(id) {
    const p = professors.find(x => x.id === id);

    document.getElementById("editId").value = p.id;
    document.getElementById("editName").value = p.name;
    document.getElementById("editCourse").value = p.course;
    document.getElementById("editSchedule").value = p.schedule;

    new bootstrap.Modal(document.getElementById("modalEditProfessor")).show();
}

document.getElementById("btnEditProfessor").addEventListener("click", () => {
    const id = Number(document.getElementById("editId").value);

    const index = professors.findIndex(x => x.id === id);

    professors[index].name = document.getElementById("editName").value;
    professors[index].course = document.getElementById("editCourse").value;
    professors[index].schedule = document.getElementById("editSchedule").value;

    renderProfessors();

    bootstrap.Modal.getInstance(document.getElementById("modalEditProfessor")).hide();
});



let idToDelete = null;

function openDelete(id) {
    idToDelete = id;
    const prof = professors.find(p => p.id === id);
    document.getElementById("deleteName").textContent = prof.name;

    new bootstrap.Modal(document.getElementById("modalDeleteProfessor")).show();
}

document.getElementById("btnDeleteProfessor").addEventListener("click", () => {
    professors = professors.filter(p => p.id !== idToDelete);

    renderProfessors();

    bootstrap.Modal.getInstance(document.getElementById("modalDeleteProfessor")).hide();
});
