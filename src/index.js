import { createNote } from "./notes"
import { setFilters} from "./filters"
import {renderNotes}from "./views"

renderNotes()

document.querySelector('#create-notes').addEventListener('click',function(e){ //querySelector透過id來區別不同的button或class
    const id=createNote()
    location.assign(`./edit.html#${id}`) 
    //讓create note button 可以連結至另一個頁面(edit.html)
    //添加#可以讓每個url有不同的hash，透過與id連結，可以讓每個新create的note連結至不同頁面
    //alert('click') //產生彈出視窗
})

document.querySelector('#search-text').addEventListener('input',function(e){
    setFilters({
        searchText:e.target.value
    })
    renderNotes()
}) 

document.querySelector('#filter-by').addEventListener('change',function(e){
    setFilters({
        sortBy:e.target.value
    })
    renderNotes()
})

//解決主頁與note 編輯頁面不同步
window.addEventListener('storage',function(e){
    if(e.key==='notes'){
        renderNotes()
    }
})