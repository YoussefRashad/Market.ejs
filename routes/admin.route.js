

const router = require('express').Router()
const adminGuard = require('./guards/admin.guard')
const adminController = require('../controllers/admin.controller')
const check = require('express-validator').check
const multer = require('multer')



router.get('/addProduct', adminGuard.isAdmin, adminController.getAddProduct)
router.get('/manageProduct', adminGuard.isAdmin, adminController.getManageProduct)

router.post('/addProduct', adminGuard.isAdmin,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, CB)=>{
                CB(null, 'images')
            },
            filename: (req,file, CB)=>{
                CB(null, Date.now() + '_' + file.originalname)
            }
        })
    }).single('image'),
    check('image').custom((value,{req})=>{
        if(req.file)
            return true;
        else {
            throw 'image is required'
        }
    }),
    adminController.postAddProduct
)


module.exports = router