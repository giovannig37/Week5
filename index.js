var note_created = 0;
var notes_list = null;

class Note {
    constructor(name) {
        this.name = name;
        this.div = document.createElement('div');

        // set attributes of note DOM element
        this.div.setAttribute("name", `${this.name}_div`);
        this.div.className = "center-align row";
        this.div.innerHTML =
            `<div class="container white btn" style="height: 100%;"> 
                <p name="${this.name}_text" class="left-align black-text col s11" style="text-transform: none; font-size: large;"></p> 
                <div class="col s1"> 
                    <a class="btn-floating waves-effect waves-gray white" style="margin-top: 15px;" type="button" onclick="removeNote('${this.name}');"> 
                        <i class="material-icons grey-text" style="font-size: 30px;">delete</i> 
                    </a> 
                </div> 
            </div>`;
    }
}

class NotesList {
    constructor() {
        this.notes = [];
        this.notes_list_div = document.getElementsByName('notes_list_div')[0];
    }

    addNote(text) {
        var name = note_created;
        var note = new Note(name, text);

        this.notes_list_div.appendChild(note.div)

        var note_text = document.getElementsByName(`${name}_text`)[0];
        note_text.innerText = text;

        this.notes.push(note);
        note_created++;
    }

    removeNote(name) {
        var note;
        
        // find note to remove from notes_list notes array
        for(var i = 0; i < this.notes.length; i++){
            note = this.notes[i];
            if(note.name === name){
                break;
            }
        }
        
        // remove element from DOM
        var note_div = document.getElementsByName(`${name}_div`)[0];
        note_div.remove();

        // then remove from notes_list notes array
        this.notes.splice(i, 1);
    }
}

function addNewNote() {
    console.log('addNewNote() called');

    var textarea = document.getElementsByName("new_note_textarea")[0];
    var note_text = textarea.value;

    if(note_text.length===0){
        console.log('no text entered, not adding note to list');
        return;
    }
    textarea.value = "";

    var input = document.getElementsByName("new_note_label")[0];
    input.classList.remove('active');

    if (notes_list === null)
        notes_list = new NotesList();

    notes_list.addNote(note_text);

    console.log('Added new note: "' + textarea.value + '"');
}

function removeNote(name) {
    console.log('removeNote() called on note with name "' + name + '"');

    notes_list.removeNote(name);
}
