import express from 'express';
import nodemailer from 'nodemailer';

import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
    const{ type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    

    return res.status(201).send();
})