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
        const {nombre} = req.body
        if(!nombre.trim())throw new Error("Name require")
        if(!/^[a-z ]+$/gi.test(nombre))throw new Error("Not symbols or numbers allow")
        next()
    } catch (error) {
        next(error)
    }
}

const moviesBody = (req, res, next)=>{
    try {
        const {titulo, fecha, calificacion} = req.body
        //titulo
        if(!titulo.trim())throw new Error("Title require")
        if(!/^[a-z0-9 ]+$/gi.test(titulo))throw new Error("Not symbols or numbers allow")
        //fecha
        if(!fecha.trim())throw new Error("Date require")
        //calificacion
        if(!Number(calificacion))throw new Error("Rate must be a number");
        next()
    } catch (error) {
        next(error)
    }
}

const charactersBody = (req, res, next)=>{
    try {
        const {nombre, edad, peso, historia} = req.body
        //nombre
        if(!nombre.trim())throw new Error("Name require")
        if(!/^[a-z ]+$/gi.test(nombre))throw new Error("Not symbols allow")
        //edad
        if(!Number(edad))throw new Error("Age must be a number");
        //peso
        if(!Number(peso))throw new Error("Weight must be a number");
        //historia
        if(!historia.trim())throw new Error("History require")
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    isNumber,
    genderBody,
    moviesBody,
    charactersBody
}