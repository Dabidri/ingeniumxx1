document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Revelar al Hacer Scroll (Opcional, mantenida por ahora) ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) { // Ejecutar solo si hay elementos reveal en la página
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };
        revealOnScroll(); // Verificar al cargar
        window.addEventListener('scroll', revealOnScroll);
    }


    // --- Lógica para el Modal Genérico ---

    const modal = document.getElementById("detailModal");
    // Solo continuar si el modal existe en esta página específica
    if (modal) {
        const modalImg = document.getElementById("modal-detail-img");
        const modalIconEl = document.getElementById("modal-detail-icon");
        const modalTitle = document.getElementById("modal-detail-title");
        const modalText = document.getElementById("modal-detail-text");
        const closeModalBtn = modal.querySelector(".close-btn"); // Buscar dentro del modal
        const biographies = {
            musk: {
                name: "Elon Musk",
                img: "imagenes/placeholder_musk.jpg",
                bio: "Fundador de empresas como Tesla, SpaceX, Neuralink y The Boring Company, Musk ha revolucionado sectores como la movilidad eléctrica, la exploración espacial privada y las interfaces cerebro-computadora. Con Tesla, impulsó el auge global de los autos eléctricos. SpaceX ha reducido costos de lanzamiento y está liderando la carrera hacia Marte." // (Tu biografía completa)
            },
            jobs: {
                name: "Steve Jobs",
                img: "imagenes/placeholder_jobs.jpg",
                bio: "Cofundador de Apple, fue pieza clave en la creación del iPhone, que cambió radicalmente la forma en que interactuamos con la tecnología. Su visión integró hardware, software y diseño de forma única, estableciendo nuevos estándares en dispositivos móviles, interfaces intuitivas y ecosistemas digitales."// (Tu biografía completa)
},
            zuckerberg: { name: "Mark Zuckerberg", img: "imagenes/placeholder_zuckerberg.jpg", bio: "Creador de Facebook (hoy Meta), revolucionó la forma en que las personas se conectan e interactúan en línea. Su trabajo fue clave en el auge de las redes sociales. Actualmente lidera la apuesta   por nuevas formas de interacción digital inmersiva." },
            bezos: { name: "Jeff Bezos", img: "imagenes/placeholder_bezos.jpg", bio: "Fundador de Amazon, transformó el comercio electrónico global con una infraestructura digital sin precedentes. Además, impulsó el desarrollo de la computación en la nube con Amazon Web Services (AWS), que hoy sustenta gran parte del internet moderno. También es fundador de Blue Origin, empresa de exploración espacial."
 },
            altman: { name: "Sam Altman", img: "imagenes/placeholder_altman.jpg", bio: "CEO de OpenAI, ha sido un actor central en la popularización y expansión de la inteligencia artificial generativa, especialmente con el lanzamiento de ChatGPT. Su enfoque ha sido democratizar el acceso a herramientas avanzadas de IA, impulsando debates éticos y tecnológicos sobre el futuro de esta tecnología." },
            pagebrin: { name: "Larry Page & Sergey Brin", img: "imagenes/placeholder_google.jpg", bio: "Fundadores de Google, crearon el motor de búsqueda más importante del mundo. Bajo su liderazgo, Google no solo revolucionó la forma de acceder a la información, sino que también diversificó su impacto con productos como Android, Google Maps, YouTube y su enfoque en inteligencia artificial con DeepMind" }
            // ...
        };


        // Función para ABRIR el modal (más genérica)
        const openDetailModal = (itemId) => {
            const bioData = biographies[itemId];
            const advanceData = advancesInfo[itemId];

            if (bioData) { // Es una Biografía
                modalImg.src = bioData.img;
                modalImg.style.display = 'inline-block'; // Mostrar imagen
                modalIconEl.style.display = 'none';       // Ocultar icono
                modalTitle.textContent = bioData.name;
                modalText.textContent = bioData.bio; // Usar bio aquí
                modal.classList.add('show'); // Mostrar modal con animación
            } else if (advanceData) { // Es un Avance Tecnológico
                modalIconEl.className = advanceData.iconClass; // Establecer clase del icono
                modalIconEl.style.display = 'inline-block';// Mostrar icono
                modalImg.style.display = 'none';          // Ocultar imagen
                modalTitle.textContent = advanceData.name;
                // Usar innerHTML permite usar <strong>, etc. en la descripción
                modalText.innerHTML = advanceData.description;
                modal.classList.add('show'); // Mostrar modal con animación
            } else {
                console.error("Información no encontrada para el ID:", itemId);
            }
        };

        // Función para CERRAR el modal
        const closeModal = () => {
             modal.classList.remove('show'); // Ocultar modal con animación inversa (si se define)
             // Opcional: Resetear contenido para evitar parpadeo la próxima vez
              setTimeout(() => { // Esperar a que termine la transición de opacidad
                   if (modal.style.opacity == 0 || !modal.classList.contains('show')) { // Doble check
                       modalTitle.textContent = "";
                       modalText.textContent = "";
                       modalImg.src = "";
                       modalIconEl.className = "";
                       modalImg.style.display = 'none';
                       modalIconEl.style.display = 'none';
                   }
               }, 300); // Duración de la transición de opacidad en ms
        };

        // Añadir Event Listeners a las TARJETAS CLICKABLES (Avances y Figuras)
        const clickableItems = document.querySelectorAll(".clickable-advance, .clickable-figure");
        clickableItems.forEach(card => {
            card.addEventListener('click', (e) => {
                 // Prevenir comportamiento por defecto si la tarjeta fuera un enlace en el futuro
                 // e.preventDefault();
                const itemId = card.getAttribute('data-modal-id');
                if (itemId) {
                    openDetailModal(itemId);
                } else {
                     console.error("El elemento clickeado no tiene data-modal-id:", card);
                }
            });
        });

        // Añadir Event Listener al botón de CERRAR (X)
        closeModalBtn.addEventListener('click', closeModal);

        // Añadir Event Listener para CERRAR si se hace clic FUERA del contenido
        modal.addEventListener('click', (event) => {
            // Si el clic fue directamente sobre el fondo del modal (y no su contenido)
            if (event.target == modal) {
                closeModal();
            }
        });

        // Opcional: Cerrar modal con la tecla ESCAPE
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

    } // Fin del if (modal)

}); // Fin del DOMContentLoaded