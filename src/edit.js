import { initializeEditPage,generateLastEdited } from "./views"
import { updateNote,removeNote } from "./notes"


const titleElement=document.querySelector('#note-title')
const bodyElement=document.querySelector('#note-body')
const removeElement=document.querySelector('#remove-note')
const dateElement=document.querySelector('#last-edit')
//substring可讀取id，數字代表從哪個字開始，因為location.hash開頭為#，所以此處希望從1開始而非0
const noteId=location.hash.substring(1)

initializeEditPage(noteId)

//1.set up a input even for title
titleElement.addEventListener('input',function(e){
    const note=updateNote(noteId,{
        title:e.target.value
    })
    dateElement.textContent=generateLastEdited(note.updateAt) //set up the last edited messaage
})
bodyElement.addEventListener('input',(e)=>{
    const note=updateNote(noteId,{
        body:e.target.value
    })
    dateElement.textContent=generateLastEdited(note.updateAt) //set up the last edited messaage
})
removeElement.addEventListener('click',()=>{
    removeNote(noteId)
    location.assign('./index.html')
})

//解決同url網頁不同步
window.addEventListener('storage',(e)=>{
    if (e.key==='notes'){
        initializeEditPage(noteId)
    }
})
