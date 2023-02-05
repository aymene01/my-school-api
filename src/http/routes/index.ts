import { Router } from 'express'
import student from './student'
import subject from './subject'
import classe from './classe'
import grade from './grade'

const api = Router()

api.use('/student', student)
api.use('/subject', subject)
api.use('/classe', classe)
api.use('/grade', grade)

export default api
