import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Video, Plus } from 'lucide-react'

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming')

  // Mock data
  const appointments = {
    upcoming: [
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
    ],
    past: [
      {
        id: 3,
        title: "Orientación Académica",
        instructor: "Prof. Carlos López",
        date: "2024-07-28",
        time: "16:00",
        duration: 45,
        type: "orientation",
        status: "completed",
        meetingUrl: null
      }
    ]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'scheduled': return 'bg-blue-500'
      case 'completed': return 'bg-gray-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada'
      case 'scheduled': return 'Programada'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return 'Desconocido'
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'consultation': return 'Consulta'
      case 'exam': return 'Examen'
      case 'tutoring': return 'Tutoría'
      case 'orientation': return 'Orientación'
      default: return 'Cita'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mis Citas
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus citas con instructores y exámenes
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agendar Nueva Cita
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('upcoming')}
          >
            Próximas ({appointments.upcoming.length})
          </Button>
          <Button
            variant={activeTab === 'past' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('past')}
          >
            Pasadas ({appointments.past.length})
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments[activeTab].map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">
                        {appointment.title}
                      </h3>
                      <Badge variant="outline">
                        {getTypeText(appointment.type)}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(appointment.status)}`}></div>
                        <span className="text-sm text-muted-foreground">
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(appointment.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time} ({appointment.duration} min)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {appointment.meetingUrl && activeTab === 'upcoming' && (
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Unirse
                      </Button>
                    )}
                    {activeTab === 'upcoming' && (
                      <>
                        <Button variant="outline" size="sm">
                          Reprogramar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {appointments[activeTab].length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No tienes citas {activeTab === 'upcoming' ? 'próximas' : 'pasadas'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'upcoming' 
                  ? 'Agenda una cita con nuestros instructores para recibir orientación personalizada'
                  : 'Aquí aparecerán tus citas completadas'
                }
              </p>
              {activeTab === 'upcoming' && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Primera Cita
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consulta Gratuita</CardTitle>
              <CardDescription>
                Habla con un asesor sobre tu carrera profesional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Examen de Certificación</CardTitle>
              <CardDescription>
                Programa tu examen cuando te sientas preparado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Ver Exámenes Disponibles
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tutoría Personalizada</CardTitle>
              <CardDescription>
                Recibe ayuda individual con temas específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Buscar Tutores
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Appointments

