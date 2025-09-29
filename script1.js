// Cargar sección desde HTML externo
function loadSection(sectionName) {
    fetch(`sections/${sectionName}.html`)
        .then(res => {
            if (!res.ok) throw new Error(`No se pudo cargar ${sectionName}`);
            return res.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Inicializar funciones específicas por sección
            switch(sectionName){
                case 'section-pagos': initPagos(); break;
                case 'section-buscar': initBuscar(); break;
                case 'section-reportes': initReportes(); break;
                case 'section-config': initConfig(); break;
            }
        })
        .catch(err => console.error(err));
}

// Cargar sección inicial
loadSection('section-pagos');

// Manejo del menú lateral
document.querySelectorAll('.navitem').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        loadSection(section);

        // Resaltar menú activo
        document.querySelectorAll('.navitem').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Funciones de inicialización de cada sección
function initPagos() {
    console.log("Sección Pagos cargada");
    // Aquí puedes llamar a tu código de botones y formularios
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
