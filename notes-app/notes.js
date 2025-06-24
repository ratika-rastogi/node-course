import fs from 'node:fs'
import chalk from 'chalk'

export  function getNotes(){
    return 'My notes......'
}

export  function addNote(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter( function(note){
        return note.title === title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)        
        console.log(chalk.green("Data Saved successfully"))
    }else{
        console.log(chalk.red('OOps '+title+' note already exists'))
    }
    
}

export function removeNote(noteTitle){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title!==noteTitle
    })
    if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed("Note not found!!!!"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note '+noteTitle+' deleted successfully!!!!'))
    }
    // console.log(chalk.cyan("Notes without title: "+ JSON.stringify(notesToKeep)))
    // console.log(chalk.magenta("Notes with title: "+ JSON.stringify(notes)))
    // console.log(chalk.yellowBright("Log with title: "+ noteTitle +" removed"))
}

const saveNotes= function(notes){
    const notesData = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesData)
}

const loadNotes = function(){
    try{
        const notesBuffer = fs.readFileSync('notes.json')
    return JSON.parse(notesBuffer.toString())
    }catch(e){
        console.log("error:"+e)
        return []
    }
}

 

