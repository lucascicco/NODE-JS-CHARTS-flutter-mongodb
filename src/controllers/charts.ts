import { Chart } from '../models/charts';
import { Request, Response } from "express";

class ChartController {
    async store(req: Request , res:  Response) {   
        const { title, type, values } = req.body;

        const userId = req.userId

        const existingChart = await Chart.find({
            owner: userId
        }).where('title').equals(title);

        if(existingChart){
            return res.status(400).json({
                error: 'Esse gráfico já existe em nosso sistema.'
            })
        }

        const chart = Chart.build({
            title,
            type,
            values
        })

        await chart.save();

        return res.status(200).send({
            id: chart._id,
            title,
            values
        });
    }   
}

export default new ChartController();


