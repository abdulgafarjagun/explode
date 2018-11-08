class Acronym {
    constructor(acronym, meaning, description, pioneer, date){
    this.acronym = typeof(acronym) == 'string' && acronym.trim().length > 0 ? acronym.trim() : false;
    this.meaning = typeof(meaning) == 'string' && meaning.trim().length > 0 ? meaning.trim() : false;
    this.description = typeof(description) == 'string' && description.trim().length > 0 ? description.trim() : false;
    this.pioneer = typeof(pioneer) == 'string' && pioneer.trim().length > 0 ? pioneer.trim() : false;
    this.date = typeof(date) == 'string' && date.trim().length > 0 ? date.trim() : false;  
    }
    
    get isValid(){
        return this.acronym && this.meaning && this.description && this.pioneer && this.date;
    }
}
//new Date().toLocaleDateString()

//export the acronym model
module.exports = Acronym;