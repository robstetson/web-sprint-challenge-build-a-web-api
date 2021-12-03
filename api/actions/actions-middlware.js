// add middlewares here related to actions


const Action = require('./actions-model')

async function validateID(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'No actions were found with that ID'})
        } else{
            req.action = action
            next()
        }
    }catch(err){
        next({status: 400, message: 'An Error Occured'})
    }
}

async function validateAction (req, res, next){
    const {project_id, description, notes, completed} = req.body
    if(req.body.project_id === undefined){
        next({status: 400, message: 'Missing a required Feild, Try again'})
    }
    if(!notes || !notes.trim){
        next({status: 400, message: 'Missing a required Feild, Try again'})
    } else{
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}
module.exports = { validateID, validateAction }