import { Router } from 'express'
import { prisma } from '@/lib/prisma'

const api = Router()

api.post('/', async (req, res) => {
	const { value, subjectId, studentId } = req.body

	const grade = await prisma.grade.create({
		data: {
			value: Number(value),
			studentId: Number(studentId),
			subjectId: Number(subjectId),
		},
	})

	res.json(grade)
})

api.get('/', async (_, res) => {
	const grades = await prisma.grade.findMany()
	res.json(grades)
})

api.get('/:id', async (req, res) => {
	const { id } = req.params
	const grade = await prisma.grade.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!grade) return res.status(404).json({ message: 'Grade not found' })

	res.json(grade)
})

api.put('/:id', async (req, res) => {
	const { id } = req.params
	const { value, subjectId, studentId } = req.body

	const existingGrade = await prisma.grade.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (existingGrade && existingGrade.id !== Number(id)) return res.status(400).json({ message: 'Grade already exists' })

	const grade = await prisma.grade.update({
		where: {
			id: Number(id),
		},
		data: {
			value: Number(value),
			studentId: Number(studentId),
			subjectId: Number(subjectId),
		},
	})

	res.json(grade)
})

api.delete('/:id', async (req, res) => {
	const { id } = req.params

	const existingGrade = await prisma.grade.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!existingGrade) return res.status(404).json({ message: 'Grade not found' })
	const grade = await prisma.grade.delete({
		where: {
			id: Number(id),
		},
	})

	res.json(grade)
})
export default api
