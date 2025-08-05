// Modelo para gestionar las citas
class AppointmentModel {
  constructor() {
    this.appointments = [];
    this.availableSlots = [];
    this.instructors = [];
    this.certifications = [];
  }

  // Obtener todas las citas del usuario
  async getUserAppointments(userId) {
    try {
      const response = await fetch(`http://localhost:3000/api/appointments?userId=${userId}`);
      if (response.ok) {
        this.appointments = await response.json();
        return this.appointments;
      }
      
      // Datos de ejemplo para el demo
      return this.getMockAppointments();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return this.getMockAppointments();
    }
  }

  // Obtener horarios disponibles
  async getAvailableSlots(date, instructorId) {
    try {
      const response = await fetch(`http://localhost:3000/api/appointments/available?date=${date}&instructorId=${instructorId}`);
      if (response.ok) {
        this.availableSlots = await response.json();
        return this.availableSlots;
      }
      
      return this.getMockAvailableSlots();
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return this.getMockAvailableSlots();
    }
  }

  // Crear nueva cita
  async createAppointment(appointmentData) {
    try {
      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });
      
      if (response.ok) {
        const newAppointment = await response.json();
        this.appointments.push(newAppointment);
        return { success: true, appointment: newAppointment };
      }
      
      return { success: false, error: 'Error creating appointment' };
    } catch (error) {
      console.error('Error creating appointment:', error);
      return { success: false, error: error.message };
    }
  }

  // Cancelar cita
  async cancelAppointment(appointmentId) {
    try {
      const response = await fetch(`http://localhost:3000/api/appointments/${appointmentId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        this.appointments = this.appointments.filter(apt => apt.id !== appointmentId);
        return { success: true };
      }
      
      return { success: false, error: 'Error cancelling appointment' };
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener instructores disponibles
  async getInstructors() {
    try {
      const response = await fetch('http://localhost:3000/api/instructors');
      if (response.ok) {
        this.instructors = await response.json();
        return this.instructors;
      }
      
      return this.getMockInstructors();
    } catch (error) {
      console.error('Error fetching instructors:', error);
      return this.getMockInstructors();
    }
  }

  // Obtener certificaciones
  async getCertifications() {
    try {
      const response = await fetch('http://localhost:3000/api/certifications');
      if (response.ok) {
        this.certifications = await response.json();
        return this.certifications;
      }
      
      return this.getMockCertifications();
    } catch (error) {
      console.error('Error fetching certifications:', error);
      return this.getMockCertifications();
    }
  }

  // Datos de ejemplo para el demo
  getMockAppointments() {
    return [
      {
        id: 1,
        title: "Consulta sobre Desarrollo Web",
        instructor: "Dr. Juan Pérez",
        date: "2024-08-05",
        time: "10:00",
        duration: 60,
        type: "consultation",
        status: "confirmed",
        meetingUrl: "https://meet.google.com/abc-def-ghi"
      },
      {
        id: 2,
        title: "Examen Final - Marketing Digital",
        instructor: "Dra. María García",
        date: "2024-08-07",
        time: "14:00",
        duration: 90,
        type: "exam",
        status: "scheduled",
        meetingUrl: null
      }
    ];
  }

  getMockAvailableSlots() {
    return [
      { time: "09:00", available: true },
      { time: "10:00", available: false },
      { time: "11:00", available: true },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: false }
    ];
  }

  getMockInstructors() {
    return [
      {
        id: 1,
        name: "Dr. Juan Pérez",
        specialization: "Desarrollo Web",
        rating: 4.8,
        avatar: "/api/placeholder/50/50"
      },
      {
        id: 2,
        name: "Dra. María García",
        specialization: "Marketing Digital",
        rating: 4.9,
        avatar: "/api/placeholder/50/50"
      },
      {
        id: 3,
        name: "Prof. Carlos López",
        specialization: "Gestión de Proyectos",
        rating: 4.7,
        avatar: "/api/placeholder/50/50"
      }
    ];
  }

  getMockCertifications() {
    return [
      {
        id: 1,
        title: "Desarrollo Web Full Stack",
        category: "Tecnología"
      },
      {
        id: 2,
        title: "Marketing Digital",
        category: "Negocios"
      },
      {
        id: 3,
        title: "Gestión de Proyectos PMP",
        category: "Negocios"
      }
    ];
  }
}

export default AppointmentModel;