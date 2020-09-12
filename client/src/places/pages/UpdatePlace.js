import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';
const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Monument Makam Echahid ',
        description: 'One of the most iconic monument of Algeria which marks the French Kick out which was the most Epic kick out in modern history',
        imageUrl: 'https://i.pinimg.com/originals/fa/45/75/fa45752d307e897908135ad4e8dd7704.jpg',
        address: 'Chemin Omar Kechkar, Algiers, Algérie',
        location: {
            lat: 36.7456417,
            lng: 3.0675888
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Madame Afrique',
        description: 'One of the hidden GEm of Algiers.',
        imageUrl: 'https://www.podcastjournal.net/photo/art/grande/10446444-17127965.jpg?v=1477495678',
        address: 'Chemin El biar, Algiers, Algérie',
        location: {
            lat: 32.7456417,
            lng: 3.0675888
        },
        creator: 'u2'
    }
]

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;


    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: true
        },
        description: {
            value: '',
            isValid: true
        }
    },
        false
    );

    const foundPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (foundPlace) {
            setFormData(
                {
                    title: {
                        value: foundPlace.title,
                        isValid: true
                    },
                    description: {
                        value: foundPlace.description,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, foundPlace]);


    if (!foundPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid title"
                onInput={inputHandler}
                initValue={formState.inputs.title.value}
                initValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (min 5 chars)"
                onInput={() => { }}
                initValue={formState.inputs.description.value}
                initValid={formState.inputs.description.isValid}
            />

            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default UpdatePlace;