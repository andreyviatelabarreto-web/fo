<?php
session_start();

// Include database and models
include_once 'config/database.php';
include_once 'models/Certification.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Initialize certification model
$certification = new Certification($db);

// Handle search
$search_keywords = isset($_GET['search']) ? $_GET['search'] : '';

// Get certifications
if(!empty($search_keywords)) {
    $stmt = $certification->search($search_keywords);
} else {
    $stmt = $certification->read();
}

$certifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Certificaciones - Panel de Administración</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .sidebar {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .sidebar .nav-link {
            color: rgba(255,255,255,0.8);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin: 0.25rem 0;
        }
        .sidebar .nav-link:hover,
        .sidebar .nav-link.active {
            color: white;
            background-color: rgba(255,255,255,0.1);
        }
        .card {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
        }
        .table th {
            border-top: none;
            font-weight: 600;
            color: #495057;
        }
        .certification-title {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
</head>
<body class="bg-light">
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
                <div class="position-sticky pt-3">
                    <div class="text-center mb-4">
                        <h4 class="text-white">
                            <i class="fas fa-graduation-cap me-2"></i>
                            Admin Panel
                        </h4>
                    </div>
                    
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php">
                                <i class="fas fa-tachometer-alt me-2"></i>
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="users.php">
                                <i class="fas fa-users me-2"></i>
                                Usuarios
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="certifications.php">
                                <i class="fas fa-certificate me-2"></i>
                                Certificaciones
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="orders.php">
                                <i class="fas fa-shopping-cart me-2"></i>
                                Pedidos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="appointments.php">
                                <i class="fas fa-calendar me-2"></i>
                                Citas
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="reports.php">
                                <i class="fas fa-chart-bar me-2"></i>
                                Reportes
                            </a>
                        </li>
                        <li class="nav-item mt-3">
                            <a class="nav-link" href="logout.php">
                                <i class="fas fa-sign-out-alt me-2"></i>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">
                        <i class="fas fa-certificate me-2"></i>
                        Gestión de Certificaciones
                    </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addCertificationModal">
                                <i class="fas fa-plus me-1"></i>
                                Nueva Certificación
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                <i class="fas fa-download me-1"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="row mb-3">
                    <div class="col-md-6">
                        <form method="GET" action="">
                            <div class="input-group">
                                <input type="text" class="form-control" name="search" 
                                       placeholder="Buscar certificaciones..." 
                                       value="<?php echo htmlspecialchars($search_keywords); ?>">
                                <button class="btn btn-outline-secondary" type="submit">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 text-end">
                        <?php if(!empty($search_keywords)): ?>
                            <a href="certifications.php" class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-times me-1"></i>
                                Limpiar búsqueda
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Certifications Table -->
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Duración</th>
                                        <th>Dificultad</th>
                                        <th>Estado</th>
                                        <th>Destacado</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if(count($certifications) > 0): ?>
                                        <?php foreach($certifications as $cert): ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($cert['id']); ?></td>
                                            <td>
                                                <div class="certification-title" title="<?php echo htmlspecialchars($cert['title']); ?>">
                                                    <strong><?php echo htmlspecialchars($cert['title']); ?></strong>
                                                </div>
                                                <small class="text-muted"><?php echo htmlspecialchars(substr($cert['description'], 0, 50)) . '...'; ?></small>
                                            </td>
                                            <td>
                                                <span class="badge bg-info">
                                                    <?php echo htmlspecialchars($cert['category_name'] ?? 'Sin categoría'); ?>
                                                </span>
                                            </td>
                                            <td>
                                                <strong>$<?php echo number_format($cert['price'], 2); ?></strong>
                                            </td>
                                            <td><?php echo htmlspecialchars($cert['duration_hours']); ?>h</td>
                                            <td>
                                                <span class="badge bg-<?php 
                                                    echo $cert['difficulty_level'] == 'BEGINNER' ? 'success' : 
                                                        ($cert['difficulty_level'] == 'INTERMEDIATE' ? 'warning' : 'danger'); 
                                                ?>">
                                                    <?php 
                                                        $difficulty_map = [
                                                            'BEGINNER' => 'Principiante',
                                                            'INTERMEDIATE' => 'Intermedio',
                                                            'ADVANCED' => 'Avanzado'
                                                        ];
                                                        echo $difficulty_map[$cert['difficulty_level']] ?? $cert['difficulty_level'];
                                                    ?>
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge bg-<?php echo $cert['is_active'] ? 'success' : 'secondary'; ?>">
                                                    <?php echo $cert['is_active'] ? 'Activa' : 'Inactiva'; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <?php if($cert['featured']): ?>
                                                    <i class="fas fa-star text-warning" title="Destacada"></i>
                                                <?php else: ?>
                                                    <i class="far fa-star text-muted" title="No destacada"></i>
                                                <?php endif; ?>
                                            </td>
                                            <td><?php echo date('d/m/Y', strtotime($cert['created_at'])); ?></td>
                                            <td>
                                                <div class="btn-group btn-group-sm" role="group">
                                                    <button type="button" class="btn btn-outline-primary" title="Ver">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-warning" title="Editar">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-outline-danger" title="Eliminar">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <tr>
                                            <td colspan="10" class="text-center py-4">
                                                <i class="fas fa-certificate fa-3x text-muted mb-3"></i>
                                                <p class="text-muted">No se encontraron certificaciones</p>
                                                <?php if(!empty($search_keywords)): ?>
                                                    <a href="certifications.php" class="btn btn-primary">Ver todas las certificaciones</a>
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Pagination would go here -->
                <nav aria-label="Page navigation" class="mt-4">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Anterior</a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">Siguiente</a>
                        </li>
                    </ul>
                </nav>
            </main>
        </div>
    </div>

    <!-- Add Certification Modal -->
    <div class="modal fade" id="addCertificationModal" tabindex="-1" aria-labelledby="addCertificationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCertificationModalLabel">
                        <i class="fas fa-certificate me-2"></i>
                        Agregar Nueva Certificación
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addCertificationForm">
                        <div class="row">
                            <div class="col-md-8 mb-3">
                                <label for="title" class="form-label">Título</label>
                                <input type="text" class="form-control" id="title" name="title" required>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="category" class="form-label">Categoría</label>
                                <select class="form-select" id="category" name="category" required>
                                    <option value="">Seleccionar categoría</option>
                                    <option value="1">Tecnología</option>
                                    <option value="2">Negocios</option>
                                    <option value="3">Idiomas</option>
                                    <option value="4">Salud</option>
                                    <option value="5">Educación</option>
                                    <option value="6">Diseño</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Descripción Corta</label>
                            <textarea class="form-control" id="description" name="description" rows="2" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="detailed_description" class="form-label">Descripción Detallada</label>
                            <textarea class="form-control" id="detailed_description" name="detailed_description" rows="4"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-3 mb-3">
                                <label for="price" class="form-label">Precio ($)</label>
                                <input type="number" class="form-control" id="price" name="price" step="0.01" required>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="duration" class="form-label">Duración (horas)</label>
                                <input type="number" class="form-control" id="duration" name="duration" required>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="difficulty" class="form-label">Dificultad</label>
                                <select class="form-select" id="difficulty" name="difficulty" required>
                                    <option value="">Seleccionar</option>
                                    <option value="BEGINNER">Principiante</option>
                                    <option value="INTERMEDIATE">Intermedio</option>
                                    <option value="ADVANCED">Avanzado</option>
                                </select>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="language" class="form-label">Idioma</label>
                                <select class="form-select" id="language" name="language">
                                    <option value="es">Español</option>
                                    <option value="en">Inglés</option>
                                    <option value="pt">Portugués</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="prerequisites" class="form-label">Prerrequisitos</label>
                                <textarea class="form-control" id="prerequisites" name="prerequisites" rows="3"></textarea>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="learning_objectives" class="form-label">Objetivos de Aprendizaje</label>
                                <textarea class="form-control" id="learning_objectives" name="learning_objectives" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="featured" name="featured">
                                    <label class="form-check-label" for="featured">
                                        Certificación destacada
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="is_active" name="is_active" checked>
                                    <label class="form-check-label" for="is_active">
                                        Certificación activa
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary">Guardar Certificación</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

