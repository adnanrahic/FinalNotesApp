/**
 * Logic
 */

// 1. napraviti nizove gdje cemo cuvati nase biljeske
// elementi niza ce biti objekti
var notes = [];
var completedNotes = [];
var indexCounter = 1;

// 2. funkcija za dodavanje novih biljeski
function addNote(note) {
    notes.push(note);
}

// 3.funkcija za brisanje biljeske
// prima 2 parametra
// notes parametar je niz objekata npr. [{...}, {...}, {...}, ...]
// id parametar je integer - id označava koji će se note brisati
// for petlja se koristi da se prodje kroz niz objekata i da se 
// nadje tačno koji note se treba obrisati
function deleteNote(notes, id) {
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (note.id === id) {
            return notes.splice(i, 1).pop();
        }
    }
}

// 4. markirati kao gotovo
// deleteNote funkcija ima povratnu vrijednost koja je jednaka objektu koji je izbrisan
// smještamo taj objekat u novu varijablu
// ovu varijablu guramo na novi niz koji se zove completedNotes
function markAsComplete(id) {
    var completed = deleteNote(notes, id);
    completedNotes.push(completed);
    console.log(completedNotes);
}




/**
 * DOM interaction
 */

// dobavljamo ul elemente u koje ćemo smještati naše bilješke
var notesEl = document.getElementById('notes'); 
var completedNotesEl = document.getElementById('completed-notes'); 

// dobavljamo form element i njegova input polja
var form = document.forms['form'];
var title = form.elements.title;
var description = form.elements.description;
var addNoteBtn = form.elements.addNoteBtn;

// Dodajemo slušalac na addNoteBtn koji će uhvatiti vrijednosti iz forme 
// i smjestiti u jedan objekat koji se zove note.
// Pozivamo funkciju addNote sa navedenim note objektom koji smo kreirali.
// Pozivamo appendNotes funkciju koja će popuniti DOM.
// Nakon interakcije sa DOMom želimo da ispraznimo input polja.
addNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var note = {
        id: indexCounter,
        title: title.value,
        description: description.value
    }
    ++indexCounter;
    addNote(note);
    appendNotes();
    title.value = '';
    description.value = '';
});


// Funkcija za punjenje ul elementa sa IDem 'notes'
function appendNotes() {
    // Želimo svaki put prilikom pozivanja ove funkcije da ispraznimo ul element notes.
    notesEl.innerHTML = '';

    // Koristimo forEach petlju da prodjemo kroz svaki note objekat u notes nizu
    // jer ćemo istu akciju vršiti nad svakim od njih.
    notes.forEach(function(note) {
        // Kreiramo li element u koji ćemo smjestiti sve podatke našeg note objekta.
        var noteEl = document.createElement('li');

        // Kreiramo h5 element koji će biti title našeg note-a.
        var titleEl = document.createElement('h5');
        titleEl.innerText = note.title;
        noteEl.appendChild(titleEl);

        // Kreiramo p element koji će biti description našeg note-a.        
        var descriptionEl = document.createElement('p');
        descriptionEl.innerText = note.description;
        noteEl.appendChild(descriptionEl);

        // Kreiramo button koji će služiti da brisanje note-ova.
        var deleteNoteBtn = document.createElement('button');
        deleteNoteBtn.innerText = 'Delete';
        // Dodajemo slušalac koji će izvršiti dvije funkcije kada se klikne deleteNoteBtn
        // deleteNote funkcija će izbrisati note sa datim id-em iz niza notes koji mu prosljedjujemo
        // Pozivamo appendNotes odmah ispod da bi se promjena ispisala na DOM
        deleteNoteBtn.addEventListener('click', function (e) {
            deleteNote(notes, note.id);
            appendNotes();
        });
        noteEl.appendChild(deleteNoteBtn);
        
        // Kreiramo button koji će služiti da markiranje note-ova kao gotovi.
        var markNoteAsCompleteBtn = document.createElement('button');
        markNoteAsCompleteBtn.innerText = 'Complete';
        // Dodajemo slušalac koji će izvršiti tri funkcije kada se klikne markNoteAsCompleteBtn
        // markAsComplete funkcija će izbrisati note sa datim id-em iz niza notes 
        // i taj note prebaciti u niz completedNotes.
        // Pozivamo appendNotes odmah ispod da bi se promjena ispisala na DOM
        // Pozivamo appendCompletedNotes odmah ispod da bi se promjena ispisala na DOM
        markNoteAsCompleteBtn.addEventListener('click', function (e) {
            markAsComplete(note.id);
            appendNotes();
            appendCompletedNotes();
        });
        noteEl.appendChild(markNoteAsCompleteBtn);

        // Kačimo naš li element na vanjski ul element
        notesEl.appendChild(noteEl);
    });
}

function appendCompletedNotes() {
    
    // Želimo svaki put prilikom pozivanja ove funkcije da ispraznimo ul element notes.    
    completedNotesEl.innerHTML = '';

    // Koristimo forEach petlju da prodjemo kroz svaki note objekat u completedNotes nizu
    // jer ćemo istu akciju vršiti nad svakim od njih.
    completedNotes.forEach(function(note) {
        // Kreiramo li element u koji ćemo smjestiti sve podatke našeg note objekta.        
        var noteEl = document.createElement('li');

        // Kreiramo h5 element koji će biti title našeg note-a.
        var titleEl = document.createElement('h5');
        titleEl.innerText = note.title;
        noteEl.appendChild(titleEl);

        // Kreiramo p element koji će biti description našeg note-a.        
        var descriptionEl = document.createElement('p');
        descriptionEl.innerText = note.description;
        noteEl.appendChild(descriptionEl);

        // Kreiramo button koji će služiti da brisanje note-ova.
        var deleteNoteBtn = document.createElement('button');
        deleteNoteBtn.innerText = 'Delete';
        // Dodajemo slušalac koji će izvršiti dvije funkcije kada se klikne deleteNoteBtn
        // deleteNote funkcija će izbrisati note sa datim id-em iz niza notes koji mu prosljedjujemo
        // Pozivamo appendNotes odmah ispod da bi se promjena ispisala na DOM
        deleteNoteBtn.addEventListener('click', function (e) {
            deleteNote(completedNotes, note.id);
            appendCompletedNotes();
        });
        noteEl.appendChild(deleteNoteBtn);

        // Kačimo naš li element na vanjski ul element
        completedNotesEl.appendChild(noteEl);
    });
}