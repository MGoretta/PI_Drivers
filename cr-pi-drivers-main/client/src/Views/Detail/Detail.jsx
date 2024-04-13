import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Detail.css";
import { fetchDriverById } from "../../Redux/Actions/actions";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const driver = useSelector((state) => state.driver)

    useEffect(() => {
        dispatch(fetchDriverById(id));
      }, [id, dispatch]);

    return(
        <div>
            <p>Esto es Detail</p>
            <h3>Name: {driver?.name?.forename || driver?.name}</h3>
            <h3>Lastname: {driver?.name?.surname || driver?.lastname}</h3>
            <p>
              Teams:{" "}
              {Array.isArray(driver?.Teams)
                ? driver?.Teams.map((team) => team.name).join(", ")
                : driver?.teams}
            </p>
            <p>Nationality: {driver?.nationality}</p>
            <p>DOB: {driver?.dob}</p>
            <p>Id: {driver?.id}</p>
            <img
              src={driver?.image?.url || driver?.image}
              alt={`${driver?.name?.forename} ${driver?.name?.surname}`}
            />
            <p className="detailDescrip">Description: {driver?.description}</p>
        </div>
    )
}

export default Detail;