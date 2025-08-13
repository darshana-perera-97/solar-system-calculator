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
    

    
    // Preset configurations for quick setup
    presets: {
        '3kw': {
            systemSize: '3',
            monthlyConsumption: 300
        },
        '5kw': {
            systemSize: '5',
            monthlyConsumption: 500
        },
        '6kw': {
            systemSize: '6',
            monthlyConsumption: 600
        },
        '10kw': {
            systemSize: '10',
            monthlyConsumption: 1000
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SOLAR_CONFIG;
} 