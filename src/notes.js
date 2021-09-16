import uuidv4 from 'uuid/dist/v4'
import moment from 'moment'
let notes=[]

//read existing notes from localStorage
const loadNotes=()=>{
    const notesJSON=localStorage.getItem('notes')
    try{
        return notesJSON? JSON.parse(notesJSON):[]
    }catch(e){
        return []
    }
    
}

//save notes to localstorage
const saveNotes=()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

//Export notes from module
const getNotes=()=>notes

const createNote=()=>{
    const id=uuidv4()
    const timeStemp=moment().valueOf() //set up create time
    notes.push({
        id:id, //呼叫third party library中函數，給予每個note特定id
        title:'',
        body:'',
        createAt:timeStemp,
        updateAt:timeStemp
    })
    saveNotes()
    return id
}

//remove a note from the list
const removeNote=(id)=>{
    const noteIndex=notes.findIndex((note)=>note.id===id)
    if(noteIndex>-1){
        notes.splice(noteIndex,1)
        saveNotes()
    }
}

//sort your note by 0ne of three ways
const sortNotes=(sortBy)=>{
    if(sortBy==='byEdited'){
        return notes.sort((a,b)=>{
            if(a.updateAt>b.updateAt){
                return -1 
            }else if(a.updateAt<b.updateAt){
                return 1
            }else{
                return 0 //a=b
            }                
        })
    }else if(sortBy==='byCreated'){
        return notes.sort((a,b)=>{
            if(a.createAt>b.createAt){
                return -1 
            }else if(a.createAt<b.createAt){
                return 1
            }else{
                return 0 
            }
    })
    }else if(sortBy==='byAlphabetically'){
        return notes.sort((a,b)=>{
            if(a.title.toLowerCase()<b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase()>b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return notes
    }
    
}

const updateNote=(id,updates)=>{
    const note=notes.find((note)=>note.id===id)

    if(!note){
        return
    }
    if(typeof updates.title==='string'){
        note.title=updates.title
        note.updateAt=moment().valueOf()
    }
    if(typeof updates.body==='string'){
        note.body=updates.body
        note.updateAt=moment().valueOf()
    }
    saveNotes()
    return note
}

notes=loadNotes()
export{getNotes,createNote,removeNote,sortNotes,updateNote}