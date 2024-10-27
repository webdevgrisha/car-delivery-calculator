const tableMention = [
    {
        id: 'shiping_cost_to_a_us_port',
        display: '$shiping_cost_to_a_us_port(#auction, #location, #carSize)',
    },
    {
        id: 'delivery_by_ship',
        display: '$delivery_by_ship(#location, Rotterdam, #carSize)',
    },
];

const variableMention = [
    {
        id: '#auction',
        display: '#auction',
    },
    {
        id: '#carPrice',
        display: '#carPrice',
    },
    {
        id: '#engine_size',
        display: '#engine_size',
    },
    {
        id: '#location',
        display: '#location',
    },
    {
        id: '#customsCosts',
        display: '#customsCosts',
    },
    {
        id: '#repairCosts',
        display: '#repairCosts',
    },
];


export {
    tableMention,
    variableMention
}