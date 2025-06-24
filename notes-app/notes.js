import fs from 'node:fs'
import chalk from 'chalk'

export  function addNote(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.find( (note) => note.title === title)
    if(!duplicateNotes){
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
    const notesToKeep = notes.filter( (note) =>  note.title!==noteTitle)
    if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed("Note not found!!!!"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note '+noteTitle+' deleted successfully!!!!'))
    }
}

export function listNotes(){
    const notes = loadNotes()
    console.log(chalk.bgCyanBright("Your Notes-"))
    let i=0
    notes.forEach((note) => console.log("<"+(++i)+">"+note.title+"\n"));
}

export function readNote(noteTitle){
    const notes = loadNotes()
    const note = notes.find((note) => note.title === noteTitle)
    if(note){
        console.log(chalk.bgGreen.bold(note.title)+"-"+ note.body)
    }else{
        console.log(chalk.red.bold.underline(noteTitle+' not found'))
    }
}

const saveNotes= (notes) => {
    const notesData = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesData)
}

const loadNotes = () =>{
    try{
        const notesBuffer = fs.readFileSync('notes.json')
         return JSON.parse(notesBuffer.toString())
    }catch(e){
        return []
    }
}

 

