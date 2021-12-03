const Project = require('./projects-model')

async function validateProjectID(req, res, next){
    try{
        const {id} = req.params
        const project = await Project.get(id)
        if(project){
            req.params = project
            next()
        }else{
            next({status:404, message:'Project unable to be found'})
        }
    }catch(err){
        next(err)
    }
}

async function validateProject(req, res, next){
    const {name, descirption, completed}= req.body
    if(!name || name.trim()){
        next({status:400 , message: 'All feilds are required try again'})
    }else{
        req.name= name.trim()
        req.descirption= descirption.trim()
        req.completed = completed
        next()
    }
}
module.exports = {validateProjectID, validateProject}