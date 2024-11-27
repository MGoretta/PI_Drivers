import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createDriverRequest } from '../../Redux/Actions/actions';
import {
    validateFields,
    validateDate,
    validateName,
    validateImage,
    validateTeams,
    isDriverExists,
    mayusFirstLetter,
    mayusFirstWord,
    dobFormat
} from './Validations';
import './Create.css';

const Form = () => {
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [nationality, setNationality] = useState("");
    const [image, setImage] = useState("");
    const [dob, setDob] = useState("");
    const [description, setDescription] = useState("");
    const [teams, setTeams] = useState("");
    const [teamsApi, setTeamsApi] = useState("");
    const [forenameError, setForenameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [nationalityError, setNationalityError] = useState("");
    const [imageError, setImageError] = useState("");
    const [dobError, setDobError] = useState("");
    const [teamsError, setTeamsError] = useState("");
    const [fieldsError, setFieldsError] = useState("");
    const navigate = useNavigate();

    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3001/teams')
        .then((response) => response.json())
        .then((data) => {
            const teamNames = data.map((team) => team.name);
            console.log('Teams names:', teamNames);
            setTeamsApi(data)})
        .catch((error) => console.error('Hubo un error al buscar los teams:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrors();

        if(validateForm()){
            const existDriver = await isDriverExists(forename, surname);
            if(existDriver){
                setForenameError('El driver ya existe.');
                return;
            }
            dispatch(
                createDriverRequest({
                    forename,
                    surname,
                    nationality,
                    image,
                    dob,
                    description,
                    teams
                })
            );
            resetForm();
            alert('El driver ha sido creado exitosamente.')
            navigate("/home");
        }
    };

    const resetErrors = () => {
        setForenameError("");
        setSurnameError("");
        setNationalityError(""),
        setImageError("");
        setDobError("");
        setTeamsError("")
    };

    const resetForm = () => {
        setForename("");
        setSurname("");
        setNationality(""),
        setImage("");
        setDob("");
        setDescription("");
        setTeams("")
    };

    const validateForm = () => {
        if(validateFields(
            forename,
            surname,
            nationality,
            image,
            dob,
            description,
            teams
        )){
            setFieldsError('Por favor rellene todos los campos.');
            return false;
        }
        if(!validateDate(dob)){
            setDobError("La fecha de nacimiento debe estar en formato yyyy/mm/dd.");
            return false;
        }
        if(!validateName(forename, surname)){
            setForenameError("El nombre y apellido no deben contener números o carácteres especiales.");
            return false;
        }
        if(!validateImage(image)){
            setImageError("La imagen debe estar en formato JPG o JPEG.");
            return false;
        }
        if(!validateTeams(teams, teamsApi)){
            setTeamsError("Por favor ingrese teams válidos.")
            return false;
        }
        return true;
    };

    const handleChangeForename = (event) => {
        setForename(mayusFirstLetter(event.target.value));
    };

    const handleChangeSurname = (event) => {
        setSurname(mayusFirstLetter(event.target.value));
    };

    const handleChangeNationality = (event) => {
        setNationality(mayusFirstLetter(event.target.value));
    };

    const handleChangeTeams = (event) => {
        setTeams(mayusFirstLetter(event.target.value));
    };

    const handleChangeDescription = (event) => {
        setDescription(mayusFirstWord(event.target.value));
    };

    const handleChangeDOB = (event) => {
        setDob(dobFormat(event.target.value));
    };

    return (
        <main className='form'>
            <form onSubmit={handleSubmit} className='formContainer'>
                <h1 className='formTitle'>Crea un nuevo driver</h1>
                <div className='formContainerTextarea'>
                    <div className='formContainerInput'>
                        <label htmlFor='forename' className='formLabel'>
                            Forename: 
                        </label>
                        <input
                        type='text'
                        id='forename'
                        value={forename}
                        onChange={handleChangeForename}
                        placeholder='Forename'
                        className='formInput'
                        />
                        {forenameError && <div className='formError'>{forenameError}</div>}
                        <label htmlFor='surname' className='formLabel'>
                            Surname:
                        </label>
                        <input
                        type='text'
                        id='surname'
                        value={surname}
                        onChange={handleChangeSurname}
                        placeholder='Surname'
                        className='formInput'
                        />
                        {surnameError && <div className='formError'>{surnameError}</div>}
                        <label htmlFor='teams' className='formLabel'>
                            Teams:
                        </label>
                        <input
                        type='text'
                        id='teams'
                        value={teams}
                        onChange={handleChangeTeams}
                        placeholder='Ingrese los teams (McClaren, Ferrari)'
                        className='formInput'
                        />
                        {teamsError && <div className='formError'>{teamsError}</div>}
                        <label htmlFor='nationality' className='formLabel'>
                            Nationality:
                        </label>
                        <input
                        type='text'
                        id='nationality'
                        value={nationality}
                        onChange={handleChangeNationality}
                        placeholder='Ingrese la nacionalidad'
                        className='formInput'
                        />
                        {nationalityError && <div className='formError'>{nationalityError}</div>}
                        <label htmlFor='dob' className='formLabel'>
                            Dob:
                        </label>
                        <input
                        type='text'
                        id='dob'
                        value={dob}
                        onChange={handleChangeDOB}
                        placeholder='Ingrese la fecha de nacimiento (yyyy/mm/dd)'
                        className='formInput'
                        />
                        {dobError && <div className='formError'>{dobError}</div>}
                        <label htmlFor='image' className='formLabel'>
                            URL de la imagen:
                        </label>
                        <input
                        type='text'
                        id='image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder='Ingrese la URL de la imagen (jpg o jpeg)'
                        className='formInput'
                        />
                        {imageError && <div className='formError'>{imageError}</div>}
                    </div>
                    <div className='formContTextarea'>
                        <label htmlFor='description' className='formLabelText'>
                            Description:
                        </label>
                        <textarea
                        id='description'
                        value={description}
                        onChange={handleChangeDescription}
                        className='formTextarea'
                        maxLength={1500}
                        placeholder='Escriba una descripción.'
                        />
                    </div>
                </div>
                <button type='submit' className='formButton'>
                    Create
                </button>
                <div className='errorContainer'>
                    {" "}
                    {fieldsError && (<div className='formError'>{fieldsError}</div>)}
                    {error && <div className='formError'>{error}</div>}
                </div>
            </form>
        </main>
    );
};

export default Form;