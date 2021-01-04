import { Chart } from '../models/charts';
import { Request, Response } from "express";

class ChartController {
    async store(req: Request , res:  Response) {   
        const { title, type, values } = req.body;

        const userId = req.userId

        const existingChart = await Chart.find({
            owner: userId
        }).where('title').equals(title);

        console.log(existingChart);

        if(existingChart.length > 0){
            return res.status(400).json({
                error: 'Esse gráfico já existe em nosso sistema.'
            })
        }

        const chart = await Chart.build({
            title,
            type,
            values,
            owner: userId,
        })

        await chart.save();

        return res.status(200).send({
            id: chart._id,
            type,
            title,
            values
        });
    }   

    async getAllCharts(req: Request , res:  Response) {
        const userId = req.userId;

        const allCharts = await Chart.find({
            owner: userId
        });

        return res.status(200).send(allCharts);
    }

    async getOneChart(req: Request , res:  Response) {
        const userId = req.userId;

        const chart = await Chart.findById(userId);

        return res.status(200).send(chart);
    }


    async deleteOne (req: Request , res: Response) {
        const userId = req.userId;

        const { id } = req.body;

        const OneChart = await Chart.findById(id);

        if(!OneChart){
            return res.status(400).json({
                error: 'Gráfico inexistente'
            })
        }

        if(OneChart?.owner != userId){
            return res.status(400).json({
                error: 'Você não tem permissão para deletar esse gráfico'
            })
        }   

        await Chart.deleteOne(OneChart);

        return res.status(200).send(OneChart);
    }
}

export default new ChartController();


