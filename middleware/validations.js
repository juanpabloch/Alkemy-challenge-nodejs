const isNumber = (req, res, next)=>{
    try {
        const {id} = req.params;
        if(!Number(id))throw new Error("id not valid");
        next();
    } catch (error) {
        next(error);
    }
}

const genderBody = (req, res, next)=>{
    try {
        const {name} = req.body
        if(!name.trim())throw new Error("Name require")
        if(!/^[a-z ]+$/gi.test(name))throw new Error("Not symbols or numbers allow")
        next()
    } catch (error) {
        next(error)
    }
}

const genderUpdateBody = (req, res, next)=>{
    try {
        const {name} = req.body
        if(name){
            if(!name.trim())throw new Error("Name require")
            if(!/^[a-z ]+$/gi.test(name))throw new Error("Not symbols or numbers allow")
        }     
        next()
    } catch (error) {
        next(error)
    }
}

const moviesBody = (req, res, next)=>{
    try {
        const {title, date, rate} = req.body
        //title
        if(!title.trim())throw new Error("Title require")
        if(!/^[a-z0-9 ]+$/gi.test(title))throw new Error("Not symbols or numbers allow")
        //date
        if(!date.trim())throw new Error("Date require")
        //rate
        if(!Number(rate))throw new Error("Rate must be a number");
        next()
    } catch (error) {
        next(error)
    }
}

const moviesUpdateBody = (req, res, next)=>{
    try {
        const {title, date, rate} = req.body
        //title
        if(title){
            if(!title.trim())throw new Error("Title require")
            if(!/^[a-z0-9 ]+$/gi.test(title))throw new Error("Not symbols or numbers allow")
        }
        
        //date
        if(date){
            if(!date.trim())throw new Error("Date require")
        }
        //rate
        if(rate){
            if(!Number(rate))throw new Error("Rate must be a number");
        }
        next()
    } catch (error) {
        next(error)
    }
}

const charactersBody = (req, res, next)=>{
    try {
        const {name, age, weight, history} = req.body
        //name
        if(!name.trim())throw new Error("Name require")
        if(!/^[a-z ]+$/gi.test(name))throw new Error("Not symbols allow")
        //age
        if(!Number(age))throw new Error("Age must be a number");
        //weight
        if(!Number(weight))throw new Error("Weight must be a number");
        //history
        if(!history.trim())throw new Error("History require")
        next()
    } catch (error) {
        next(error)
    }
}
const charactersUpdateBody = (req, res, next)=>{
    try {
        const {name, age, weight, history} = req.body
        //name
        if(name){
            if(!name.trim())throw new Error("Name require")
            if(!/^[a-z ]+$/gi.test(name))throw new Error("Not symbols allow")
        }
        
        //age
        if(age){
            if(!Number(age))throw new Error("Age must be a number");
        }

        //weight
        if(weight){
            if(!Number(weight))throw new Error("Weight must be a number");
        }
        //history
        if(history){
            if(!history.trim())throw new Error("History require")
        }
        next()
    } catch (error) {
        next(error)
    }
}


const charactersPost = [charactersBody]
const charactersUpdate = [isNumber, charactersUpdateBody]
const moviesPost = [moviesBody]
const moviesUpdate = [isNumber, moviesUpdateBody]
const genderPost = [genderBody]
const genderUpdate = [isNumber, genderUpdateBody]
const getByID = [isNumber]


module.exports = {
    charactersPost,
    charactersUpdate,
    moviesPost,
    moviesUpdate,
    genderPost,
    genderUpdate,
    getByID
}