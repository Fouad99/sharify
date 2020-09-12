import React, { useState } from 'react';

import './PlaceItem.css';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteHandler = () => {
        setShowDeleteModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowDeleteModal(false);
    };

    const confirmDeleteHandler = () => {
        setShowDeleteModal(false);

        console.log("Delete done");
    };


    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contenClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >

                <div className="map-container">
                    <Map center={props.coordinates} zoom={15} />
                </div>
            </Modal>
            <Modal
                show={showDeleteModal}
                onCancel={cancelDeleteHandler}
                header="Delete Item"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
                    </React.Fragment>
                }

            >
                <p>Do you really want to delete the post ?</p>
            </Modal>
            <li className="place-item">
                <Card>
                    <div className="place-item__image">
                        <img src={props.image}
                            alt={props.title}
                        />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler} >ViEW ON MAP</Button>
                        <Button to={`/places/${props.id}`} >EDIT</Button>
                        <Button danger onClick={showDeleteHandler}>DELETE</Button>
                    </div>
                </Card>
            </li >
        </React.Fragment>
    );
};

export default PlaceItem;
