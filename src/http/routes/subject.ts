import { Router } from 'express'

import { prisma } from '@/lib/prisma'

const api = Router()

api.post('/', async (req, res) => {
	const { name } = req.body

	const existingSubject = await prisma.subject.findFirst({
		where: {
			name,
		},
	})

	if (existingSubject) return res.status(400).json({ message: 'Subject already exists' })

	const subject = await prisma.subject.create({
		data: {
			name,
		},
	})

	res.json(subject)
})

api.get('/', async (_, res) => {
	const subjects = await prisma.subject.findMany()
	res.json(subjects)
})

api.get('/:id', async (req, res) => {
	const { id } = req.params
	const subject = await prisma.subject.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!subject) return res.status(404).json({ message: 'Subject not found' })

	res.json(subject)
})

api.put('/:id', async (req, res) => {
	const { id } = req.params
	const { name } = req.body

	const existingSubject = await prisma.subject.findFirst({
		where: {
			name,
		},
	})

	if (existingSubject && existingSubject.id !== Number(id)) return res.status(400).json({ message: 'Subject already exists' })

	const subject = await prisma.subject.update({
		where: {
			id: Number(id),
		},
		data: {
			name,
		},
	})

	res.json(subject)
})

api.delete('/:id', async (req, res) => {
	const { id } = req.params
	const existingSubject = await prisma.subject.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!existingSubject) return res.status(404).json({ message: 'Subject not found' })

	const subject = await prisma.subject.delete({
		where: {
			id: Number(id),
		},
	})

	res.json(subject)
})

export default api
