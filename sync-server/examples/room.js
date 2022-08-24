import Joi from 'joi'

class Room {
    $schema = {
        count: {
            a: {
                $validate: Joi.number().max(2) 
            }
        }
    }
    $actions = {
        increment: true
    }

    count = {
        a: 0
    }
    i = 0

    increment() {
        this.i++
       this.count = {
            a: this.i  
       }
    }
}
    
export default Room