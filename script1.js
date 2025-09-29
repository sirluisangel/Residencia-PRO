// Función para cargar un HTML de sección
function loadSection(sectionName) {
    fetch(`sections/${sectionName}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`No se pudo cargar ${sectionName}`);
            return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Inicializar funciones de cada sección si existen
            switch (sectionName) {
                case 'section-pagos': initPagos(); break;
                case 'section-buscar': initBuscar(); break;
                case 'section-reportes': initReportes(); break;
                case 'section-config': initConfig(); break;
            }
        })
        .catch(err => console.error(err));
}

// Cargar la sección inicial (Pagos)
loadSection('section-pagos');

// Manejo de clic en menú lateral
document.querySelectorAll('.navitem').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        loadSection(section);

        // Resaltar menú activo
        document.querySelectorAll('.navitem').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Funciones de inicialización de cada sección (opcional)
function initPagos() {
    console.log("Sección Pagos cargada");
    // Aquí puedes inicializar botones, cálculos, etc.
}

function initBuscar() {
    console.log("Sección Buscar cargada");
}

function initReportes() {
    console.log("Sección Reportes cargada");
}

function initConfig() {
    console.log("Sección Configuración cargada");
}
