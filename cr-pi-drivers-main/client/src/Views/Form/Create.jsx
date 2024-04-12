import React, { useState } from "react";

const Create = () => {

    const [input, setInput] = useState({
        name: "",
        lastname: "",
        nationality: "",
        image: "",
        dot: "",
        description: "",
        teams: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        lastname: "",
        nationality: "",
        image: "",
        dot: "",
        description: "",
        teams: ""
    })

    function validate(input) {
        if (input=== "") {
            setErrors ({...errors,name: "el campo no puede estar vacío"})
            return;
        }
        setErrors ({...errors,name: ""})
    }

    function handleChange (e) {
        setInput( {
            ...input,
            [e.target.value]:e.target.value
        })

    validate ({
        ...input,
        [e.target.name]:e.target.value
    })
    }

    return(
        <div>Create
            <form onSubmit={""}>
            <div>
                <label> Name </label>
                <input name= "name" value={input.value} onChange={handleChange}/>
                <span>{error.name}</span>
            </div>
            <div>
                <label> Lastname </label>
                <input name= "lastname" value={input.value} onChange={handleChange}/>
            </div>
            <div>
                <label> Nacionality </label>
                <input name= "email" value={input.value} onChange={handleChange}/>
            </div>
            <div>
                <label> Image </label>
                <input name= "image" value={input.value} onChange={handleChange}/>
            </div>
            <div>
                <label> DOT </label>
                <input name= "dot" value={input.value} onChange={handleChange}/>
            </div>
            <div>
                <label> Description </label>
                <input name= "description" value={input.value} onChange={handleChange}/>
            </div>
            <div>
                <label> Teams </label>
                <input name= "teams" value={input.value} onChange={handleChange}/>
            </div>
            </form>
        </div>
    )
}

export default Create;