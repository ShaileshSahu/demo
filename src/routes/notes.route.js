const express = require('express');
const controller = require('../controller/note.controller');
const utils = require('../util');
/**
 * This is the note route which handled the note related functionality !!
 */
class NoteRoute {

    constructor() {
        this.path = '/note';
        this.router = express.Router();
        this.init();
    }

    init() {
      
        this.router.post('/', async (req,res) => {
            try {
                const { note, description, attachements } = req.body;
                const result = await controller.noteController.createNote({ note, description, attachements});
                return utils.response.sendResponse(res, result);
            } catch (error) {
                return utils.response.handleError(res, error);
            }
        });



        this.router.put('/:id', async(req,res) => {
            try {
                const id = req.params.id;
                const {note, description, attachements } = req.body;
                const result = await controller.noteController.editNote({id, note, description, attachements});
                return utils.response.sendResponse(res, result);
            } catch (error) {
                return utils.response.handleError(res, error);
            }
        });


        this.router.delete('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const result = await controller.noteController.deleteNote(id);
                return utils.response.sendResponse(res, result);
            } catch (error) {
                return utils.response.handleError(res, error);
            }
        });

        this.router.get('/', async (req, res) => {
            try {
                const { note, createdAt, search } = req.query;
                const result = await controller.noteController.getNotes({ note, createdAt, search });
                return utils.response.sendResponse(res, result);
            } catch (error) {
                console.log('error', error);
                return utils.response.handleError(res, error);
            }
        })
    }
}


exports.noteRoute = new NoteRoute();