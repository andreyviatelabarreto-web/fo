import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">
                CertificacionesInt
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Tu plataforma de confianza para obtener certificaciones internacionales 
              de alta calidad y reconocimiento mundial.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/certificaciones" className="text-muted-foreground hover:text-primary transition-colors">
                  Todas las Certificaciones
                </Link>
              </li>
              <li>
                <Link to="/citas" className="text-muted-foreground hover:text-primary transition-colors">
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Mi Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Acerca de Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/certificaciones?category=tecnologia" className="text-muted-foreground hover:text-primary transition-colors">
                  Tecnología
                </Link>
              </li>
              <li>
                <Link to="/certificaciones?category=negocios" className="text-muted-foreground hover:text-primary transition-colors">
                  Negocios
                </Link>
              </li>
              <li>
                <Link to="/certificaciones?category=idiomas" className="text-muted-foreground hover:text-primary transition-colors">
                  Idiomas
                </Link>
              </li>
              <li>
                <Link to="/certificaciones?category=salud" className="text-muted-foreground hover:text-primary transition-colors">
                  Salud
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@certificacionesinternacionales.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Education St, Learning City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Certificaciones Internacionales. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

