import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  GraduationCap,
  Menu,
  ShoppingCart,
  User,
  Calendar,
  LogOut,
  Settings,
} from 'lucide-react'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <>
      <Link
        to="/"
        className={`${mobile ? 'block py-2' : ''} text-foreground hover:text-primary transition-colors`}
        onClick={onClose}
      >
        Inicio
      </Link>
      <Link
        to="/certificaciones"
        className={`${mobile ? 'block py-2' : ''} text-foreground hover:text-primary transition-colors`}
        onClick={onClose}
      >
        Certificaciones
      </Link>
      {isAuthenticated && (
        <>
          <Link
            to="/dashboard"
            className={`${mobile ? 'block py-2' : ''} text-foreground hover:text-primary transition-colors`}
            onClick={onClose}
          >
            Mi Dashboard
          </Link>
          <Link
            to="/citas"
            className={`${mobile ? 'block py-2' : ''} text-foreground hover:text-primary transition-colors`}
            onClick={onClose}
          >
            Mis Citas
          </Link>
        </>
      )}
    </>
  )

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">
              CertificacionesInt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/carrito">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/citas')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Mis Citas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/carrito">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile onClose={() => setIsOpen(false)} />
                  
                  {isAuthenticated ? (
                    <div className="pt-4 border-t">
                      <p className="font-medium mb-4">Hola, {user?.firstName}</p>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/dashboard')
                          setIsOpen(false)
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                          navigate('/login')
                          setIsOpen(false)
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => {
                          navigate('/register')
                          setIsOpen(false)
                        }}
                      >
                        Registrarse
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

