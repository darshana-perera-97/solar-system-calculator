// Solar System Configuration for Sri Lanka
const SOLAR_CONFIG = {
    // System pricing in Lakhs (1 Lakh = 100,000 LKR)
    systemPricing: {
        '3': 600000,    // 6 Lakhs
        '5': 800000,    // 8 Lakhs
        '6': 900000,    // 9 Lakhs
        '10': 1200000   // 12 Lakhs
    },
    
    // Electricity and feed-in tariffs
    tariffs: {
        electricityTariff: 27.50,    // LKR/kWh (hidden from UI but used in calculations)
        feedInTariff: 27.06         // LKR/kWh
    },
    
    // System performance defaults
    performance: {
        monthlyGenerationPerKW: 130,  // kWh per kW per month
        systemLosses: 12,             // Percentage
        maintenanceCost: 5000,        // LKR per year
        tariffIncrease: 5             // Percentage per year
    },
    
    // Preset configurations
    presets: {
        '3kw': {
            systemSize: '3',
            installationCost: 600000,
            monthlyConsumption: 300,
            description: 'Small Home'
        },
        '5kw': {
            systemSize: '5',
            installationCost: 800000,
            monthlyConsumption: 500,
            description: 'Medium Home'
        },
        '6kw': {
            systemSize: '6',
            installationCost: 900000,
            monthlyConsumption: 600,
            description: 'Large Home'
        },
        '10kw': {
            systemSize: '10',
            installationCost: 1200000,
            monthlyConsumption: 1000,
            description: 'Very Large Home'
        },
        'commercial': {
            systemSize: '20',
            installationCost: 2400000,
            monthlyConsumption: 2000,
            description: 'Business Setup'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SOLAR_CONFIG;
} 