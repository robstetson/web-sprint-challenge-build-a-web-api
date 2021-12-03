const express = require('express')
const Project = require('./projects-model')
const router = express.Router()
const {validateProjectID, validateProject} = require('./projects-middleware')


router.get('/', (req , res)=>{
    Project.get()
    .then(project =>{
        res.status(200).json(project)
    })
    .catch( ()=>{
        res.status(400).json({message: 'Error fetching your information please try again'})
    })
})


router.get("/:id", validateProjectID, (req,res, next) => {
    try{
        res.status(200).json(req.params)
    } catch(err){
        next(err)
    }
})

router.post('/', (req, res)=>{
    const newProject = req.body
    Project.insert(newProject)
    .then( ()=>{
        res.status(201).json(newProject)
    }).catch(err =>{
        res.status(400).json({
            message: 'Error posting your new project please try again',
            err: err.message,
            stack: err.stack
        })
    })
})

router.put('/:id', validateProjectID, validateProject, (req, res, next)=>{
    if(req.body.completed === undefined){
        next({status: 400, message:'Error fetching your ID please try again'})
    }else{
        Project.update(req.params.id, req.body)
        .then(()=>{
            return Project.get(req.params.id)
        })
        .then(project =>{
            res.json(project)
        })
        .catch(next)
    }
})

router.delete('/:id', validateProjectID, async (req, res, next)=>{
    try{
        await Project.remove(req.params.id)
        res.json(res.Project)
    }catch(err){
        next(err)
    }
})

router.get("/:id/actions", validateProjectID, async (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            if(actions.length > 0){
                res.status(200).json(actions)
            } else {
                res.status(404).json((actions))
            }
        })
        .catch(next)
})
module.exports = router

// saving