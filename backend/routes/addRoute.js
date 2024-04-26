import express from 'express'
import { addusers, addBooking, addSeller, } from '../controllers/addServices.js'


const router= express.Router()


router.post('/addusers', addusers)
router.post('/addBooking', addBooking)
router.post('/addSeller', addSeller)


export default router

