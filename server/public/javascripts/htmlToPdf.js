

module.exports = ({ gstNumber, name, distributor, address, tel, email, bankDetails, accountNumber, IFSCCode, invoiceNumber, date, discount, billingUser, shippingUser, items, placeOfSupply, transportation, vehicleNumber, reverseChanges, insurance, packaging }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
        <style>
            html {
                height: 0;
            }
    
            body {
                height: 0;
                margin: 0;
            }
    
            #invoice {
                padding: 0px 0px;
            }
    
            .invoice {
                position: relative;
                background-color: #FFF;
                min-height: 680px;
                padding: 15px
            }
    
            .invoice header {
                padding: 10px 0;
                margin-bottom: 20px;
            }
    
            .invoice table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }
    
            .gst>.number {
                font-weight: bold;
            }
    
            .underline {
                text-decoration: underline;
            }
    
            .myRow {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            }
    
            .myCol {
                -webkit-box-flex: 1;
                -ms-flex: 1 0 0%;
                flex: 1 0 0%;
            }
    
            .header-width {
                width: 98%;
                margin: auto;
            }
    
            .myCol-7 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 58.33333333%;
            }
    
            .myCol-3 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 25%;
            }
    
            .myCol-2 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 16.66666667%;
            }
    
            .myCol-5 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 41.66666667%;
            }
    
            .myCol-60 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 60%;
            }
    
            .myCol-40 {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: 40%;
            }
    
            .myFlex {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            }
    
            td {
                border: 1px solid black;
            }
    
            th {
                border: 1px solid black;
            }
    
            td>h6 {
                width: 95%;
                margin: auto;
            }
    
            @media print {
                .invoice {
                    font-size: 11px !important;
                    overflow: hidden !important
                }
    
                .invoice footer {
                    position: absolute;
                    bottom: 10px;
                    page-break-after: always
                }
    
                .invoice>div:last-child {
                    page-break-before: always
                }
            }
        </style>
    
    </head>
    
    <body>
        <div id="invoice">
            <div class="invoice overflow-auto">
                <div style="min-width: 600px">
                    <header class="mb-0 pb-0 mt-0 pt-0">
                        <div class="myRow">
                            <div class="myCol-7">
                                <h6 class="gst">
                                    GST No. : <span class="number ">
                                        ${gstNumber}
                                    </span>
                                </h6>
                            </div>
                            <div class="myCol-5">
                                <div class="myRow">
                                    <h6 class="myCol gst border border-dark">
                                        INVOICE NO. : <span class="number d-block">
                                            ${invoiceNumber}
                                        </span>
                                    </h6>
    
                                    <h6 class="myCol gst border border-dark">
                                        DATE : <span class="number d-block">
                                            ${new Date(Date.parse(date)).getDate() + "/" + (new Date(Date.parse(date)).getMonth() + 1) + "/" + new Date(Date.parse(date)).getUTCFullYear()}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div class="myRow border border-dark">
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto">
                                    <h1 class="name text-primary text-uppercase fw-bold text-capitalize">
                                        ${name}
                                    </h1>
                                    <h6 class="lh-base fw-bold ">
                                        Distributor: ${distributor}
                                        <br />
                                        ${address}
                                        <br />
                                        Tel: ${tel}
                                        <br />
                                        Email: ${email}
                                    </h6>
                                </div>
                            </div>
    
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto">
                                    <h5 class="text-center fw-bolder">Invoice To :</h5>
                                    <h6 class="text-capitalize">
                                        <span class="underline"> Name :</span> ${billingUser.name}
                                    </h6>
                                    <h6 class="text-capitalize">
                                        <span class="underline"> Address :</span> ${billingUser.address.replace('/b', '<br />')}
                                    </h6>
                                    <h6>
                                        <span class="underline"> GST No. :</span> ${billingUser.gst === 'NA' ? 'NA' : billingUser.gst}
                                    </h6>
                                    <h6 class="text-capitalize">
                                        <span class="underline"> State :</span> ${billingUser.state}
                                    </h6>
                                    <h6>
                                        <span class="underline"> State Code:</span> ${billingUser.stateCode}
                                    </h6>
                                </div>
                            </div>
                            <div class="myCol border border-dark">
                            <div class="header-width mx-auto">
                                <h5 class="text-center fw-bolder">Invoice To :</h5>
                                <h6 class="text-capitalize">
                                    <span class="underline"> Name :</span> ${shippingUser.name}
                                </h6>
                                <h6 class="text-capitalize">
                                    <span class="underline"> Address :</span> ${shippingUser.address.replace('/b', '<br />')}
                                </h6>
                                <h6>
                                    <span class="underline"> GST No. :</span> ${shippingUser.gst === 'NA' ? 'NA' : shippingUser.gst}
                                </h6>
                                <h6 class="text-capitalize">
                                    <span class="underline"> State :</span> ${shippingUser.state}
                                </h6>
                                <h6>
                                    <span class="underline"> State Code:</span> ${shippingUser.stateCode}
                                </h6>
                            </div>
                        </div>
                        </div>
                        <div class="myRow border border-dark border-top-0">
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto text-capitalize">
                                    <h6>
                                        Place of Supply: ${placeOfSupply}
                                    </h6>
                                </div>
                            </div>
    
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto text-capitalize">
                                    <h6>
                                        Transportation: ${transportation}
                                    </h6>
                                </div>
                            </div>
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto text-capitalize">
                                    <h6>
                                        Vehicle No: ${vehicleNumber}
                                    </h6>
                                </div>
                            </div>
                            <div class="myCol border border-dark">
                                <div class="header-width mx-auto text-capitalize">
                                    <h6>
                                        Reverse Changes: ${reverseChanges}
                                    </h6>
                                </div>
                            </div>
    
                        </div>
    
                        <table class="border border-dark" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">S.No</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Description Of Goods</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">HSN Code</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Qty.</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Unit</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Rate/Item</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Total</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
    
                                            <div class="">
                                                <h5 class="fw-bold">Dis.</h5>
                                            </div>
                                        </div>
    
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Taxable Value</h5>
                                            </div>
                                        </div>
    
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">CGST</h5>
                                            </div>
                                        </div>
                                        <div class="myRow">
                                            <div class="myCol border border-dark border-bottom-0 border-start-0">
                                                <h5>Rate</h5>
                                            </div>
                                            <div
                                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0">
                                                <h5>Amt</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">SGST</h5>
                                            </div>
                                        </div>
                                        <div class="myRow">
                                            <div class="myCol border border-dark border-bottom-0 border-start-0">
                                                <h5>Rate</h5>
                                            </div>
                                            <div
                                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0">
                                                <h5>Amt</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">IGST</h5>
                                            </div>
                                        </div>
                                        <div class="myRow">
                                            <div class="myCol border border-dark border-bottom-0 border-start-0">
                                                <h5>Rate</h5>
                                            </div>
                                            <div
                                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0">
                                                <h5>Amt</h5>
                                            </div>
                                        </div>
                                    </th>
                                    <th class="text-center">
                                        <div>
                                            <div class="">
                                                <h5 class="fw-bold">Total</h5>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                `

        +
        items.map((item, index) => {
            return `
                <tr >
                <td class="text-center">${index + 1}</td>
                <td class="text-start text-capitalize">
                    <h6>
                        ${item.itemName.replace('default', '')}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                        ${item.hsn}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                       ${item.quantity}
                    </h6>
                </td>
                <td class="text-center text-uppercase">
                    <h6>
                        ${item.unit}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                        ${item.rate}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                        ${item.total}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                        ${discount}
                    </h6>
                </td>
                <td class="text-center">
                    <h6>
                        ${item.taxableValue}
                    </h6>
                </td>
                <td class="text-start">
                    <h6>
                        <div class="myRow">
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-top-0 text-center">
                                ${item.cgstPercentage}%
                            </div>
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0 border-top-0 text-center">
                                ${item.cgst}
                            </div>
                        </div>
                    </h6>
                </td>
                <td class="text-start">
                    <h6>
                        <div class="myRow">
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-top-0 text-center">
                                ${item.sgstPercentage}%
                            </div>
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0 border-top-0 text-center">
                                ${item.sgst}
                            </div>
                        </div>
                    </h6>
                </td>
                <td class="text-start">
                    <h6>
                        <div class="myRow">
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-top-0 text-center">
                                ${item.igstPercentage}%
                            </div>
                            <div
                                class="myCol border border-dark border-bottom-0 border-start-0 border-end-0 border-top-0 text-center">
                                ${item.igst}
                            </div>
                        </div>
                    </h6>
                </td>
                <td class="text-start text-center">
                    <h6>
                        ${item.subtotal}
                    </h6>
                </td>
            </tr >
                `
        })


        +

        `
                            </tbody >
                        </table >
                        <div class="myRow border border-dark border-top-0">
                            <div class="myCol-7 border border-dark">
                                <div class="header-width mx-auto">
                                    <h6 class="fw-bold">
                                        Bank Details: ${bankDetails}
                                        <br />
                                        Account No. ${accountNumber}, IFS Code: ${IFSCCode}
    
                                    </h6>
                                </div>
                            </div>
    
                            <div class="myCol-3 border border-dark">
                                <div class="header-width mx-auto">
                                    <h6 class="fw-bolder">
                                        TOTAL TAXABLE AMOUNT
                                    </h6>
                                </div>
                            </div>
                            <div class="myCol-2 border border-dark">
                                <div class="header-width mx-auto">
                                    <h5 class="fw-bold text-center">
                                        ${items.reduce((previous, current) => previous + current.taxableValue, 0)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="myRow border border-dark border-top-0">
                            <div class="myCol-7 border border-dark">
                                <div class="header-width mx-auto">
                                    <h6 class="fw-bold">
                                        Terms And Conditions:
                                        <br />
                                        1. Payment by A/c Payee or crossed cheque is requested, if cheque is dishonoured
                                        then the penalty of Rs. 350/- will be charged extra.
                                        <br />
                                        2. Seller is not responsible for any loss or damage of goods in transit.
                                        <br />
                                        3. Buyer undertakes to submit prescribed sales tax declaration to the seller on
                                        demand.
                                        <br />
                                        4. All disputes subject to Gurgaon Jurisdiction.
                                    </h6>
                                </div>
                            </div>
    
    
    
                            <div class="myCol-5">
                                <div class="w-100 h-100 myFlex">
                                    <div class="myRow ">
                                        <div class="myCol-60 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h6 class="fw-bold">
                                                    TOTAL GST
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="myCol-40 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h5 class="fw-bold text-center">
                                                    ${items.reduce((previous, current) => previous + current.cgst + current.sgst + current.igst, 0)}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="myRow ">
                                        <div class="myCol-60 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h6 class="fw-bold">
                                                    FREIGHT AND INSURANCE
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="myCol-40 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h5 class="fw-bold text-center">
                                                    ${insurance}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="myRow ">
                                        <div class="myCol-60 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h6 class="fw-bold">
                                                    PACKAGING AND FORWARDING
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="myCol-40 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h5 class="fw-bold text-center">
                                                    ${packaging}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="myRow ">
                                        <div class="myCol-60 border border-dark">
                                            <div class="header-width mx-auto">
                                                <h6 class="fw-bold">
                                                    INVOICE TOTAL
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="myCol-40 border border-dark  mb-0">
                                            <div class="header-width mx-auto">
                                                <h5 class="fw-bold text-center class=" mb-0 pb-0"">
                                                ${items.reduce((previous, current) => previous + current.subtotal, 0) + parseInt(insurance) + parseInt(packaging)}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                            </div>
                        </div >
                    </header >
                </div >
            </div >
        </div >
    </body >
    
    </html >
        `



};