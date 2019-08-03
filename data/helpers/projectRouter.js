const express = require('express');
const Projects = require('./projectModel');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to retrieve your projects.'
    });
  }
});

//GET PROJECT by ID
router.get('/', validateProjectId, async (req, res) => {
  try {
    const project = await Projects.get();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to retrieve your Project.'
    });
  }
});

//POST

router.post('./', validateProject, async (req, res) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(200).json({ newProject });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to create the new Project.'
    });
  }
});

//PUT (update)
router.put('/:id', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = await Projects.update(id, req.body);
    res.status(200).json(edit);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'We were unable to update your project'
    });
  }
});

//Delete
router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await Projects.remove(id);
    res.status(200).json(deleteProject);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to remove the selected Project.'
    });
  }
});
//Middleware

function validateProject(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({
      success: false,
      message: 'Missing required Project informtation.'
    });
  } else if (!req.body.description) {
    res.status(400).json({
      success: false,
      message: 'Missing required Project description.'
    });
  }
  next();
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  const { validId } = await Projects.get(id);
  if (validId) {
    req.validId = validId;
    next();
  } else {
    res.status(400).json({ success: false, message: 'Invalid Project id.' });
  }
}

module.exports = router;
