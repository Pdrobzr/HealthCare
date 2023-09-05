import { Router } from "express";

export const router = Router();

router.get('/', async (req, res) => {
    return res.json({message: 'Hello world!'});
})