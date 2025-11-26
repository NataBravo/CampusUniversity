
let studentProfile = {
    name: "Nathalia Andrea Bravo Castro",
    email: "natalia@email.com",
    phone: "300 1234 5678",
    program: "Ingeniería de Software",
    semester: "5",
    id: "00012345"
};


let studentCourses = [
    {
        name: "Programación I",
        code: "ABC123",
        teacher: "Juan Pérez",
        schedule: "Lunes 10:00 - 12:00"
    },
    {
        name: "Álgebra Lineal",
        code: "MAT201",
        teacher: "Ana Gómez",
        schedule: "Martes 8:00 - 10:00"
    }
];


const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profilePhone = document.querySelector("#profilePhone");
const coursesContainer = document.querySelector("#studentCourses");


const inputName = document.querySelector("#modalName");
const inputEmail = document.querySelector("#modalEmail");
const inputPhone = document.querySelector("#modalPhone");


const btnSave = document.querySelector("#btnSaveProfile");


function renderProfile() {

    document.querySelector("#profileNameText").textContent = studentProfile.name;
    document.querySelector("#profileEmailText").textContent = studentProfile.email;
    document.querySelector("#profilePhoneText").textContent = studentProfile.phone;
}


function renderCourses() {
    coursesContainer.innerHTML = "";

    studentCourses.forEach((course, index) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${course.name}</h5>
                    <p class="card-text small mb-1"><strong>Código:</strong> ${course.code}</p>
                    <p class="card-text small mb-1"><strong>Profesor:</strong> ${course.teacher}</p>
                    <p class="card-text small mb-3"><strong>Horario:</strong> ${course.schedule}</p>

                    <button class="btn btn-outline-danger w-100"
                        onclick="removeCourse(${index})">
                        Cancelar inscripción
                    </button>
                </div>
            </div>
        `;

        coursesContainer.appendChild(col);
    });
}

function removeCourse(index) {
    const course = studentCourses[index];

    const confirmDelete = confirm(
        `¿Deseas cancelar la inscripción del curso "${course.name}"?`
    );

    if (!confirmDelete) return;

    studentCourses.splice(index, 1);
    renderCourses();
}


btnSave.addEventListener("click", () => {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const phone = inputPhone.value.trim();

    if (!name || !email || !phone) {
        alert("Todos los campos son obligatorios.");
        return;
    }

   
    studentProfile.name = name;
    studentProfile.email = email;
    studentProfile.phone = phone;

    renderProfile();

  
    const modal = bootstrap.Modal.getInstance(document.querySelector("#modalAgregar"));
    modal.hide();
});


renderProfile();
renderCourses();


