// ==============================
// Cargar sección desde HTML externo con fade
// ==============================
function loadSection(sectionName) {
    const container = document.getElementById('main-content');

    // Aplicar fade out
    container.classList.remove('show');
    container.classList.add('fade');

    // Cargar el archivo de la sección
    fetch(`sections/sections-${sectionName}.html`)
        .then(res => {
            if (!res.ok) throw new Error(`No se pudo cargar ${sectionName}`);
            return res.text();
        })
        .then(html => {
            // Reemplazar contenido
            container.innerHTML = html;

            // Activar fade in después de un pequeño delay
            setTimeout(() => {
                container.classList.add('show');
            }, 50);

            // Inicializar funciones específicas de cada sección
            switch (sectionName) {
                case 'pagos': initPagos(); break;
                case 'buscar': initBuscar(); break;
                case 'reportes': initReportes(); break;
                case 'config': initConfig(); break;
            }
        })
        .catch(err => {
            console.error(err);
            container.innerHTML =
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

    // Cargar sección inicial
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