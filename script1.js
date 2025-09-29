// ==============================
// Cargar sección desde HTML externo
// ==============================
function loadSection(sectionName) {
    // Ajuste para coincidir con tus archivos: sections/sections-pagos.html
    fetch(`sections/sections-${sectionName}.html`)
        .then(res => {
            if (!res.ok) throw new Error(`No se pudo cargar ${sectionName}`);
            return res.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Inicializar funciones específicas por sección
            switch (sectionName) {
                case 'pagos': initPagos(); break;
                case 'buscar': initBuscar(); break;
                case 'reportes': initReportes(); break;
                case 'config': initConfig(); break;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('main-content').innerHTML =
                `<p style="color:red;">Error: ${err.message}</p>`;
        });
}

// ==============================
// Manejo del menú lateral
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.navitem');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section'); // ej: "pagos"
            loadSection(section);

            // Resaltar ítem activo
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Cargar sección inicial al abrir la página
    loadSection('pagos');
});

// ==============================
// Funciones de inicialización
// ==============================
function initPagos() {
    console.log("✅ Sección Pagos cargada");
    // Aquí va el código JS específico de la sección pagos
}

function initBuscar() {
    console.log("✅ Sección Buscar cargada");
    // Aquí va el código JS específico de la sección buscar
}

function initReportes() {
    console.log("✅ Sección Reportes cargada");
    // Aquí va el código JS específico de la sección reportes
}

function initConfig() {
    console.log("✅ Sección Configuración cargada");
    // Aquí va el código JS específico de la sección configuración
}
