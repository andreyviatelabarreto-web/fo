import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Star, Users, Clock } from 'lucide-react'

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  // Mock data - en producción esto vendría de la API
  const certifications = [
    {
      id: 1,
      title: "Certificación en Desarrollo Web Full Stack",
      description: "Aprende las tecnologías más demandadas del mercado incluyendo React, Node.js, y bases de datos.",
      price: 299,
      rating: 4.8,
      students: 1250,
      duration: "40 horas",
      category: "Tecnología",
      difficulty: "Intermedio",
      featured: true
    },
    {
      id: 2,
      title: "Gestión de Proyectos PMP",
      description: "Conviértete en un líder de proyectos certificado con metodologías reconocidas mundialmente.",
      price: 450,
      rating: 4.9,
      students: 890,
      duration: "60 horas",
      category: "Negocios",
      difficulty: "Avanzado",
      featured: true
    },
    {
      id: 3,
      title: "Inglés de Negocios Avanzado",
      description: "Domina el inglés profesional para el mundo empresarial y mejora tus oportunidades.",
      price: 199,
      rating: 4.7,
      students: 2100,
      duration: "30 horas",
      category: "Idiomas",
      difficulty: "Intermedio",
      featured: false
    },
    {
      id: 4,
      title: "Certificación en Ciberseguridad",
      description: "Aprende a proteger sistemas y datos con las mejores prácticas de seguridad informática.",
      price: 399,
      rating: 4.6,
      students: 750,
      duration: "50 horas",
      category: "Tecnología",
      difficulty: "Avanzado",
      featured: false
    },
    {
      id: 5,
      title: "Marketing Digital y Redes Sociales",
      description: "Domina las estrategias de marketing digital para hacer crecer cualquier negocio.",
      price: 249,
      rating: 4.5,
      students: 1800,
      duration: "35 horas",
      category: "Negocios",
      difficulty: "Principiante",
      featured: false
    },
    {
      id: 6,
      title: "Certificación en Enfermería",
      description: "Actualiza tus conocimientos en enfermería con las últimas prácticas y protocolos.",
      price: 350,
      rating: 4.8,
      students: 650,
      duration: "45 horas",
      category: "Salud",
      difficulty: "Intermedio",
      featured: false
    }
  ]

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'negocios', label: 'Negocios' },
    { value: 'idiomas', label: 'Idiomas' },
    { value: 'salud', label: 'Salud' },
    { value: 'educacion', label: 'Educación' }
  ]

  const difficulties = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' }
  ]

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           cert.category.toLowerCase() === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             cert.difficulty.toLowerCase() === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certificaciones Internacionales
          </h1>
          <p className="text-xl text-muted-foreground">
            Descubre más de 200 certificaciones de alta calidad para impulsar tu carrera profesional
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar certificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Dificultad" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando {filteredCertifications.length} certificaciones
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <Card key={cert.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg relative">
                {cert.featured && (
                  <Badge className="absolute top-2 left-2">
                    Destacado
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{cert.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{cert.rating}</span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {cert.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{cert.students} estudiantes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{cert.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{cert.difficulty}</Badge>
                  <div className="text-2xl font-bold text-primary">
                    ${cert.price}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to={`/certificaciones/${cert.id}`}>
                    Ver Detalles
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No se encontraron certificaciones que coincidan con tus criterios de búsqueda.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedDifficulty('all')
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Certifications

