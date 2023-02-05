import { Router } from 'express'
import { prisma } from '@/lib/prisma'

const api = Router()

api.post('/', async (req, res) => {
	const { name, email } = req.body

	const existingStudent = await prisma.student.findUnique({
		where: {
			email,
		},
	})

	if (existingStudent) return res.status(400).json({ message: 'Student already exists' })

	const student = await prisma.student.create({
		data: {
			name,
			email,
		},
	})

	res.json(student)
})

api.get('/', async (_, res) => {
	const students = await prisma.student.findMany()
	res.json(students)
})

api.get('/:id', async (req, res) => {
	const { id } = req.params
	const student = await prisma.student.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			grade: true,
		},
	})

	if (!student) return res.status(404).json({ message: 'Student not found' })

	res.json(student)
})

api.put('/:id', async (req, res) => {
	const { id } = req.params
	const { name, email } = req.body

	const existingStudent = await prisma.student.findUnique({
		where: {
			email,
		},
	})

	if (existingStudent && existingStudent.id !== Number(id)) return res.status(400).json({ message: 'Student already exists' })

	const student = await prisma.student.update({
		where: {
			id: Number(id),
		},
		data: {
			name,
			email,
		},
	})

	res.json(student)
})

api.delete('/:id', async (req, res) => {
	const { id } = req.params

	const existingStudent = await prisma.student.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!existingStudent) return res.status(404).json({ message: 'Student not found' })

	const student = await prisma.student.delete({
		where: {
			id: Number(id),
		},
	})

	res.json(student)
})

export default api
