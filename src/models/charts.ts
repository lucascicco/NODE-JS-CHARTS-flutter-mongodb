import mongoose from 'mongoose';

interface ChartAttrs {
    title: string;
    type: number;
    values: Array<{
        name: string;
        color: string;
        value: number;
      }>;
};

interface ChartModel extends mongoose.Model<ChartDoc>{
    build(attrs: ChartAttrs): ChartDoc;
};

interface ChartDoc extends mongoose.Document{
    title: string;
    type: number;
    values: Array<{
        name: string;
        color: string;
        value: number;
      }>;
    createdAt: string;
    updatedAt: string;
};

const chartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true
    },
    values : {
        type: Array,
        required: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
});


const Chart = mongoose.model<ChartDoc, ChartModel>('User', chartSchema);

export { Chart };