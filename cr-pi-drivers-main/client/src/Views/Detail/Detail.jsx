import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverById } from '../../Redux/Actions/actions';
import './Detail.css';

const Details = () => {
    const { id } = useParams();
    const driver = useSelector((state) => state.driver);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDriverById(id));
    }, [id, dispatch]);

    if(loading){
        return(
            <main className="detail">
                <img
                className="detailCarga"
                src="/assets/logo-F1.png"
                alt="Cargando..."
                />
            </main>
        );
    }

    if(error){
        return(
            <main className="detail">
                <p>Error: {error}</p>
            </main>
        );
    }

    return(
        <main className="detail">
            <section className="detailSection">
                <div className="detailInfImg">
                    <div className="detailConatiner">
                        <div className="detailContainerName">
                            <h3 className="detailName">
                                Nombre: {driver?.name?.forename || driver?.forename}
                            </h3>
                            <h3 className="detailName">
                                Apellido: {driver?.name?.surname || driver?.surname}
                            </h3>
                        </div>
                        <p className="detailInf">
                            Teams: {" "}
                            {Array.isArray(driver?.Teams)
                                ? driver?.Teams.map((team) => team.name).join(", ")
                                : driver?.teams}
                        </p>
                        <p className="detailInf">Nationality: {driver?.nationality}</p>
                        <p className="detailInf">Dob: {driver?.dob}</p>
                        <p className="detailInf">Id: {driver?.id}</p>
                    </div>
                    <div className="contImg">
                        <img
                        className="detailImg detail-img"
                        src={driver?.image?.url || driver?.image}
                        alt={`${driver?.name?.forename} ${driver?.name?.surname}`}
                        />
                    </div>
                </div>
                {driver?.description && (
                    <p className="detailDescription">Description: {driver?.description}</p>
                )}
            </section>
        </main>
    );
};

export default Details;