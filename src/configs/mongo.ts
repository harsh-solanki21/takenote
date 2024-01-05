import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const connectMongo = async (mongo_uri: string) => {
    try {
        await mongoose.connect(mongo_uri)
        console.log('Connected to mongo successfully 👍')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectMongo
