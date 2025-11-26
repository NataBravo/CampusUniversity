
let courses = [
    {
        code: "ING101",
        name: "Fundamentos de Programación",
        program: "Ingeniería",
        credits: 3,
        teacher: "Juan Pérez"
    },
    {
        code: "CIE202",
        name: "Biología General",
        program: "Ciencias",
        credits: 2,
        teacher: "Ana Gómez"
    },
    {
        code: "HUM150",
        name: "Historia Universal",
        program: "Humanidades",
        credits: 4,
        teacher: "Carlos Ruiz"
    },
    {
        code: "ING305",
        name: "Estructuras de Datos",
        program: "Ingeniería",
        credits: 3,
        teacher: "Juan Pérez"
    },
    {
        code: "CIE330",
        name: "Química Orgánica",
        program: "Ciencias",
        credits: 4,
        teacher: "Ana Gómez"
    }
];

const coursesContainer = document.getElementById("coursesContainer");
const searchInput = document.getElementById("searchInput");
const filterProgram = document.getElementById("filterProgram");
const filterCredits = document.getElementById("filterCredits");
const filterTeacher = document.getElementById("filterTeacher");



function renderCourses(list) {
    coursesContainer.innerHTML = "";

    if (list.length === 0) {
        coursesContainer.innerHTML = `
            <p class="text-muted text-center">No se encontraron cursos...</p>
        `;
        return;
    }

    list.forEach(course => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");

        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${course.name}</h5>
                    <p class="card-text small mb-1"><strong>Código:</strong> ${course.code}</p>
                    <p class="card-text small mb-1"><strong>Programa:</strong> ${course.program}</p>
                    <p class="card-text small mb-1"><strong>Créditos:</strong> ${course.credits}</p>
                    <p class="card-text small mb-3"><strong>Profesor:</strong> ${course.teacher}</p>

                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary w-50 me-2" onclick="editCourse('${course.code}')">Editar</button>
                        <button class="btn btn-danger w-50" onclick="deleteCourse('${course.code}')">Borrar</button>
                    </div>
                </div>
            </div>
        `;
        coursesContainer.appendChild(col);
    });
}

renderCourses(courses);



function filterAndSearch() {
    const query = searchInput.value.toLowerCase();
    const selectedProgram = filterProgram.value;
    const selectedCredits = filterCredits.value;
    const selectedTeacher = filterTeacher.value;

    const filtered = courses.filter(course => {
        const matchName = course.name.toLowerCase().includes(query);
        const matchCode = course.code.toLowerCase().includes(query);

        const matchProgram = selectedProgram === "" || course.program === selectedProgram;
        const matchCredits = selectedCredits === "" || course.credits == selectedCredits;
        const matchTeacher = selectedTeacher === "" || course.teacher === selectedTeacher;

        return (matchName || matchCode) && matchProgram && matchCredits && matchTeacher;
    });

    renderCourses(filtered);
}

searchInput.addEventListener("input", filterAndSearch);
filterProgram.addEventListener("change", filterAndSearch);
filterCredits.addEventListener("change", filterAndSearch);
filterTeacher.addEventListener("change", filterAndSearch);



const modalCourse = new bootstrap.Modal(document.getElementById("modalCourse"));
const modalTitle = document.getElementById("modalTitle");

const inputName = document.getElementById("courseName");
const inputCode = document.getElementById("courseCode");
const inputProgram = document.getElementById("courseProgram");
const inputCredits = document.getElementById("courseCredits");
const inputTeacher = document.getElementById("courseTeacher");

const btnSaveCourse = document.getElementById("btnSaveCourse");
let editingCode = null;


document.getElementById("btnAddNew").addEventListener("click", () => {
    editingCode = null;

    modalTitle.textContent = "Agregar Curso";
    inputName.value = "";
    inputCode.value = "";
    inputProgram.value = "";
    inputCredits.value = "";
    inputTeacher.value = "";

    modalCourse.show();
});



function editCourse(code) {
    const course = courses.find(c => c.code === code);
    if (!course) return;

    editingCode = code;

    modalTitle.textContent = "Editar Curso";
    inputName.value = course.name;
    inputCode.value = course.code;
    inputProgram.value = course.program;
    inputCredits.value = course.credits;
    inputTeacher.value = course.teacher;

    modalCourse.show();
}



btnSaveCourse.addEventListener("click", () => {
    const newCourse = {
        name: inputName.value.trim(),
        code: inputCode.value.trim(),
        program: inputProgram.value,
        credits: parseInt(inputCredits.value),
        teacher: inputTeacher.value
    };

    if (!newCourse.name || !newCourse.code || !newCourse.program || !newCourse.credits || !newCourse.teacher) {
        alert("Todos los campos son obligatorios.");
        return;
    }

   
    if (editingCode) {
        const index = courses.findIndex(c => c.code === editingCode);
        courses[index] = newCourse;
    } 
    
    else {
        courses.push(newCourse);
    }

    modalCourse.hide();
    filterAndSearch();
});

function deleteCourse(code) {
    if (!confirm("¿Deseas borrar este curso?")) return;

    courses = courses.filter(c => c.code !== code);
    filterAndSearch();
}


