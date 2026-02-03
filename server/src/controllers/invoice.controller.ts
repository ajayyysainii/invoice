import Items from "../models/invoice/items.model";
import Invoice from "../models/invoice/invoice.model";
import { Request,Response } from "express";
import puppeteer from 'puppeteer';


export class InvoiceController{
    createInvoice = async (req:Request,res:Response) => {
        try {
            const userId = (req.user as unknown as { id?: string })?.id;
            
            const {buyerId,invoice,dueDate,totalAmount} = req.body;

            const invoiceDetail = await Invoice.create({
                buyerId,
                userId,
                invoiceNumber: invoice,
                dueDate,
                totalAmount
            })

            const invoiceId = invoiceDetail._id;
            const {items} = req.body;
            const itemDetail = await Items.create({invoiceId,items})

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // await page.goto('https://pptr.dev/api/puppeteer.page');

            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax Invoice</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 28px;
            font-weight: bold;
        }

        .e-invoice-section {
            text-align: right;
        }

        .e-invoice-section p {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .qr-code {
            width: 150px;
            height: 150px;
            background: #000;
            display: inline-block;
        }

        .invoice-details {
            margin: 20px 0;
            font-size: 13px;
            line-height: 1.8;
        }

        .invoice-details p {
            margin: 3px 0;
        }

        .invoice-details strong {
            display: inline-block;
            width: 80px;
        }

        .parties-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #000;
        }

        .parties-table td {
            border: 1px solid #000;
            padding: 8px;
            font-size: 13px;
            vertical-align: top;
        }

        .parties-table .company-name {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 3px;
        }

        .parties-table .label {
            font-weight: bold;
            width: 48%;
        }

        .parties-table .value {
            width: 52%;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #000;
        }

        .items-table th,
        .items-table td {
            border: 1px solid #000;
            padding: 8px;
            font-size: 13px;
        }

        .items-table th {
            background: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }

        .items-table td {
            text-align: left;
        }

        .items-table td.center {
            text-align: center;
        }

        .items-table td.right {
            text-align: right;
        }

        .items-table .description {
            width: 30%;
        }

        .items-table .hsn {
            width: 10%;
            text-align: center;
        }

        .items-table .quantity {
            width: 12%;
            text-align: center;
        }

        .items-table .rate {
            width: 12%;
            text-align: right;
        }

        .items-table .per {
            width: 8%;
            text-align: center;
        }

        .items-table .disc {
            width: 8%;
            text-align: center;
        }

        .items-table .amount {
            width: 15%;
            text-align: right;
        }

        .tax-row {
            text-align: right;
            font-style: italic;
        }

        .total-row {
            font-weight: bold;
        }

        .amount-words {
            margin: 10px 0;
            font-size: 13px;
        }

        .amount-words .label {
            display: inline-block;
            width: 200px;
        }

        .amount-words .words {
            font-weight: bold;
        }

        .tax-breakdown-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #000;
        }

        .tax-breakdown-table th,
        .tax-breakdown-table td {
            border: 1px solid #000;
            padding: 8px;
            font-size: 13px;
            text-align: center;
        }

        .tax-breakdown-table th {
            background: #f0f0f0;
            font-weight: bold;
        }

        .tax-breakdown-table .total-row {
            font-weight: bold;
        }

