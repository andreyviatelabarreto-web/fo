import AppointmentModel from './AppointmentModel.js';

// Controlador para gestionar la lógica de las citas
class AppointmentController {
  constructor() {
    this.model = new AppointmentModel();
    this.currentUser = { id: 1, name: 'Usuario Demo' }; // Usuario demo
  }

  // Obtener citas del usuario actual
  async getUserAppointments() {
    try {
      const appointments = await this.model.getUserAppointments(this.currentUser.id);
      return {
        success: true,
        data: appointments
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener las citas'
      };
    }
  }

  // Obtener horarios disponibles para una fecha e instructor
  async getAvailableSlots(date, instructorId) {
    try {
      if (!date) {
        return {
          success: false,
          error: 'La fecha es requerida'
        };
      }

      const slots = await this.model.getAvailableSlots(date, instructorId);
      return {
        success: true,
        data: slots
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener horarios disponibles'
      };
    }
  }

  // Crear nueva cita
  async createAppointment(appointmentData) {
    try {
      // Validar datos requeridos
      const requiredFields = ['title', 'instructorId', 'date', 'time', 'type'];
      const missingFields = requiredFields.filter(field => !appointmentData[field]);
      
      if (missingFields.length > 0) {
        return {
          success: false,
          error: `Campos requeridos faltantes: ${missingFields.join(', ')}`
        };
      }

      // Validar que la fecha no sea en el pasado
      const appointmentDate = new Date(appointmentData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (appointmentDate < today) {
        return {
          success: false,
          error: 'No se pueden agendar citas en fechas pasadas'
        };
      }

      // Agregar ID del usuario actual
      const completeAppointmentData = {
        ...appointmentData,
        userId: this.currentUser.id,
        status: 'scheduled'
      };

      const result = await this.model.createAppointment(completeAppointmentData);
      
      if (result.success) {
        return {
          success: true,
          message: 'Cita agendada exitosamente',
          data: result.appointment
        };
      } else {
        return {
          success: false,
          error: result.error || 'Error al crear la cita'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error interno al crear la cita'
      };
    }
  }

  // Cancelar cita
  async cancelAppointment(appointmentId) {
    try {
      if (!appointmentId) {
        return {
          success: false,
          error: 'ID de cita requerido'
        };
      }

      const result = await this.model.cancelAppointment(appointmentId);
      
      if (result.success) {
        return {
          success: true,
          message: 'Cita cancelada exitosamente'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Error al cancelar la cita'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error interno al cancelar la cita'
      };
    }
  }

  // Obtener instructores disponibles
  async getInstructors() {
    try {
      const instructors = await this.model.getInstructors();
      return {
        success: true,
        data: instructors
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener instructores'
      };
    }
  }

  // Obtener certificaciones
  async getCertifications() {
    try {
      const certifications = await this.model.getCertifications();
      return {
        success: true,
        data: certifications
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener certificaciones'
      };
    }
  }

  // Validar horario de cita
  validateAppointmentTime(date, time) {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    // No permitir citas en el pasado
    if (appointmentDateTime <= now) {
      return {
        valid: false,
        error: 'No se pueden agendar citas en horarios pasados'
      };
    }

    // No permitir citas fuera del horario laboral (9:00 - 17:00)
    const hour = appointmentDateTime.getHours();
    if (hour < 9 || hour >= 17) {
      return {
        valid: false,
        error: 'Las citas solo están disponibles de 9:00 AM a 5:00 PM'
      };
    }

    // No permitir citas en fines de semana
    const dayOfWeek = appointmentDateTime.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        valid: false,
        error: 'Las citas no están disponibles los fines de semana'
      };
    }

    return {
      valid: true
    };
  }

  // Formatear fecha para mostrar
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Formatear hora para mostrar
  formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  // Obtener estado de la cita en español
  getStatusText(status) {
    const statusMap = {
      'scheduled': 'Programada',
      'confirmed': 'Confirmada',
      'in_progress': 'En Progreso',
      'completed': 'Completada',
      'cancelled': 'Cancelada',
      'no_show': 'No Asistió'
    };
    
    return statusMap[status] || status;
  }

  // Obtener tipo de cita en español
  getTypeText(type) {
    const typeMap = {
      'consultation': 'Consulta',
      'tutoring': 'Tutoría',
      'exam': 'Examen',
      'orientation': 'Orientación'
    };
    
    return typeMap[type] || type;
  }
}

export default AppointmentController;