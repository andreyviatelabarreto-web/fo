import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Certificación en Desarrollo Web Full Stack",
      price: 299,
      quantity: 1,
      image: "/api/placeholder/100/80"
    },
    {
      id: 2,
      title: "Marketing Digital y Redes Sociales",
      price: 249,
      quantity: 1,
      image: "/api/placeholder/100/80"
    }
  ])

  const [couponCode, setCouponCode] = useState('')

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.16 // 16% tax
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-8">
              Explora nuestras certificaciones y agrega las que más te interesen
            </p>
            <Button asChild>
              <Link to="/certificaciones">
                Explorar Certificaciones
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-muted rounded-lg flex-shrink-0"></div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Código de Descuento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ingresa tu código"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline">
                    Aplicar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Proceder al Pago
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/certificaciones">
                  Continuar Comprando
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Acceso inmediato después del pago</p>
                  <p>✓ Certificado incluido</p>
                  <p>✓ Soporte 24/7</p>
                  <p>✓ Garantía de 30 días</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

