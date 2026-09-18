import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import './ErpWebConfig.css';

const ErpWebConfig = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [webConfigData, setWebConfigData] = useState([]);

    const toggleSideNav = () => {
        setSideNavOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (sideNavOpen) {
            document.body.classList.add("side-nav-open");
        } else {
            document.body.classList.remove("side-nav-open");
        }

        // Sample data similar to the screenshot you shared
        const sampleData = [
            { id: 1, key: 'Company Name', value: 'SHARP ENGINEERS, AURANGABAD', description: 'ERP Login Page Display Company name' },
            { id: 2, key: 'InvoiceRpt', value: 'rptInvoiceALL_GST_Sharp.rdlc', description: 'GST Invoice rpt' },
            { id: 3, key: 'TCSInvoiceRpt', value: 'rptInvoiceALL_GST_Sharp.rdlc', description: 'TCS/Scrap Invoice rpt' },
            { id: 4, key: 'LBInvoiceRpt', value: 'rpt.labworkInvoice_GST_SHARP.rdlc', description: 'Jobwork Invoice rpt' },
            { id: 5, key: 'LB_Invoice_RefFormat', value: '1', description: '' },
        ];

        setWebConfigData(sampleData);
    }, [sideNavOpen]);

    return (
        <div className="Webconfigfile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="Main-NavBar">
                            <NavBar toggleSideNav={toggleSideNav} />
                            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
                            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                                <div className="config mt-5">
                                    <div className="config-header mb-4 text-start">
                                        <div className="row align-items-center">
                                            <div className="col-md-4">
                                                <h5 className="header-title">Web.Config File</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.</th>
                                                    <th scope="col">Key</th>
                                                    <th scope="col">Value</th>
                                                    <th scope="col">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {webConfigData.map((config, index) => (
                                                    <tr key={index}>
                                                        <td>{config.id}</td>
                                                        <td>{config.key}</td>
                                                        <td>{config.value}</td>
                                                        <td>{config.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErpWebConfig;
