import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"


export default function MovieSchedulePage({ SetSelectedTime, setPage }) {
    const { idFilme } = useParams()

    const [schedule, setSchedule] = useState([])
    const [filme, setFilme] = useState([])




    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
        promise.then(resp => setFilme(resp.data))
        promise.then(resp => setSchedule(resp.data.days))
        promise.catch((err) => console.log(err.response.data))
    }, [])


   
    function selectTime(time, hour, id) {
        const times = { day: time.weekday, time: hour }
        console.log(id)
        SetSelectedTime(times)
        setPage("/assentos")
    }

    console.log(filme)


    return (
        <>
            {(schedule).map((days) =>
                <MovieDays>
                    <h1>{days.weekday} - {days.date}</h1>

                    <MovieTimes>
                        <StyledLink to={`/assentos/${days.showtimes[0].id}`}>
                            <button onClick={() => selectTime(days, "15:00")}>{days.showtimes[0].name}</button>
                        </StyledLink>
                        <StyledLink to={`/assentos/${days.showtimes[1].id}`}>
                            <button onClick={() => selectTime(days, "19:00")}>{days.showtimes[1].name}</button>
                        </StyledLink>
                    </MovieTimes>
                </MovieDays>
            )
            }
            <Poster>
                <div>
                    <img src={filme.posterURL} />
                </div>
                <div>
                    <h1>{filme.title}</h1>
                </div>
            </Poster>



        </>

    )
}

const MovieDays = styled.div`
    margin-left: 24px;
    
    
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #293845;
        text-decoration: none;
    }
`

const MovieTimes = styled.div`
    display: flex;
    gap: 10px;
    margin: 15px 0 15px 0;
    button {
        width: 83px;
        height: 43px;
        background: #E8833A;
        border-radius: 3px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        border-style: none;
        color: #FFFFFF;
        text-decoration: none;
        cursor: pointer;
    

    }
`

const StyledLink = styled(Link)`
    text-decoration:none;
`

const Poster = styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background: #DFE6ED;
    border-top: 1px solid #9EADBA;
    gap: 10px;
        div:first-of-type {
            width: 64px;
            height: 89px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
        }
        img {
            width: 48px;
            height: 72px;
        }
        h1, h2{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 26px       
        }
        h1 {
            margin-bottom: 5px;
        }
       
`