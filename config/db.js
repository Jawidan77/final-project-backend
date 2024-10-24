import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jawidanreza77:g881n08iPN14vcnM@cluster0.7wwhb.mongodb.net/saffron-restaurant').then(()=>console.log("DB connected"));
}