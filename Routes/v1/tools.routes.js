const express =require("express");
const router= express.Router();
const toolsController=require("../../Controllers/tool.Controllers")


/**
 * @api {get} /part all tools
 * @apiDescription Get all the tools
 * @apiPermisson admin
 * @apiHeader {string}Authorizatoin user,s acces token
 * @apisucces {objects[]} all the parts
 * @apiError (unauthorized 401) unauthenticated users can access the data
 * @apni Error(Forbidden 403) only Admin can access the data
 */





router.route("/")
.get(toolsController.getAlltools)

    /**
 * @api {post} /part all parts
 * @apiDescription Get all the tools
 * @apiPermisson admin
 * @apiHeader {string}Authorizatoin user,s acces token
 * @apisucces {objects[]} all the parts
 * @apiError (unauthorized 401) unauthenticated users can access the data
 * @apni Error(Forbidden 403) only Admin can access the data
 */




.post(toolsController.saveTools)




router.route('/:id').get(toolsController.getDetail)

module.exports=router