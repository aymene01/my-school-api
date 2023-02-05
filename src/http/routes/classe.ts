import { Router } from 'express'
import { prisma } from '@/lib/prisma'

const api = Router()

api.post('/', async (req, res) => {
	const { name } = req.body

	const existingClasse = await prisma.classe.findFirst({
		where: {
			name,
		},
	})

	if (existingClasse) return res.status(400).json({ message: 'Classe already exists' })

	const classe = await prisma.classe.create({
		data: {
			name,
		},
	})

	res.json(classe)
})

api.get('/', async (_, res) => {
	const classes = await prisma.classe.findMany()
	res.json(classes)
})

api.get('/:id', async (req, res) => {
	const { id } = req.params
	const classe = await prisma.classe.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!classe) return res.status(404).json({ message: 'Classe not found' })

	res.json(classe)
})

api.put('/:id', async (req, res) => {
	const { id } = req.params
	const { name } = req.body

	const existingClasse = await prisma.classe.findFirst({
		where: {
			name,
		},
	})

	if (existingClasse && existingClasse.id !== Number(id)) return res.status(400).json({ message: 'Classe already exists' })

	const classe = await prisma.classe.update({
		where: {
			id: Number(id),
		},
		data: {
			name,
		},
	})

	res.json(classe)
})

api.delete('/:id', async (req, res) => {
	const { id } = req.params
	const existingClasse = await prisma.classe.findUnique({
		where: {
			id: Number(id),
		},
	})

	if (!existingClasse) return res.status(404).json({ message: 'Classe not found' })

	const classe = await prisma.classe.delete({
		where: {
			id: Number(id),
		},
	})

	res.json(classe)
})

export default api
