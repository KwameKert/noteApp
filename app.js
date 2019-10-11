const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0')

//adding notes
yargs.command({
    command : 'add',
    describe: 'Adds note to notesapp',
    builder: {
        title : {
            describe: 'Add Title to note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Add Body to note',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//listing notes 
yargs.command({
    command: 'list',
    describe : 'Lists all notes',
    handler () {
        notes.listNotes()
    }
})

//deleting notes 
yargs.command({
    command: 'remove',
    describe: 'Removing note',
    builder: {
        title: {
            describe: 'Title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv){
       notes.removeNote(argv.title);
    }
})


//reading note 

yargs.command({
    command: 'read',
    describe:'Reading note',
    builder : {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
        
    }
})


yargs.parse();