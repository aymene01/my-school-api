import { createServer } from '@/http/createServer'
import { waitForSignal } from '@/toolbox/os/signal'
import { prisma } from '@/lib/prisma'

const api = async () => {
	await prisma.$connect()
	console.log('🚀 Database connected')

	const server = createServer()

	await server.start()
	await waitForSignal(['SIGINT', 'SIGTERM'])
	await server.stop()
}

api()
