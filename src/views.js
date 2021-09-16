import moment from "moment"
import {getFilters} from './filters'
import {sortNotes,getNotes} from "./notes"
//generate the DOM structure for a note
const generateNoteDOM=(note)=>{
    const noteEl=document.createElement('a')
    const textEl=document.createElement('p')
    const statusEl=document.createElement('p')
    
    //set up note title text
    if(note.title.length > 0){
        textEl.textContent=note.title
    }else{
        textEl.textContent='Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // set up the link
    noteEl.setAttribute('href',`./edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    // set up the status message
    statusEl.textContent=generateLastEdited(note.updateAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

//render application notes
const renderNotes=()=>{
    const notesEl=document.querySelector('#notes')
    const filters=getFilters()
    const notes=sortNotes(filters.sortBy)
    const filteredNotes=notes.filter((note)=>note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML=''//to clear notes

    if(filteredNotes.length>0){
        filteredNotes.forEach((note)=>{
            const noteEl=generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage=document.createElement('p')
        emptyMessage.textContent='No notes to show'
        emptyMessage.classList.add('empty-message') //從js添加class
        notesEl.appendChild(emptyMessage)
    }    
}

const initializeEditPage=(noteId)=>{
    const titleElement=document.querySelector('#note-title')
    const bodyElement=document.querySelector('#note-body')
    const dateElement=document.querySelector('#last-edit')
    const notes=getNotes()
    //當note id與noteId有對上，則停留在edit網頁；若對不上，重新導回index頁面
    const note=notes.find((note)=>note.id === noteId)
    if (!note){
        location.assign('./index.html')
    }
    titleElement.value=note.title
    bodyElement.value=note.body
    dateElement.textContent=generateLastEdited(note.updateAt)
}

//generate the last edited messaage
const generateLastEdited=(timeStemp)=>`Last edited ${moment(timeStemp).fromNow()}`

export{ generateNoteDOM,renderNotes,generateLastEdited,initializeEditPage}