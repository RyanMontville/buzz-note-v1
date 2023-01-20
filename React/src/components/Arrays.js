const weatherConditions = [
    {label: '', value: ''},
    {label: 'Clear Sky', value: 'Clear Sky'},
    {label: 'Partly Cloudy', value: 'Partly Cloudy'},
    {label: 'Overcast', value: 'Overcast'},
    {label: 'Fog', value: 'Fog'},
    {label: 'Drizzle', value: 'Drizzle'},
    {label: 'Rain', value: 'Rain'},
    {label: 'Freezing Rain', value: 'Freezing Rain'},
    {label: 'Snow', value: 'Snow'},
    {label: 'Thunderstorm', value: 'Thunderstorm'},
    {label: 'Other', value: 'Unknown'}
]

const broodsArray = [
    {name: "Eggs",value: 0},
    {name: "Larvae",value: 1},
    {name: "Pupae", value: 2},
    {name: "None", value: 3}
];

const cellsArray = [
    {name: "Queen",value: 0},
    {name: "Super",value: 1},
    {name: "None", value: 2}
];

export {
    weatherConditions, broodsArray, cellsArray
}