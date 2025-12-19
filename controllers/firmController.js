const firm=require('../models/firm');
const vender=require('../models/Vender');
const multer=require('multer');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,

});





const addFirm=async(req,res)=>{
   try{
     const {firmName,area,category,offer}=req.body;
    const image=req.file? req.file.path : undefined;
    const vender=await vender.findById(req.venderId);

    if(!vender){
        return res.status(404).json({message:"Vender not found"});
    }

    const firm= new Firm({
        firmName,
        area,
        category,
        offer,
        image,
        vender: vender._id
    })

    const saveFrim =await firm.save();
    vender.firms.push(saveFrim);
    await vender.save();
    
    res.status(201).json({message:"Firm added successfully",firm});
   }
    catch(err){
        res.status(500).json({message:"Server Error",error:err.message});
    }


}


//Delete Firm
const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const deletedFirm = await firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ message: 'Firm not found' });
    }

    await firm.findByIdAndUpdate(
      deletedFirm._id,
      { $pull: { firms: firmId } }
    );

    res.status(200).json({ message: 'Firm deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }



};




module.exports={addFirm:[upload.single('image'),addFirm ],deleteFirmById};





