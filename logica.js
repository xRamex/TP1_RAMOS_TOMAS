// Referencias
const inputFile = document.getElementById("inputFile");
const preview = document.getElementById("preview");
const mensaje = document.getElementById("mensaje");

// Función reutilizable para mostrar una imagen
function mostrarImagen(file) {
  if (!file || !file.type.startsWith("image/")) {
    mensaje.textContent = "El archivo no es una imagen válida.";
    preview.innerHTML = "<span>Aquí se verá la imagen arrastrada</span>";
    return;
  }

  const lector = new FileReader();
  lector.onload = (e) => {
    preview.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
    mensaje.textContent = "";
  };
  lector.readAsDataURL(file);
}

// Input tradicional
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  mostrarImagen(file);
});

// --- Drag & Drop ---
["dragenter", "dragover", "dragleave", "drop"].forEach((evtName) => {
  preview.addEventListener(evtName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

// Estilo visual al arrastrar
preview.addEventListener("dragover", () => preview.classList.add("dragover"));
preview.addEventListener("dragenter", () => preview.classList.add("dragover"));
preview.addEventListener("dragleave", () =>
  preview.classList.remove("dragover")
);
preview.addEventListener("drop", (e) => {
  preview.classList.remove("dragover");
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  mostrarImagen(file);
});
