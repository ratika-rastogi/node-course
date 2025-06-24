import chalk from 'chalk'
import {addNote,getNotes, removeNote} from './notes.js'
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

yargs(hideBin(process.argv)).command('list', 'Lists the notes', {}, () => {
   console.log("hiiii list the notes")
  }).argv  

yargs(hideBin(process.argv)).command('read', 'Reads a note', {}, () => {
   console.log("hiiii note is read")
  }).argv    