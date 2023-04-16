const model = require('../models/model')

//post: http://localhost:8000/api/categories
async function create_Categories(req, res){
    const Create = new model.Categories({
        type:"Investment",
        color:'#FCBE44',//dark
    })

    // Create.save(function(err){
    //     if(!err)return res.json(Create);
    //     return res.status(400).json({message:`Error while creating Categories ${err}`})
    // })

    await Create.save().then(()=>{
        return res.json(Create);
    }).catch((err)=>{
        return res.status(400).json({message:`Error while creating Categories ${err}`})
    })
}

//get: http://localhost:8000/api/categories
async function get_Categories(req,res){
    let data=await model.Categories.find({})

    let filter = await data.map(v=>Object.assign({},{type:v.type,color:v.color}));
    return res.json(filter);
}

//post: http://localhost:8000/api/transaction
async function create_Transaction(req,res){
    if(!req.body) return res.status(400).json("Post HTTP not provided");
    let{name,type,amount}=req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date:new Date()
        }
    );

    await create.save().then(()=>{
        return res.json(create);
    }).catch((err)=>{
        return res.status(400).json({message:`Error while creating Transaction ${err}`})
    })
}

//get: http://localhost:8000/api/transaction
async function get_Transaction(req,res){
    let data=await model.Transaction.find({});
    return res.json(data);
}

//delete: http://localhost:8000/api/transaction
async function delete_Transaction(req,res){
    if(!req.body) res.status(400).json({message:"request body not found"});

    await model.Transaction.deleteOne(req.body).then(()=>{
        return res.json("Record Deleted...!");
    }).catch((err)=>{
        return res.status(400).json({message:"Erorr while deleting Transaction Record"})
    })
}

//get: http://localhost:8000/api/labels
async function get_Labels(req,res){

    model.Transaction.aggregate([
        {
            $lookup: {
                from:"categories",
                localField:'type',
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id, name:v.name,type:v.type, amount:v.amount, color:v.categories_info['color']}));
        res.json(data);
    }).catch(error=>{
        res.status(400).json("Lookup Collection Error");
    })
}


module.exports={
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}