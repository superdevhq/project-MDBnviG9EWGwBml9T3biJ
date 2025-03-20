
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

  // Fixed the syntax error by adding the missing closing parenthesis
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

      {/* ... keep existing code (rest of the component) */}
    </Layout>
  );
};

export default Contact;
