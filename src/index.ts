import express from 'express'
import 'dotenv/config';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Router, Request, Response } from 'express';
import cors from 'cors';
import router from "./routes/routes";
import {pagination} from 'typeorm-pagination';
import { registerSchema } from 'class-validator';

const app = express();
createConnection();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(pagination);
app.use(router)

app.listen(3333, () => 'server running on port 3333')
