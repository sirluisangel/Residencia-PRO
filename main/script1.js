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
