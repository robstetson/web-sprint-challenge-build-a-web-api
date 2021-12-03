const Action = require('./actions-model')
const express = require('express')
const router = express.Router()
const {validateID, validateAction} = require('./actions-middlware')


router.get('/', async (req, res, next)=>{
    try{
        const action = await Action.get()
        res.status(200).json(action)
    }catch(err){
        next({status: 400, message: 'An error has occured please try again'})
    }
})

router.get('/:id', validateID, async (req, res, next)=>{
    try{
        res.status(200).json(req.action)
    }catch(err){
        next({status: 404, message: 'An error has occured please try again'})
    }
})

router.post('/', (req, res, next)=>{
const newAction = req.body
if(!newAction.project_id || !newAction.description || !newAction.notes){
    res.status(400).json({
        message: "Missing information, please try again"
    })
}
else{
    Action.insert(newAction)
    .then(()=>{
        res.status(201).json(newAction)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: 'Trouble loading your action, please try again'
        })
    })
}
})

router.put('/:id', validateID, validateAction, async (req, res)=>{
    const updatedAction = await Action.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
    res.status(200).json(updatedAction)
})

router.delete('/:id', validateID, async (req, res, next)=>{
    try{
        await Action.remove(req.params.id)
        res.json(res.Action)
    }catch (err){
        next({status: 400, message: 'An error has occured please try again'})
    }
})
module.exports = router