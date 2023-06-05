const mongoose = require("mongoose")

const connectDb = async () => {
   var connected = await mongoose.connect("mongodb+srv://scott:y8h9ubEcxc8tvrKU@cluster0.g2nugzd.mongodb.net/?retryWrites=true&w=majority")
   if (connected) {
    console.log("sucessfully connected to db")
   } else {
    console.log("Failed to connect to database")
   }
}

module.exports = {
    connectDb
}
