import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        })

        connection.on('error', (error) => {
            console.log('Error connecting to MongoDB. Please make sure MongoDB is running.'+ error);
            process.exit();
        })
    }
    catch(error){
        console.log('Something goes wrong!');
        console.log(error);
    }
}