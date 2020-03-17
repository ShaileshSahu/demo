
const noteModel = require('../models/note.model');
const constant = require('../constant/constant');
const mongoose = require('mongoose');
/**
 * This controller handle the note related part !!
 */
class NoteController {

    async createNote(noteData) {
        try {
            const {note, description, attachements} = noteData;
            const toSave = {}
            Object.assign(toSave, note ? { note }: null, description ? {description} : null, attachements ? { attachements} : null );
            const result = await noteModel.notes.create(noteData);
            const message =  { ...constant.sucess.createNote, result};
            return { message };
        } catch (error) {
            return Promise.reject();
        }
    }

    async editNote(noteData) {
        try {
            const {note, description, attachements, id} = noteData;
            const toUpdate = {}
            Object.assign(toUpdate, note ? { note }: null, description ? {description} : null, attachements ? { attachements} : null );
            await noteModel.notes.update({_id: mongoose.Types.ObjectId(id)}, noteData);
            const message =  { ...constant.sucess.updateNote};
            return { message };
        } catch (error) {
            return Promise.reject();
        }
    }

    async deleteNote(id) {
        try {
            await noteModel.notes.remove({_id: mongoose.Types.ObjectId(id) });
            const message =  { ...constant.sucess.deleteNote};
            return { message };
        } catch (error) {
            console.log('delete node', error);
            return Promise.reject();
        }
    }

    async getNotes(query) {
        try {
            const { note, createdAt, search } = query;
            let sort = { createdAt: -1 }, seachQuery =  {};
            if(createdAt == 'D') sort['createdAt'] = 1;
            if (note && note == 'A') sort['note'] = -1
            else if (note && note == 'D') sort['note'] = 1;
            if (search) seachQuery['note'] = new RegExp(search, 'i');
            const result = await noteModel.notes.find(seachQuery,{ note:1, attachements:1, createdAt: 1, description: 1 }).sort(sort);
            const message = { ...constant.sucess.sucessCommon, result};
            return {message};
        } catch (error) {
            console.log('error', error);
            return Promise.reject();
        }
    }




}

exports.noteController = new NoteController();