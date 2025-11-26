
let students = [
    { id: "100165153", name: "Nathalia Andrea Bravo Castro", email: "natalia@email.com", program: "Ingeniería de Software" },
    { id: "100165154", name: "Laura Gómez", email: "laura@example.com", program: "Ingeniería de Sistemas" },
    { id: "100165155", name: "Andrés Molina", email: "andres@example.com", program: "Administración" },
    { id: "100165156", name: "Valentina Ríos", email: "valen@example.com", program: "Psicología" },
    
];

const tableBody = document.querySelector("tbody");
const searchInput = document.getElementById("searchInput");


const modalTitle = document.getElementById("modalTitle");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputProgram = document.getElementById("inputProgram");
const btnGuardar = document.getElementById("btnGuardar");


let editingId = null;


function renderTable(list) {
    tableBody.innerHTML = "";

    list.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.program}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editStudent('${student.id}')">
                    <i class="bi bi-pencil"></i>
                </button>

                <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

renderTable(students);


searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(query)
    );

    renderTable(filtered);
});


function deleteStudent(id) {
    if (confirm("¿Deseas eliminar este estudiante?")) {
        students = students.filter(s => s.id !== id);
        renderTable(students);
    }
}


document.getElementById("btnAddNew").addEventListener("click", () => {
    modalTitle.textContent = "Agregar Estudiante";
    editingId = null;

    inputName.value = "";
    inputEmail.value = "";
    inputProgram.value = "";

    btnGuardar.textContent = "Guardar";
});


function editStudent(id) {
    const student = students.find(s => s.id === id);
    editingId = id;

    modalTitle.textContent = "Editar Estudiante";

    inputName.value = student.name;
    inputEmail.value = student.email;
    inputProgram.value = student.program;

    btnGuardar.textContent = "Actualizar";

    const modal = new bootstrap.Modal(document.getElementById("modalAgregar"));
    modal.show();
}


btnGuardar.addEventListener("click", () => {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const program = inputProgram.value.trim();

    if (!name || !email || !program) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (editingId) {
      
        const student = students.find(s => s.id === editingId);
        student.name = name;
        student.email = email;
        student.program = program;

    } else {
       
        const newId = String(students.length + 1).padStart(3, "0");

        students.push({
            id: newId,
            name,
            email,
            program
        });
    }

    renderTable(students);


    const modal = bootstrap.Modal.getInstance(document.getElementById("modalAgregar"));
    modal.hide();
});

