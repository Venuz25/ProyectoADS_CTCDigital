# CTC Digital - Backend
## Sistema de Gestión Digital para el Centro de Transferencia Canina

Este repositorio contiene el código fuente, la base de datos y el backend de CTC Digital, una plataforma web que moderniza la gestión de adopciones, donaciones y reportes de rescate de mascotas en el Centro de Transferencia Canina (CTC) del Metro de la CDMX.

### Funcionalidades
- Gestión de solicitudes de adopción
- Programación de visitas domiciliarias
- Registro y control de donaciones
- Administración de voluntarios
- Reporte y seguimiento de avistamientos de perros en el metro

### Estructura
```
/ProyectoADS_CTCDigital/
│
├── index.html                # Página principal
│
├── recursos/                 # Archivos multimedia
│     ├── index/              # Imágenes correspondientes al index
│     └── sobreNosotros/     	# Imágenes correspondientes a sobreNosotros
│
├── mascotas/                 # Archivos multimedia de las mascotas
│
├── reportes/                 # Archivos multimedia de los reportes
│
├── solicitudes/              # Archivos de las solicitudes
│
├── src/
│   ├── adoptame.html         # Página de animales en adopción
│   ├── formsAdoptame.html    # Formulario para adoptar
│   ├── adoptados.html        # Página con mascotas ya adoptadas
│   ├── donaciones.html       # Información y formulario de donaciones
│   ├── reportes.html         # Reporte de avistamientos
│   ├── sobreNosotros.html    # Información sobre el CTC
│   │
│   ├── componentes/          # Componentes HTML dinamicos
│   │
│   ├── css/                  # Hojas de estilo
│   │   └── style.css									# Estilos generales
│   │
│   ├── js/                   # Scripts básicos de frontend
│   │   └── script.js									# Funciones de funcionalidad básicas
│   │
│   └── backend/              # Lógica del servidor en PHP
│       └── admin/												# Controladores y consultas para el admin
│
├── database/                 
│   └── ctc.sql               # Base de datos
│
└── README.md                 # Información general del proyecto
```
