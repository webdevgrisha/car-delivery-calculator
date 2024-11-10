const tableMention = [
    {
        id: 'shipping_cost_to_a_US_port',
        display: '$shipping_cost_to_a_US_port(#auction, #location, #carSize)',
    },
    {
        id: 'delivery_by_ship',
        display: '$delivery_by_ship($get_port_name(#auction, #location, #carSize), Rotterdam, #carSize)',
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