        .footer-section {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .declaration {
            width: 60%;
        }

        .signature {
            width: 35%;
            text-align: right;
        }

        .signature p {
            margin-top: 60px;
            border-top: 1px solid #000;
            padding-top: 5px;
        }

        .computer-generated {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            font-style: italic;
        }

        .eo-mark {
            font-style: italic;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="header">
            <div>
                <h1>Tax Invoice</h1>
            </div>
            <div class="e-invoice-section">
                <p>e-Invoice</p>
                <div class="qr-code"></div>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details">
            <p><strong>IRN</strong> : fef1df90406b928db26a62f816debc9bb5256d9375e6-0dc4226653cc23a8c595</p>
            <p><strong>Ack No.</strong> : 112010036563310</p>
            <p><strong>Ack Date</strong> : 21-Dec-20</p>
        </div>

        <!-- Parties Information Table -->
        <table class="parties-table">
            <tr>
                <td class="label">
                    <div class="company-name">Surabhi Hardwares, Bangalore</div>
                    <div>HSR Layout</div>
                    <div>Bangalore</div>
                    <div>GSTIN/UIN: 29AACCT3705E000</div>
                    <div>State Name : Karnataka, Code : 29</div>
                    <div>Consignee (Ship to)</div>
                    <div class="company-name" style="margin-top: 10px;">Kiran Enterprises</div>
                    <div>12th Cross</div>
                    <div>GSTIN/UIN : 29AAFFC8126N1ZZ</div>
                    <div>State Name : Karnataka, Code : 29</div>
                    <div>Buyer (Bill to)</div>
                    <div class="company-name" style="margin-top: 10px;">Kiran Enterprises</div>
                    <div>12th Cross</div>
                    <div>GSTIN/UIN : 29AAFFC8126N1ZZ</div>
                    <div>State Name : Karnataka, Code : 29</div>
                </td>
                <td class="value">
                    <p><strong>Invoice No.</strong></p>
                    <p><strong>SHB/456/20</strong></p>
                    <p>Delivery Note</p>
                    <p style="margin-top: 15px;">Reference No. & Date.</p>
                    <p style="margin-top: 15px;">Buyer's Order No.</p>
                    <p style="margin-top: 15px;">Dispatch Doc No.</p>
                    <p style="margin-top: 15px;">Dispatched through</p>
                    <p style="margin-top: 15px;">Terms of Delivery</p>
                </td>
                <td class="value">
                    <p><strong>Dated</strong></p>
                    <p><strong>20-Dec-20</strong></p>
                    <p>Mode/Terms of Payment</p>
                    <p style="margin-top: 15px;">Other References</p>
                    <p style="margin-top: 15px;">Dated</p>
                    <p style="margin-top: 15px;">Delivery Note Date</p>
                    <p style="margin-top: 15px;">Destination</p>
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th>Sl<br>No.</th>
                    <th class="description">Description of Goods</th>
                    <th class="hsn">HSN/SAC</th>
                    <th class="quantity">Quantity</th>
                    <th class="rate">Rate</th>
                    <th class="per">per</th>
                    <th class="disc">Disc. %</th>
                    <th class="amount">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="center">1</td>
                    <td><strong>12MM**</strong></td>
                    <td class="center">1005</td>
                    <td class="center"><strong>7 No</strong></td>
                    <td class="right">500.00</td>
                    <td class="center">No</td>
                    <td class="center"></td>
                    <td class="right">3,500.00</td>
                </tr>
                <tr>
                    <td colspan="7" class="tax-row">CGST</td>
                    <td class="right">315.00</td>
                </tr>
                <tr>
                    <td colspan="7" class="tax-row">SGST</td>
                    <td class="right">315.00</td>
                </tr>
                <tr class="total-row">
                    <td colspan="3" class="right">Total</td>
                    <td class="center"><strong>7 No</strong></td>
                    <td colspan="3"></td>
                    <td class="right"><strong>₹ 4,130.00</strong></td>
                </tr>
            </tbody>
        </table>

        <!-- Amount in Words -->
        <div class="amount-words">
            <span class="label">Amount Chargeable (in words)</span>
            <span class="eo-mark">E. & O.E</span>
        </div>
        <div class="amount-words">
            <span class="words">Indian Rupee Four Thousand One Hundred Thirty Only</span>
        </div>

        <!-- Tax Breakdown Table -->
        <table class="tax-breakdown-table">
            <thead>
                <tr>
                    <th rowspan="2">HSN/SAC</th>
                    <th rowspan="2">Taxable<br>Value</th>
                    <th colspan="2">Central Tax</th>
                    <th colspan="2">State Tax</th>
                    <th rowspan="2">Total<br>Tax Amount</th>
                </tr>
                <tr>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1005</td>
                    <td>3,500.00</td>
                    <td>9%</td>
                    <td>315.00</td>
                    <td>9%</td>
                    <td>315.00</td>
                    <td>630.00</td>
                </tr>
                <tr class="total-row">
                    <td>Total</td>
                    <td>3,500.00</td>
                    <td></td>
                    <td>315.00</td>
                    <td></td>
                    <td>315.00</td>
                    <td>630.00</td>
                </tr>
            </tbody>
        </table>

        <!-- Tax Amount in Words -->
        <div class="amount-words">
            <span>Tax Amount (in words) : <strong>Indian Rupee Six Hundred Thirty Only</strong></span>
        </div>

        <!-- Footer Section -->
        <div class="footer-section">
            <div class="declaration">
                <p><strong>Declaration</strong></p>
                <p>We declare that this invoice shows the actual price of the</p>
                <p>goods described and that all particulars are true and</p>
                <p>correct.</p>
            </div>
            <div class="signature">
                <p><strong>for Surabhi Hardwares, Bangalore</strong></p>
                <p>Authorised Signatory</p>
            </div>
        </div>

        <!-- Computer Generated Note -->
        <div class="computer-generated">
            This is a Computer Generated Invoice
        </div>
    </div>
</body>
</html>
            `
            await page.setContent(htmlContent)

            await page.pdf({ path: 'example.pdf', format: 'Letter' });


            await browser.close();


            console.log(invoiceDetail)
            console.log(itemDetail)
            

            
            return res.json({message: 'true'})
        } catch (error) {
            return res.status(400).json({message: 'false',error: error})
        }
    }

    getInvoiceByUserId = async (req:Request,res:Response)=>{
        try {
            const userId = (req.user as unknown as { id?: string })?.id;

            const invoiceList = await Invoice.find({userId}).populate('buyerId')
            
            // Fetch items for each invoice
            const invoicesWithItems = await Promise.all(
                invoiceList.map(async (invoice) => {
                    const items = await Items.findOne({ invoiceId: invoice._id });
                    return {
                        ...invoice.toObject(),
                        items: items?.items || []
                    };
                })
            );
            // console.log(invoicesWithItems)
            res.status(200).json(invoicesWithItems);


        } catch (error) {
            res.status(400).json(error)
        }
    }

    
}
