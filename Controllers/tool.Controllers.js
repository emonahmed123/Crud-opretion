const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConected");


module.exports.getAlltools = async (req, res, next) => {
  try {
    //cussor=>toArray ,forEach()
    const { limit, page } = req.query;
    const db = getDb();
    const tool = await db.collection('tools')
      .find({})
      // .project({ _id: 0 })
      .skip(+page*limit)
      .limit(+limit)
      .toArray()  //.skip(1).limit(1)
    res.status(200).json({ success: true, data: tool });

  }
  catch (error) {
    next()
  }

}


module.exports.saveTools = async (req, res, next) => {
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

module.exports.getDetail = async (req, res,next) => {
try{
  const db=getDb();
  const {id}=req.params;
  if(!ObjectId.isValid(id)){
    return res.status(400).json({success:false,error:"NOT a tool id."})
  }
 const tool=db.collection('tools').findOne({_id:ObjectId(id)})
 if(!tool){
  return res.status(400).json({success:false,error:"could not find a tool with this id"})
 }
 res.status(200).json({success:true,data:tool})
}
catch(error){
 next(error)
} 

}
module.exports.updateDetail = async (req, res,next) => {
try{
  const db=getDb();
  const {id}=req.params;
  if(!ObjectId.isValid(id)){
    return res.status(400).json({success:false,error:"NOT a tool id."})
  }
 const tool=db.collection('tools').updateOne({_id:ObjectId(id)},{$set:req.body})
 if(!tool.modifiedCount){
  return res.status(400).json({success:false,error:"could not update"})
 }
 res.status(200).json({success:true,message:"update the tool"})
}
// {{quantity:{exists:flase}}}
catch(error){
 next(error)
} 

}