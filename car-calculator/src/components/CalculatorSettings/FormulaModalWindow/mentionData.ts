const tableMention = [
    {
        id: 'delivery_by_ship',
        display: '$delivery_by_ship($get_port_name(#location, #carSize), Rotterdam, #carSize)',
    },
    {
        id: 'shipping_cost_to_a_US_port',
        display: '$shipping_cost_to_a_US_port(#location, #carSize)',
    },
    {
        id: 'calc_auction_fee',
        display: '$calc_auction_fee(#auction, #carPrice)',
    },
    {
        id: 'excise_taxes',
        display: '$excise_taxes(#engineSize)',
    },
    {
        id: 'clo_taxes',
        display: '$clo_taxes(#carSize)',
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
        id: '#engineSize',
        display: '#engineSize',
    },
    {
        id: '#degreeOfDamage',
        display: '#degreeOfDamage',
    },
    {
        id: '#costInPL',
        display: '#costInPL',
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
    {
        id: '#carSize',
        display: '#carSize',
    },
];


export {
    tableMention,
    variableMention
}