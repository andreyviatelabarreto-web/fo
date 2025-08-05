<?php
// Demo data - simulating database content
$demo_users = [
    ['id' => 1, 'first_name' => 'Juan', 'last_name' => 'Pérez', 'email' => 'juan.perez@email.com', 'role' => 'CUSTOMER', 'is_active' => 1, 'created_at' => '2024-07-15 10:30:00'],
    ['id' => 2, 'first_name' => 'María', 'last_name' => 'García', 'email' => 'maria.garcia@email.com', 'role' => 'INSTRUCTOR', 'is_active' => 1, 'created_at' => '2024-07-20 14:15:00'],
    ['id' => 3, 'first_name' => 'Carlos', 'last_name' => 'López', 'email' => 'carlos.lopez@email.com', 'role' => 'CUSTOMER', 'is_active' => 1, 'created_at' => '2024-07-25 09:45:00'],
    ['id' => 4, 'first_name' => 'Ana', 'last_name' => 'Martínez', 'email' => 'ana.martinez@email.com', 'role' => 'ADMIN', 'is_active' => 1, 'created_at' => '2024-07-30 16:20:00']
];

$demo_certifications = [
    ['id' => 1, 'title' => 'Certificación en Desarrollo Web Full Stack', 'category_name' => 'Tecnología', 'price' => 299.00, 'duration_hours' => 40, 'difficulty_level' => 'INTERMEDIATE', 'is_active' => 1, 'featured' => 1, 'created_at' => '2024-06-01 10:00:00'],
    ['id' => 2, 'title' => 'Gestión de Proyectos PMP', 'category_name' => 'Negocios', 'price' => 450.00, 'duration_hours' => 60, 'difficulty_level' => 'ADVANCED', 'is_active' => 1, 'featured' => 1, 'created_at' => '2024-06-05 11:00:00'],
    ['id' => 3, 'title' => 'Inglés de Negocios Avanzado', 'category_name' => 'Idiomas', 'price' => 199.00, 'duration_hours' => 30, 'difficulty_level' => 'INTERMEDIATE', 'is_active' => 1, 'featured' => 0, 'created_at' => '2024-06-10 12:00:00'],
    ['id' => 4, 'title' => 'Certificación en Ciberseguridad', 'category_name' => 'Tecnología', 'price' => 399.00, 'duration_hours' => 50, 'difficulty_level' => 'ADVANCED', 'is_active' => 1, 'featured' => 0, 'created_at' => '2024-06-15 13:00:00']
];

$total_users = count($demo_users);
$total_certifications = count($demo_certifications);
$recent_users = array_slice($demo_users, 0, 5);
$recent_certifications = array_slice($demo_certifications, 0, 5);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Certificaciones Internacionales (DEMO)</title>
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
        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 1rem 1rem 0 0 !important;
        }
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .table th {
            border-top: none;
            font-weight: 600;
            color: #495057;
        }
        .demo-banner {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 0.5rem;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body class="bg-light">
    <div class="demo-banner">
        <i class="fas fa-info-circle me-2"></i>
        MODO DEMO - Panel de Administración sin conexión a base de datos
    </div>
    
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
                        <small class="text-white-50">Modo Demo</small>
                    </div>
                    
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#dashboard">
                                <i class="fas fa-tachometer-alt me-2"></i>
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#users">
                                <i class="fas fa-users me-2"></i>
                                Usuarios
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#certifications">
                                <i class="fas fa-certificate me-2"></i>
                                Certificaciones
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#orders">
                                <i class="fas fa-shopping-cart me-2"></i>
                                Pedidos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#appointments">
                                <i class="fas fa-calendar me-2"></i>
                                Citas
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#reports">
                                <i class="fas fa-chart-bar me-2"></i>
                                Reportes
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                <i class="fas fa-download me-1"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Statistics Cards -->
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase mb-1">
                                            Total Usuarios
                                        </div>
                                        <div class="h5 mb-0 font-weight-bold">
                                            <?php echo number_format($total_users); ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-users fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase mb-1">
                                            Certificaciones
                                        </div>
                                        <div class="h5 mb-0 font-weight-bold">
                                            <?php echo number_format($total_certifications); ?>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-certificate fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase mb-1">
                                            Ventas del Mes
                                        </div>
                                        <div class="h5 mb-0 font-weight-bold">
                                            $12,450
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase mb-1">
                                            Citas Pendientes
                                        </div>
                                        <div class="h5 mb-0 font-weight-bold">
                                            24
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="m-0 font-weight-bold">
                                    <i class="fas fa-users me-2"></i>
                                    Usuarios Recientes
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Rol</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach($recent_users as $user_item): ?>
                                            <tr>
                                                <td><?php echo htmlspecialchars($user_item['first_name'] . ' ' . $user_item['last_name']); ?></td>
                                                <td><?php echo htmlspecialchars($user_item['email']); ?></td>
                                                <td>
                                                    <span class="badge bg-<?php echo $user_item['role'] == 'ADMIN' ? 'danger' : ($user_item['role'] == 'INSTRUCTOR' ? 'warning' : 'primary'); ?>">
                                                        <?php echo htmlspecialchars($user_item['role']); ?>
                                                    </span>
                                                </td>
                                                <td><?php echo date('d/m/Y', strtotime($user_item['created_at'])); ?></td>
                                            </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary btn-sm">Ver Todos los Usuarios</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="m-0 font-weight-bold">
                                    <i class="fas fa-certificate me-2"></i>
                                    Certificaciones Recientes
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Categoría</th>
                                                <th>Precio</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach($recent_certifications as $cert): ?>
                                            <tr>
                                                <td><?php echo htmlspecialchars(substr($cert['title'], 0, 30)) . '...'; ?></td>
                                                <td><?php echo htmlspecialchars($cert['category_name']); ?></td>
                                                <td>$<?php echo number_format($cert['price'], 2); ?></td>
                                                <td>
                                                    <span class="badge bg-<?php echo $cert['is_active'] ? 'success' : 'secondary'; ?>">
                                                        <?php echo $cert['is_active'] ? 'Activa' : 'Inactiva'; ?>
                                                    </span>
                                                </td>
                                            </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary btn-sm">Ver Todas las Certificaciones</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Demo Information -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card border-info">
                            <div class="card-header bg-info text-white">
                                <h6 class="m-0">
                                    <i class="fas fa-info-circle me-2"></i>
                                    Información del Demo
                                </h6>
                            </div>
                            <div class="card-body">
                                <h6>Panel de Administración PHP - Funcionalidades Implementadas:</h6>
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-check text-success me-2"></i>Dashboard con estadísticas</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Gestión de usuarios</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Gestión de certificaciones</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Modelos PHP con PDO</li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-check text-success me-2"></i>Interfaz responsive con Bootstrap</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Arquitectura MVC</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Configuración de base de datos</li>
                                            <li><i class="fas fa-check text-success me-2"></i>Scripts SQL de inicialización</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="alert alert-warning mt-3">
                                    <strong>Nota:</strong> Para usar con base de datos real, configure MySQL y ejecute el script <code>database_init.sql</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

