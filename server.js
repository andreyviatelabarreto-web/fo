import express from 'express';
import AppointmentController from './AppointmentController.js';

const app = express();
const port = 3000;

app.use(express.json());

const appointmentController = new AppointmentController();

// Ruta de ejemplo para obtener las citas del usuario
app.get('/api/appointments', async (req, res) => {
  const result = await appointmentController.getUserAppointments();
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});