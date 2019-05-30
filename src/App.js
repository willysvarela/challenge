import React, {useState, useEffect} from 'react'
import { Table, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp, faCaretSquareRight, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Rating, { ReactRating } from 'react-rating'

import {
    ComposedChart, Line, Bar, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts'
import data from './demodata'

const styles = {
    container: {
        fontFamily: 'Roboto'
    },
    humidityRow: {

    },
    maxRow: {
        color: '#E86C60'
    },
    minRow: {
        color: '#59EBFF'
    }
}

const getDayWeek = (date) => {
    var day = new Date(date);
    var today = new Date();

    if (today.getDay() === day.getDay()) {
        return 'Hoje';
    } else {
        switch (day.getDay()) {
            case 0: return 'Domingo';
            case 1: return 'Segunda-Feira';
            case 2: return 'Terça-Feira';
            case 3: return 'Quarta-Feira';
            case 4: return 'Quinta-Feira';
            case 5: return 'Sexta-Feira';
            case 6: return 'Sábado';
            default: return 'Not Found';
        }
    }
}
const setChartData = () => {
    var chartData = [];
    for (var i = 0; i < data.days.length - 1; i++) {
        var aux = {
            max: data.points.forecast.temperature_daily_max[i],
            min: data.points.forecast.temperature_daily_min[i],
            humidity: data.points.forecast.rel_humidity_daily_avg[i]
        };
        chartData.push(aux);
    }
    return chartData;
}

const renderHeader = (headerData) => {
    var date = new Date(headerData);
    return (
        <td >{getDayWeek(headerData)}<br />{(date.getDate() + '.'+date.getMonth() + '.' + date.getFullYear())}</td>
    )
}
const renderTemperatureMax = (temperature) => {
    return (
        <td><div  style={{display: 'flex', alignItems: 'flex-end' }}><FontAwesomeIcon icon={faSortUp} /><span style={{marginLeft: '10px'}}>{temperature}</span></div></td>
    )
}
const renderTemperatureMin = (temperature) => {
    return (
        <td><div  style={{display: 'flex', alignItems: 'flex-start' }}><FontAwesomeIcon icon={faSortDown} /><span style={{marginLeft: '10px'}}>{temperature}</span></div></td>
    )
}
const renderHumidityAvg = (humidity) => {
    return (
        <td><Rating emptySymbol={<FontAwesomeIcon icon={faCaretRight} />}
            fullSymbol={<FontAwesomeIcon icon={faCaretSquareRight} />} initialRating={humidity} stop={100} step={20}
            readonly />{humidity}%</td>
    )
}

const App = () => {
    const [longitude, setLongitude] = useState('0');
    const [latitude, setLatitude] = useState('0');


    return (
        <Container style={styles.container}>
            <Table>
                <thead>
                    <tr>
                        {data.days.map(day => renderHeader(day))}
                    </tr>
                </thead>
                <tbody>
                    <tr style={styles.maxRow}>
                        {data.points.forecast.temperature_daily_max.map(day => renderTemperatureMax(day))}
                    </tr>
                    <tr style={styles.minRow}>
                        {data.points.forecast.temperature_daily_min.map(day => renderTemperatureMin(day))}
                    </tr>
                    <tr style={styles.humidityRow}>
                        {data.points.forecast.rel_humidity_daily_avg.map(day => renderHumidityAvg(day))}
                    </tr>
                </tbody>
            </Table>
            <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={setChartData()}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <YAxis />
                        <Line type="monotone" dataKey="max" stroke="#8884d8" />
                        <Line type="monotone" dataKey="min" stroke="#59EBFF" />
                        <Bar barSize={30} dataKey="humidity" fill="#3FA2F7" />
                        {/* <Scatter dataKey="cnt" fill="red" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Container>
    );
}

export default App;