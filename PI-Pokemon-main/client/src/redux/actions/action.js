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