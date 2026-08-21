
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./PurchaseOrderPDF.css";
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPurchaseOrderById } from "../../../Service/PurchaseApi"
import jsPDF from "jspdf"

const PurchaseOrderPDF = () => {
    const [poData, setPoData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    
  
    useEffect(() => {
      const fetchPo = async () => {
        try {
          setIsLoading(true)
          console.log("Fetching PO with ID:", id)
          const data = await fetchPurchaseOrderById(id)
          console.log("Fetched PO data:", data)
          setPoData(data)
        } catch (error) {
          console.error("Error fetching purchase order:", error)
          setError(error.message || "An unexpected error occurred")
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchPo()
    }, [id])
  
    const handlePrint = () => {
      window.print()
    }
  
    const handleDownload = () => {
      const doc = new jsPDF()
      const content = document.getElementById("po-content")
  
      doc.html(content, {
        callback: (doc) => {
          doc.save(`PO-${poData.PoNo}.pdf`)
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 650,
      })
    }
  
    if (isLoading) return <div>Loading...</div>
  
    if (error) {
      return (
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back
          </button>
        </div>
      )
    }
  
    if (!poData) return <div>No data available for this purchase order.</div>
  
    console.log("Rendering PO data:", poData)
    
  return (
    <div className="PurchaseOrderPDFMaster">
       <div className="container purchasepdf">
            <div className="row purchasepdf-header">
              <div className="col-md-3">
                        <span className="rednhk">Produlink</span>    
              </div>
              <div className="col-md-7  mt-3">
                        <h5 className="nhkadd1">NHK AUTOMOTIVE COMPONENTS INDIA PVT. LTD.</h5>
                        <p className="nhkadd">C - 36, SHENDRA FIVE STAR INDUSTRIAL AREA, AURANGABAD 431154 </p>
                        <p className="nhkadd">State Code : 27 State Name : MAHARASHTRA </p>
                        <p className="nhkadd">GSTIN :-27AADCN6925H1ZA</p>
              </div>
              <div className="col-md-2">
                        
              </div>
            </div>

            <div className="row purchaseammend">
              <div className="col-md-12">
              Purchase Order Ammendment                   
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                 <b className="addName">M/S OM LOGISTIC LTD</b>
                <p className="addcity">
                 Address : W-86 <br />
                 MIDC Area Waluj <br />
                 City : Aurangabad-431133 <br />
                 State Code: 27 State Name: MAHARASHTRA
                 </p> 
                <br />
                 <div style={{marginLeft: '-100px'}}>
                    <label htmlFor="" className=""><b>GSTIN No. :  </b></label>
                    27AAACO4716C1ZT
                </div>                    
              </div>

              <div className="col-md-4">
                        
              </div>

                            <div className="col-md-4 sideroow">
                              <div className="row mb-2">
                                <div className="col-3">
                                    <label htmlFor="shift"><b>AO No :</b></label>
                                </div>
                                <div className="col-3">
                                        4
                                </div>
                                <div className="col-3">
                                    <label htmlFor="shift"><b>AO Date :</b></label>
                                </div>
                                <div className="col-3">
                                10/11/2020
                                </div>
                                </div>

                                <div className="row mb-2">
                                <div className="col-2">
                                    <label htmlFor="shift"><b>PONo:</b></label>
                                    
                                </div>
                                <div className="col-3">
                                <span>{poData.PoNo}</span>
                               </div>
                               <div className="col-3">
                                    <label htmlFor="shift"><b> PO Mode :</b></label>
                                </div>
                                <div className="col-3">
                                    Open
                                </div>

                               
                                </div>

                                <div className="row mb-2 sideroww">
                                <div className="col-3">
                                    <label htmlFor="shift"><b> PO Date : </b></label>
                                    
                                </div>
                                <div className="col-4">
                                <span>{poData.PoDate}</span>
                                </div>
                                </div>

                                <div className="row">
                                <div className="col-6 ">
                                    <label htmlFor=""><b> Kind Attention :</b></label>
                                </div>
                                <div className="col-6">

                                </div>
                                </div>
                                <div className="row">
                                <div className="col-8 ">
                                    <label htmlFor=""><b> Ef. Ammendment Date From :</b></label>
                                </div>
                                <div className="col-4">

                                </div>
                                </div>
                                <div className="row">
                                <div className="col-6 ">
                                    <label htmlFor=""><b> Effective PO Date From :</b></label>
                                </div>
                                <div className="col-6">

                                </div>
                                </div>
                                <div className="row">
                                <div className="col-6 ">
                                    <label htmlFor=""><b> Effective Upto :</b></label>
                                </div>
                                <div className="col-6">

                                </div>
                                </div>
                     </div>   
          </div>

            {/* <div className="row tbleroo ">
              <div className="col-md-12">
                    <div style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="no-scrollbar">
                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                            <th style={styles.cell} rowSpan="2">Sno</th>
                            <th style={styles.cell} rowSpan="2">Item Code <br /> Item Name</th>
                            <th style={styles.cell} rowSpan="2">Unit</th>
                            <th style={styles.cell} rowSpan="2">HSN/SAC</th>
                            <th style={styles.cell} colSpan="3">Quantity</th>
                            <th style={styles.cell} colSpan="2">Rate</th>
                            <th style={styles.cell} rowSpan="2">Disc %</th>
                            <th style={styles.cell} rowSpan="2">Taxable Value</th>
                            <th style={styles.cell} colSpan="2">CGST</th>
                            <th style={styles.cell} colSpan="2">SGST</th>
                            <th style={styles.cell} colSpan="2">IGST</th>
                            <th style={styles.cell} rowSpan="2">Total Amount</th>
                            </tr>
                            <tr>
                            <th style={styles.cell}>Ordered</th>
                            <th style={styles.cell}>Additional</th>
                            <th style={styles.cell}>Revised</th>
                            <th style={styles.cell}>Ordered</th>
                            <th style={styles.cell}>Revised</th>
                            <th style={styles.cell}>%</th>
                            <th style={styles.cell}>Amount</th>
                            <th style={styles.cell}>%</th>
                            <th style={styles.cell}>Amount</th>
                            <th style={styles.cell}>%</th>
                            <th style={styles.cell}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={styles.cell} rowSpan="1">1</td>
                            <td style={styles.cell} rowSpan="1">SER822 <br /> Security Guard Service for Half Month</td>
                            <td style={styles.cell} rowSpan="1">PMon</td>
                            <td style={styles.cell} rowSpan="1">998729</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>7,500.00</td>
                            <td style={styles.cell}>7,500.00</td>
                            <td style={styles.cell}>-</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>9.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>9.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            </tr>
                            <tr>
                            <td style={styles.cell} colSpan="10" className="text-end"><b> Total Amount () </b> </td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}></td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}></td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}></td>
                            <td style={styles.cell}>0.00</td>
                            <td style={styles.cell}>0.00</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
             </div>
            </div> */}

<div id="po-content">
        
        


        <table className="table-container">
          <thead>
            <tr className="table-header">
              <th>No</th>
              <th>Item</th>
              <th>Description</th>
              <th>HSN</th>
              <th>Size</th>
              <th>Qty.</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Disc(%)</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {poData.Item_Detail_Enter.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Item}</td>
                <td>{item.ItemDescription}</td>
                <td>{item.HSN}</td>
                <td>{item.ItemSize}</td>
                <td>{item.Qty}</td>
                <td>{item.Unit}</td>
                <td>{item.Rate}</td>
                <td>{item.Disc}</td>
                <td>{(Number(item.Rate) * Number(item.Qty) * (1 - Number(item.Disc) / 100)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-box">
          <div>
            <span>Total (Rs)</span>
            <span>{poData.Gst_Details[0]?.SubTotal || "N/A"}</span>
          </div>
          <div>
            <span>CGST (Rs.)</span>
            <span>{poData.Gst_Details[0]?.CGST || "N/A"}</span>
          </div>
          <div>
            <span>SGST (Rs.)</span>
            <span>{poData.Gst_Details[0]?.SGST || "N/A"}</span>
          </div>
          <hr />
          <div style={{ fontWeight: "bold" }}>
            <span>Gross Amount (Rs.)</span>
            <span>{poData.Gst_Details[0]?.GR_Total || "N/A"}</span>
          </div>
        </div>

      
      </div>
        

            <div className="row purchaseammend">
              <div className="col-md-12 text-start">
             In Words              
              </div>
            </div>

            <div className="row" style={{borderBottom: '3px solid black'}}>
              <div className="col-md-5 text-start">
                 <b style={{ textDecoration: 'underline' }}>  Important Notes :-  </b>            
              </div>

              <div className="col-md-7  text-start" style={{ borderLeft: '3px solid black', paddingLeft: '10px' }}>
                    <b style={{ textDecoration: 'underline' }} > Terms And Conditions :-   </b>       
                    <p style={{ marginBottom: '5px' }}>NHK AUTOMOTIVE COMPONENTS INDIA PVT. LTD</p>   
                    <p style={{ marginBottom: '5px' }}> <b>1.</b> Refer Annexure I to P.O.for details of Commercial Terms&conditions. </p>  
                    <p style={{ marginBottom: '5px' }}> <b>2.</b> Transit Period-For Chakan-NextDay Delivery,For Halol/Sanand, Vithlapur/Becharji: 3rdDay Delivery,For Hosur/Chennai/Hosur/Narsapur: 4thDay delivery.For Gurgaon Part Load 4th Day Delivery,For Gurgaon FTL 3rdDay Delivery from next day of Matrial handover. </p>
                    <p style={{ marginBottom: '5px' }}> <b>3.</b> Payment Term:After confirmation of Delivery payment 15Days from submission of Bill.</p>
                    <p style={{ marginBottom: '5px' }}> <b>4.</b> Minimum Chargable Weight - 100 Kgs. For Air-50Kg
                    </p>
                    <p style={{ marginBottom: '5px' }}> <b>5.</b> All rates are includesCollection and delivery Charges up to Customer.</p>
                    <p style={{ marginBottom: '5px' }}> <b>6.</b> P.O.Valid from 08.03.2020 to 31.03.2021
                    </p>
                    <p style={{ marginBottom: '5px' }}> <b>7.</b> Change In Fuel Cost: Within +/-5%:NIL & Beyond +/-5%-out of this 50 % of Fuel Cost change will be Adjusted. </p>
                    <p style={{ marginBottom: '5px' }}> <b>8.</b> Rise in Fuel Price 10%</p>
                    <p style={{ marginBottom: '5px' }}> <b>9.</b> AO-2 Effected from 1-July-2020 to 30-sep-2020.</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 text-end">
                    <b>NHK AUTOMOTIVE COMPONENTS INDIA PVT. LTD</b>  
              </div>
            </div>
            <div className="row mt-5 text-end">
                       <div className="col-md-3">
                                               
                        </div>
                        <div className="col-md-3">
                                               
                        </div>
                        <div className="col-md-3">
                            <b className="addName">S BANSAL</b>
                            <p>Vice President</p>                   
                        </div>
                        <div className="col-md-3">
                            <b className="addName">Yasuharu Oono</b>
                            <p>Technical Advisor</p>                   
                        </div>
             </div>
             <div className="action-buttons d-flex">
        
        <button onClick={handlePrint} className="btn btn-primary">
          Print
        </button>
        <button onClick={handleDownload} className="btn btn-primary">
          Download PDF
        </button>
      </div>

        </div>
       
    </div>
  )
}
// eslint-disable-next-line no-unused-vars
const styles = {
    cell: {
      border: "1px solid black",
      padding: "8px",
      textAlign: "center",
      whiteSpace: "nowrap",
    },
  };

export default PurchaseOrderPDF