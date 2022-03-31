require('dotenv').config();


const applianceData = [];
applianceData['pooja'] = {
    gstNumber: process.env.POOJA_GST_NUMBER,
    name: 'Pooja Appliances',
    distributor: 'Green Label LPG Stove, Padamshree, Suraksha Hose and Apron, Cylinder Trolly, Lighter',
    address: 'SHOP NO.8, SECTOR-10A, HOUSING BOARD COLONY, GURUGRAM-122001',
    tel: '9891430101, 9718160101',
    email: 'pooja_appliances@yahoo.com',
    bankDetails: 'STATE BANK OF INDIA, Shivaji Nagar, Gurgaon',
    accountNumber : process.env.POOJA_ACCOUNT_NUMBER,
    IFSCCode: process.env.POOJA_IFSC_CODE,
}
applianceData['creative'] = {
    gstNumber: process.env.CREATIVE_GST_NUMBER,
    name: 'Creative Appliances',
    distributor: 'Green Label LPG Stove, Suraksha Hose for Haryana',
    address: 'SHOP NO.8, SECTOR-10A, 1st Floor, HOUSING BOARD COLONY, GURUGRAM-122001',
    tel: '9891430101, 9718160101',
    email: 'creative.appliances@yahoo.in',
    bankDetails: 'STATE BANK OF INDIA, Shivaji Nagar, Gurgaon',
    accountNumber : process.env.CREATIVE_ACCOUNT_NUMBER,
    IFSCCode: process.env.CREATIVE_IFSC_CODE,
}

module.exports = applianceData;