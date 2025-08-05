import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock, Award, CheckCircle } from 'lucide-react'

const CertificationDetail = () => {
  const { id } = useParams()

  // Mock data - en producción esto vendría de la API
  const certification = {
    id: 1,
    title: "Certificación en Desarrollo Web Full Stack",
    description: "Aprende las tecnologías más demandadas del mercado incluyendo React, Node.js, y bases de datos.",
    detailedDescription: "Este curso completo te llevará desde los fundamentos del desarrollo web hasta convertirte en un desarrollador full stack competente. Aprenderás HTML, CSS, JavaScript, React, Node.js, Express, MongoDB y mucho más.",
    price: 299,
    rating: 4.8,
    students: 1250,
    duration: "40 horas",
    category: "Tecnología",
    difficulty: "Intermedio",
    featured: true,
    learningObjectives: [
      "Dominar HTML5, CSS3 y JavaScript moderno",
      "Crear aplicaciones web con React",
      "Desarrollar APIs REST con Node.js y Express",
      "Trabajar con bases de datos MongoDB",
      "Implementar autenticación y autorización",
      "Desplegar aplicaciones en la nube"
    ],
    prerequisites: [
      "Conocimientos básicos de programación",
      "Familiaridad con HTML y CSS",
      "Acceso a una computadora con internet"
    ]
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{certification.category}</Badge>
                <Badge variant="outline">{certification.difficulty}</Badge>
                {certification.featured && <Badge>Destacado</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {certification.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {certification.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{certification.rating}</span>
                  <span>({certification.students} estudiantes)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{certification.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{certification.students} inscritos</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {certification.detailedDescription}
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>Lo que aprenderás</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {certification.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos previos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {certification.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardHeader>
                <div className="text-3xl font-bold text-primary mb-2">
                  ${certification.price}
                </div>
                <CardDescription>
                  Acceso completo de por vida
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  Inscribirse Ahora
                </Button>
                <Button variant="outline" className="w-full">
                  Agregar al Carrito
                </Button>
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Certificado incluido</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Acceso de por vida</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Soporte 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-muted rounded-full"></div>
                  <div>
                    <div className="font-medium">Dr. Juan Pérez</div>
                    <div className="text-sm text-muted-foreground">
                      Experto en Desarrollo Web
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Más de 10 años de experiencia en desarrollo web y tecnologías modernas. 
                  Ha trabajado con empresas Fortune 500 y startups exitosas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationDetail

