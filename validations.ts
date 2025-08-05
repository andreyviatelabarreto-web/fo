import { z } from 'zod'

// User validations
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

// Certification validations
export const certificationSchema = z.object({
  categoryId: z.number().optional(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  detailedDescription: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo'),
  durationHours: z.number().positive().optional(),
  difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  language: z.string().default('es'),
  certificateType: z.enum(['COMPLETION', 'ACHIEVEMENT', 'PROFESSIONAL']).optional(),
  imageUrl: z.string().url().optional(),
  syllabusUrl: z.string().url().optional(),
  prerequisites: z.string().optional(),
  learningObjectives: z.string().optional(),
  featured: z.boolean().default(false),
})

// Order validations
export const orderSchema = z.object({
  items: z.array(z.object({
    certificationId: z.number(),
    quantity: z.number().positive().default(1),
  })),
  billingAddress: z.string().optional(),
  notes: z.string().optional(),
})

// Appointment validations
export const appointmentSchema = z.object({
  certificationId: z.number().optional(),
  instructorId: z.number().optional(),
  appointmentType: z.enum(['CONSULTATION', 'EXAM', 'TUTORING', 'ORIENTATION']),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  durationMinutes: z.number().positive().default(60),
  meetingPlatform: z.string().optional(),
})

// Review validations
export const reviewSchema = z.object({
  certificationId: z.number(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().optional(),
})

// Category validations
export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  iconUrl: z.string().url().optional(),
})

// Coupon validations
export const couponSchema = z.object({
  code: z.string().min(1, 'El código es requerido'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  discountValue: z.number().positive(),
  minimumOrderAmount: z.number().min(0).default(0),
  maxUses: z.number().positive().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CertificationInput = z.infer<typeof certificationSchema>
export type OrderInput = z.infer<typeof orderSchema>
export type AppointmentInput = z.infer<typeof appointmentSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type CouponInput = z.infer<typeof couponSchema>

