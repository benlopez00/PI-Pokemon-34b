import axios from "axios";
const BASE_URL = "http://localhost:3001";

export function fetchPokemons() {
    return async function (dispatch) {
        try {
            const fetchedPokes = await axios(`${BASE_URL}/pokemon`);
            return dispatch({
                type: "GET_POKEMONS",
                payload: fetchedPokes.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function fetchTypes() {
    return async function (dispatch) {
        try {
            const fetchedTypes = await axios(`${BASE_URL}/type`);
            return dispatch({
                type: "GET_TYPES",
                payload: fetchedTypes.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function findByName(name) {
    return async function (dispatch) {
        try {
            const pokeName = await axios(`${BASE_URL}/pokemon?name=${name}`)
            return dispatch({
                type: "FIND_BY_NAME",
                payload: pokeName.data
            })
        } catch (err) {
            console.log({ msg: err.message })
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post(`${BASE_URL}/pokemon/create`, payload);
        return dispatch({
            type: "CREATE_POKEMON",
            response
        })
    }
}

export function fetchDetails(id) {
    return async function (dispatch) {
        const details = await axios(`${BASE_URL}/pokemon/${id}`);
        return dispatch({
            type: "GET_DETAILS",
            payload: details.data
        })
    }
}


export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function filterPokemons(payload) {
    return async function (dispatch) {
        const filters = await axios.get(`${BASE_URL}/pokemon?typeFilter=${payload.typeFilter}&order=${payload.order}`)

        return dispatch({
            type: "FILTERS",
            payload: filters.data
        })
    }
}
