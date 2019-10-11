const chalk = require('chalk')
const fs = require('fs')

//chalk definitions 
const error = chalk.red;
const success = chalk.green;
const info = chalk.blue;
//adding note 
const  addNote = (title, body) => {
    let notesArr = loadNotes();

    
   // const dupNotes = notesArr.filter( (note) => title == note.title )
    const dupNote = notesArr.find((note) => note.title == title)

    if(!dupNote) {
        note = {
            title : title,
            body : body
        }

        notesArr.push(note)
        saveNotes(notesArr)
        console.log(success('Note Added Successfully'))
    }else{
        console.log(error('Note Taken already'))
    }
}

//saving note 
const saveNotes = (notesArr) => {
    const notes = JSON.stringify(notesArr);
    fs.writeFileSync('notes.json',notes);
}



//loading note 
const loadNotes =() => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const jsonString = dataBuffer.toString();
        const jsonData = JSON.parse(jsonString)
        return jsonData
    } catch(e) {
        return []
    }
}


const  removeNote = (title) => {
    let notesArr = loadNotes();
    
    notesToKeep = notesArr.filter((note) => note.title !=  title)

    if(notesToKeep.length < notesArr.length ) {
        saveNotes(notesToKeep);
        console.log(success("Note has been deleted successfully"))
    }else{
        console.log(info("No Note Found ..."))
    }

}
 const listNotes = () => {
     let notesArr = loadNotes();
    console.log('My Notes')
     if(notesArr.length > 1) {
        notesArr.forEach((note) => {
             console.log(`
            ---------------------------
            Title: ${note.title}
            Body: ${note.body} `)
        })
     }else {
        console.log(info("No Notes found ..."))
     }
 }   


 const readNote = (title) => {
     const notes = loadNotes();
     const note = notes.find((note)=> note.title === title);

     if(note){
        console.log(`
        ---------------------------
        Title: ${note.title}
        Body: ${note.body} `)  
     }else{
         console.log(error("Note doesnt exist"))
     }
     
 }



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
    
}