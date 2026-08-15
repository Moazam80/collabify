const Project = require("../models/Project");

// GET /api/projects — list all projects (public)
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().populate("owner", "name email");
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// GET /api/projects/:id — single project details (public)
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate("owner", "name email");
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// POST /api/projects — create new project (protected)
async function createProject(req, res) {
  try {
    const { title, description, category, skillsRequired, maxTeamSize } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: "Title, description, and category are required." });
    }

    const newProject = await Project.create({
      title,
      description,
      category,
      skillsRequired,
      maxTeamSize,
      owner: req.userId,
    });

    res.status(201).json({ success: true, message: "Project created.", project: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// PUT /api/projects/:id — edit project (protected, owner only)
async function updateProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to edit this project." });
    }

    const { title, description, category, skillsRequired, maxTeamSize } = req.body;
    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.category = category ?? project.category;
    project.skillsRequired = skillsRequired ?? project.skillsRequired;
    project.maxTeamSize = maxTeamSize ?? project.maxTeamSize;

    await project.save();

    res.status(200).json({ success: true, message: "Project updated.", project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// DELETE /api/projects/:id — delete project (protected, owner only)
async function deleteProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this project." });
    }

    await project.deleteOne();

    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };