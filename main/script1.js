// ==============================
// Manejo del menú lateral y carga de secciones
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.navitem');
    const container = document.getElementById('main-content');

    if (!container) {
        console.error("❌ Contenedor #main-content no encontrado");
        return;
    }

    // Función para cargar sección
    const loadSection = (sectionName) => {
        // Fade out
        container.classList.remove('show');
        container.classList.add('fade');

        // Ruta relativa desde main/main.html
        fetch(`../sections/sections-${sectionName}.html`)
            .then(res => {
                if (!res.ok) throw new Error(`No se pudo cargar ${sectionName}`);
                return res.text();
            })
            .then(html => {
                container.innerHTML = html;

                // Fade in
                setTimeout(() => container.classList.add('show'), 50);

                // Inicializar sección específica
                switch (sectionName) {
                    case 'pagos': initPagos(); break;
                    case 'buscar': initBuscar(); break;
                    case 'reportes': initReportes(); break;
                    case 'config': initConfig(); break;
                }
            })
            .catch(err => {
                console.error(err);
                container.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
            });
    };

    // Asignar eventos a los ítems del menú
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            if (!section) return;

            // Cargar sección
            loadSection(section);

            // Actualizar clase activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Cargar sección inicial al abrir la página
    const initialSection = 'pagos';
    loadSection(initialSection);

    // Resaltar ítem inicial
    const firstItem = document.querySelector(`.navitem[data-section="${initialSection}"]`);
    if (firstItem) firstItem.classList.add('active');
});

// ==============================
// Funciones de inicialización de cada sección
// ==============================
function initPagos() {
    console.log("✅ Sección Pagos cargada");
    // Código JS específico de Pagos
      // Botón para avanzar a etapa 2
// --- BOTÓN SIGUIENTE ETAPA 1 → 2 ---
  const nextBtn1 = document.createElement("button");
  nextBtn1.textContent = " Siguiente Etapa →";
  nextBtn1.classList.add("btn", "success");
  document.querySelector("#step-1").appendChild(nextBtn1);

  nextBtn1.addEventListener("click", () => {
    const seleccionados = [...document.querySelectorAll(".permisos-lista input:checked")];
    const contenedor = document.getElementById("tabla-pagos");
    contenedor.innerHTML = ""; // limpiar

    if (seleccionados.length === 0) {
      contenedor.innerHTML = "<p class='alert'>⚠️ No seleccionaste ningún permiso en la Etapa 1</p>";
      return;
    }

    seleccionados.forEach(chk => {
      const clave = chk.value;
      const nombre = chk.nextElementSibling.textContent;

      contenedor.innerHTML += `
        <div class="pago-item card small">
          <h3><i class="fa-solid fa-file-invoice-dollar"></i> ${nombre}</h3>
          <div class="grid-2 gap">
            <div class="field"><label>Orden:</label><input type="text" name="orden_${clave}"/></div>
            <div class="field"><label>Importe:</label><input type="number" name="importe_${clave}" step="0.01"/></div>
            <div class="field"><label>Fecha:</label><input type="date" name="fecha_${clave}"/></div>
            <div class="field"><label>Recibo:</label><input type="text" name="recibo_${clave}"/></div>
            <div class="field"><label>Pagado:</label><input type="number" name="pagado_${clave}" step="0.01"/></div>
          </div>
        </div>
      `;
    });

    // Activar etapa 2 y desactivar etapa 1
    document.getElementById("step-1").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
  });

  // --- BOTÓN REGRESAR ETAPA 2 → 1 ---
  const backBtn2 = document.createElement("button");
  backBtn2.textContent = "← Regresar a Etapa 1";
  backBtn2.classList.add("btn", "secondary");
  document.querySelector("#step-2 .actions").prepend(backBtn2);

  backBtn2.addEventListener("click", () => {
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-1").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- BOTÓN SIGUIENTE ETAPA 2 → 3 ---
  const nextBtn2 = document.createElement("button");
  nextBtn2.textContent = " Siguiente Etapa →";
  nextBtn2.classList.add("btn", "success");
  document.querySelector("#step-2 .actions").appendChild(nextBtn2);

  nextBtn2.addEventListener("click", () => {
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-3").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- BOTÓN REGRESAR ETAPA 3 → 2 ---
  const backBtn3 = document.getElementById("btnRegresarEtapa2");
  backBtn3.addEventListener("click", () => {
    document.getElementById("step-3").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Mostrar campos adicionales en Etapa 3 si estatus = "Entregado" ---
  const selectEstatus = document.getElementById("estatusEntrega");
  const camposEntregado = document.getElementById("camposEntregado");

  selectEstatus.addEventListener("change", () => {
    camposEntregado.style.display = selectEstatus.value === "entregado" ? "block" : "none";
  });
}

function initBuscar() {
    console.log("✅ Sección Buscar cargada");
    // Código JS específico de Buscar
}

function initReportes() {
    console.log("✅ Sección Reportes cargada");
    // Código JS específico de Reportes
}

function initConfig() {
    console.log("✅ Sección Configuración cargada");
    // Código JS específico de Config
}
