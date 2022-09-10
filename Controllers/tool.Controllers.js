const { getDb } = require("../utils/dbConected");

 
module.exports.getAlltools= async(req,res,next)=>{
  try{
     //cussor=>toArray ,forEach()
   const db= getDb();
 const tool= await db.collection('tools').find().toArray()  
   res.status(200).json({success:true,data:tool});

}
  catch(error){
    next()
  }

}


module.exports.saveTools= async (req,res,next)=>{
    try {
        const db = getDb();
        const tool = req.body;
    
        const result = await db.collection("tools").insertOne(tool);
        console.log(result);
    
        if (!result.insertedId) {
          return res.status(400).send({ status: false, error: "Something went wrong!" });
        }
    
        res.send({ success: true, message: `Tool added with id: ${result.insertedId}` });
      } catch (error) {
        next(error);
      }
}
   
    module.exports.getDetail=(req,res)=>{
        res.send('veiw deatil')
    
    }