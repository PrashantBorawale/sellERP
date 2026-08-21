import React, { useState, useEffect } from "react";
import "./ItemOther.css";

const ItemOther = ({ updateFormData, itemDetails = [] }) => {
  const [itemOtherDetails, setItemOtherDetails] = useState([{ ItemNo: "", CPC_Code: "" }]);

  // ✅ Debug: Check if `itemDetails` is received
  useEffect(() => {
    console.log("Received itemDetails:", itemDetails);

    if (itemDetails.length > 0) {
      const updatedItems = itemDetails.map((item) => ({
        ItemNo: item.Item || "", // ✅ Fetch `ItemCode` from `ItemDetails`
        CPC_Code: "", // Allow manual selection
      }));

      setItemOtherDetails(updatedItems);
      updateFormData("Item_Details_Other", updatedItems);
    }
  }, [updateFormData,itemDetails]); // ✅ Runs only when `itemDetails` updates

  // ✅ Handle manual input changes
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...itemOtherDetails];
    updatedItems[index][field] = value;
    setItemOtherDetails(updatedItems);
    updateFormData("Item_Details_Other", updatedItems);
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '12px', maxWidth: '600px' }}>
        <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
          <h6 className="mb-0 fw-bold text-secondary">Item Other Details</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {['Sr.', 'Item No.', 'CPC Code'].map((head, index) => (
                    <th key={index} className="text-center text-secondary text-uppercase" style={{ whiteSpace: 'nowrap', fontSize: '0.65rem', padding: '8px 16px' }}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {itemOtherDetails.length > 0 ? (
                  itemOtherDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-secondary" style={{ padding: '8px 16px' }}>{index + 1}</td>
                      <td className="text-center" style={{ padding: '8px 16px' }}>
                        <input
                          type="text"
                          className="form-control form-control-sm mx-auto"
                          placeholder="Item No"
                          value={item.ItemNo}
                          onChange={(e) => handleInputChange(index, "ItemNo", e.target.value)}
                          style={{ minWidth: '150px' }}
                        />
                      </td>
                      <td className="text-center" style={{ padding: '8px 16px' }}>
                        <select
                          className="form-select form-select-sm mx-auto"
                          value={item.CPC_Code}
                          onChange={(e) => handleInputChange(index, "CPC_Code", e.target.value)}
                          style={{ minWidth: '180px' }}
                        >
                          <option value="">Select CPC Code</option>
                          <option value="001">001 - Code 1</option>
                          <option value="002">002 - Code 2</option>
                          <option value="003">003 - Code 3</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
                      No item details available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOther;
