const express = require('express');
const {CreateCategoryController, CreateSubCategoryController, categoryStatusController, subCategoryStatusController} = require('../../controller/CreateCategoryController');
const { getallcategoryController, getallsubcategoryController } = require('../../controller/getCategories');
const router = express.Router()

router.post('/createcategory', CreateCategoryController)
router.post('/categorystatus', categoryStatusController)
router.post('/subcategorystatus', subCategoryStatusController)
router.post('/createsubcategory', CreateSubCategoryController)


router.get('/getallcategory', getallcategoryController)
router.get('/getallsubcategory', getallsubcategoryController)


module.exports = router;