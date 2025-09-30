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
    document.addEventListener("DOMContentLoaded", () => {
  const stepBtns = document.querySelectorAll(".step-btn");
  const steps = document.querySelectorAll(".step");

  // Cambiar entre etapas
  stepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      stepBtns.forEach(b => b.classList.remove("active"));
      steps.forEach(s => s.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`step-${btn.dataset.step}`).classList.add("active");
    });
  });

  // Activar cantidad al seleccionar permiso
  document.querySelectorAll(".chk").forEach(chk => {
    chk.addEventListener("change", e => {
      const code = chk.dataset.code;
      const cantidad = document.querySelector(`.cantidad[data-for="${code}"]`);
      const precio = parseFloat(chk.dataset.cost);

      if(chk.checked){
        cantidad.disabled = false;
        cantidad.addEventListener("input", () => {
          const importe = document.querySelector(`.importe[data-imp-for="${code}"]`);
          importe.value = (cantidad.value * precio).toFixed(2);
        });
      } else {
        cantidad.disabled = true;
        cantidad.value = "";
        document.querySelector(`.importe[data-imp-for="${code}"]`).value = "0.00";
      }
    });
  });

  // Mostrar campos si estatus es "Entregado"
  document.getElementById("estatus").addEventListener("change", e => {
    document.getElementById("entregadoFields").classList.toggle("hidden", e.target.value !== "Entregado");
  });
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
