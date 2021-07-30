import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,'D:\\REACT\\ecommerce2\\src\\uploads')
    },
    filename(req,file,callback){
        callback(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        //creo el nombre del archivo con la fecha y la extension
    }
})

function checkFileType(file, callback){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) //nos da verdadero o falso
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return callback(null,true)

        
    }else {
        callback('images only')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,file,callback){
        checkFileType(file,callback)
    }
})

router.post('/',upload.single('image'),(req,res)=>{

    let fileUrl = (req.file.path).replace("\\","/")  

    console.log(req.file.path);
   // res.send(`/${req.file.path}`)
   res.send(`${req.file.path}`)
   
})

export default router;
