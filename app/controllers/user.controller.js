const Users = require('../models/user.model.js');



// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    const users = new Users({
        name: req.body.name || "New User", 
        email: req.body.email,
        phone : req.body.phone,
        address:req.body.address,
        image :req.body.image
    });

    users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Users.find()
    .then(users_list => {
        res.send(users_list);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Users.findById(req.params.userId)
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });            
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.userId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "New User", 
        email: req.body.email,
        phone : req.body.phone,
        address:req.body.address,
        image :req.body.image
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });

};