
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. Completa el formulario a continuación o utiliza nuestros datos de contacto.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 h-full">
                <h2 className="text-xl font-semibold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600 mt-1">info@tutienda.com</p>
                      <p className="text-gray-600">soporte@tutienda.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 765-4321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-gray-600 mt-1">
                        123 Calle Comercio<br />
                        Ciudad Ejemplo, CP 12345<br />
                        País
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Horario de Atención</h3>
                      <p className="text-gray-600 mt-1">
                        Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                        Sábado: 10:00 AM - 4:00 PM<br />
                        Domingo: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Envíanos un Mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nombre Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Correo Electrónico
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="¿Sobre qué quieres contactarnos?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-semibold text-center mb-8">Encuéntranos</h2>
          <div className="rounded-lg overflow-hidden shadow-md h-[400px] bg-gray-200">
            {/* Placeholder for map - in a real app, you would integrate Google Maps or similar */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">Mapa de ubicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-semibold text-center mb-8">Preguntas Frecuentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">¿Cuál es el tiempo de entrega?</h3>
              <p className="text-gray-600">Nuestro tiempo de entrega estándar es de 3-5 días hábiles, dependiendo de tu ubicación.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">¿Cómo puedo rastrear mi pedido?</h3>
              <p className="text-gray-600">Puedes rastrear tu pedido iniciando sesión en tu cuenta y visitando la sección "Mis Pedidos".</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">¿Cuál es su política de devoluciones?</h3>
              <p className="text-gray-600">Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y en su empaque original.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">¿Ofrecen envío internacional?</h3>
              <p className="text-gray-600">Sí, ofrecemos envío internacional a la mayoría de los países. Los tiempos de entrega y costos varían según la ubicación.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
