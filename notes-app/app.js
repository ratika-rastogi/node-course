import {addNote, removeNote,listNotes,readNote} from './notes.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';


yargs(hideBin(process.argv))
    .command(
        'add',
        'Add a note', 
        {
            title:{
                describe:'Note Title',
                demandOption:true,
                type:'string'
            },
            body:{
                describe:'Add body for the note',
                demandOption:true,
                type:'string'
            }
        },
        (argv) => {
           addNote(argv.title,argv.body)
        }
    ).argv

yargs(hideBin(process.argv))
    .command(
        'remove', 
        'Removes a note', 
        {
            title:{
                describe:'Note title to be removed',
                demandOption:true,
                type:'string'
            }
        }, 
        (argv) => {
            removeNote(argv.title)
        }
    ).argv  

yargs(hideBin(process.argv))
    .command(
        'list', 
        'Lists the notes', 
        {}, 
        () => {
            listNotes()
        }
    ).argv  

yargs(hideBin(process.argv))
    .command(
        'read', 
        'Reads a note', 
        {
            title:{
                describe:'Enter the note to be read',
                demandOption:true,
                type:'string'
            }
        },
        (argv) => {
            readNote(argv.title)
        }
    ).argv    