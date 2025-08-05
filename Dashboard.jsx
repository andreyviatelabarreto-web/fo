import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Award, Calendar, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido, {user?.firstName}
          </h1>
          <p className="text-muted-foreground">
            Aquí puedes ver tu progreso y gestionar tus certificaciones
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certificaciones Activas
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completadas
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próximas Citas
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Progreso Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                +12% desde el inicio
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certificaciones en Progreso</CardTitle>
              <CardDescription>
                Continúa con tus estudios actuales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Desarrollo Web Full Stack</h4>
                    <p className="text-sm text-muted-foreground">Tecnología</p>
                  </div>
                  <Badge variant="secondary">En progreso</Badge>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-muted-foreground">65% completado</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Digital</h4>
                    <p className="text-sm text-muted-foreground">Negocios</p>
                  </div>
                  <Badge variant="secondary">En progreso</Badge>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-sm text-muted-foreground">30% completado</p>
              </div>

              <Button className="w-full" variant="outline">
                Ver Todas las Certificaciones
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Tus últimas acciones en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completaste el módulo 5</p>
                    <p className="text-xs text-muted-foreground">Desarrollo Web Full Stack - Hace 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Agendaste una cita</p>
                    <p className="text-xs text-muted-foreground">Consulta con instructor - Hace 1 día</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Iniciaste nueva certificación</p>
                    <p className="text-xs text-muted-foreground">Marketing Digital - Hace 3 días</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Obtuviste certificado</p>
                    <p className="text-xs text-muted-foreground">Inglés de Negocios - Hace 1 semana</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Ver Historial Completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

