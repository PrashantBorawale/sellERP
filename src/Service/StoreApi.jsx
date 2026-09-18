import axios from 'axios';


const Base_Url = "https://sellerp-backend.onrender.com/Store/";

// const Base_Url = "api/Store/"; 
  
// Purchase gernal grn
export const postGrnDetails = async (data) => {
    try {
      const response = await fetch(`${Base_Url}GrnGenralDetail/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


//   Subcon inwardchallan
export const saveInwardChallan = async (data) => {
    try {
      const response = await fetch(`${Base_Url}InwardChallan/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  //   Subcon Job_Workchallan
export const saveJob_WorkChallan = async (data) => {
    try {
      const response = await fetch(`${Base_Url}Job_Work/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  // Subcron Vendor

  export const saveVendorScrap = async (data) => {
    try {
      const response = await axios.post(`${Base_Url}VendorScrap/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Check for errors (axios throws an error for non-2xx status codes)
      return response.data; // axios automatically parses JSON
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };





  // Material Gernal
  export const getMaterialGernal = async () => {
    const response = await fetch(`${Base_Url}Material_Issue_General/`);
    return await response.json();
  };
  
  export const addMaterialGernal = async (material) => {
    const response = await fetch(`${Base_Url}Material_Issue_General/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(material),
    });
    return await response.json();
  };
  
  export const updateMaterialGernal = async (id, material) => {
    const response = await fetch(`${Base_Url}Material_Issue_General/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(material),
    });
    return await response.json();
  };
  
  export const deleteMaterialGernal = async (id) => {
    await fetch(`${Base_Url}Material_Issue_General/${id}/`, {
      method: "DELETE",
    });
  };

// Delivery Challan
export const addDeliveryChallan = async (data) => {
  return await axios.post(`${Base_Url}DeliveryChallan/`, data);
};

export const getDeliveryChallans = async () => {
  return await axios.get(`${Base_Url}DeliveryChallan/`);
};

export const updateDeliveryChallan = async (id, data) => {
  return await axios.put(`${Base_Url}DeliveryChallan/${id}/`, data);
};

export const deleteDeliveryChallan = async (id) => {
  return await axios.delete(`${Base_Url}DeliveryChallan/${id}/`);
};


export const saveChallanData = async (data) => {
  try {
    const response = await axios.post(`${Base_Url}SecondDeliveryChallann/`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving challan data:', error);
    throw error;
  }
};



// Function to save GRN Data
export const saveGRNData = async (data) => {
  try {
    const response = await axios.post(`${Base_Url}DC_GRN/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // Throw the error to be caught in the form component
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// New Indent

export const saveIndent = async (data, id) => {
  if (id) {
    return await axios.put(`${Base_Url}NewIndent/${id}/`, data);
  } else {
    return await axios.post(`${Base_Url}NewIndent/`, data);
  }
};

export const getIndentData = async () => {
  return await axios.get(`${Base_Url}NewIndent/`);
};

export const deleteIndent = async (id) => {
  return await axios.delete(`${Base_Url}NewIndent/${id}/`);
};

// NewIndent
export const indentsaveData = async (data) => {
  const response = await fetch(`${Base_Url}SecondNew/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to save data");
  }

  return response.json();
};


export const getNewMRN = async (year) => {
  try {
    const response = await axios.get(`${Base_Url}api/get-next-mrn-no/?year=${year}`);
    return response.data.next_mrn_no;
  } catch (error) {
    console.error("Error fetching next note number:", error);
    return null;
  }
};

export const submitNewMRN = async (data) => {
  try {
    const response = await axios.post(`${Base_Url}api/New-MRN-Entry/`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting MRN entry:", error);
    return null;
  }
};

export const searchMRNItem = async (query) => {
  try {
    const response = await axios.get(`${Base_Url}NewMRN_Item_Search/`, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching MRN items:", error);
    return [];
  }
};


export const searchEmployeeDept = async (query) => {
  try {
    const response = await axios.get(`${Base_Url}NewMRN_EmployeeDept_Search/`, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};



export const getNewGateInward = async (year) => {
  try {
    const response = await axios.get(`${Base_Url}api/get-next-ge-no/?year=${year}`);
    return response.data.next_GE_No
    ;
  } catch (error) {
    console.error("Error fetching next note number:", error);
    return null;
  }
};


export const getgateInwardById = async (id) => {
  try {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      throw new Error("Authentication token not found. Please login again.")
    }

    const response = await axios.get(`${Base_Url}api/general-details/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error fetching gate inward details:", error)
    return null
  }
}

// Update the SaveNewGateInward function to handle both create and update
export const SaveNewGateInward = async (data) => {
  try {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      throw new Error("Authentication token not found. Please login again.")
    }

    let response

    // If data has an id, it's an update operation
    if (data.id) {
      response = await axios.put(`${Base_Url}api/general-details/${data.id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    } else {
      // Otherwise it's a create operation
      response = await axios.post(`${Base_Url}api/general-details/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    }

    return response.data
  } catch (error) {
    console.error("Error submitting gate entry:", error)
    if (error.response && error.response.data) {
      console.error("Backend validation details:", error.response.data)
    }
    throw error;
  }
}

export const searchCustomerByNumber = async (query) => {
  try {
    const response = await axios.get(`${Base_Url}search-item/?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

// GET: Fetch GRN Details
export const getGrnDetails = async () => {
  try {
    const response = await axios.get(`${Base_Url}api/grn-details/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GRN details:", error);
    throw error;
  }
};

 export const updateGRN = async (id, grn) => {
    const response = await fetch(`${Base_Url}api/grn-details/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grn),
    });
    return await response.json();
  };

// Get GRN by ID for editing
export const getGrnById = async (id) => {
  try {
    const response = await axios.get(`${Base_Url}grn/edit/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GRN by ID:", error);
    throw error;
  }
};

// Update GRN by ID
export const updatePurchaseGRN = async (id, payload) => {
  try {
    const response = await axios.put(`${Base_Url}grn/edit/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating GRN:", error);
    throw error;
  }
};


// Get Next GRN No based on year
export const getNextGrnNo = async (year) => {
  try {
    const res = await axios.get(`${Base_Url}GetNextGrnNo/?year=${year}`);
    return res.data.next_GrnNo;
  } catch (error) {
    console.error("Error fetching next GRN No:", error);
    throw error;
  }
};



export const getGeneralDetails = async () => {
  try {
    const res = await axios.get("https://sellerp-backend.onrender.com/Store/gate-entry/purchaseGrn/");
    return res.data;
  } catch (error) {
    console.error("Error fetching general details:", error);
    throw error;
  }
};

export const postPurchaseGRN = async (payload) => {
  try {
    const response = await axios.post(`${Base_Url}api/PurchaseGRN/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting GRN data:", error);
    throw error;
  }
};


export const getPoDetailsByPoNo = async (poNo) => {
  try {
    const response = await axios.get(`${Base_Url}get-by-pono/${poNo}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PO details:", error);
    return null;
  }
};

export const getPurchaseGrnItems = async () => {
  try {
    const response = await axios.get("https://sellerp-backend.onrender.com/Purchase/Purchase/grn/item");
    return response.data;
  } catch (error) {
    console.error("Error fetching Purchase GRN items:", error);
    return [];
  }
};


export const fetchItemDetailsByPoAndItem = async (poNo, itemName) => {
  try {
    const response = await axios.get(
      `${Base_Url}get-by-pono-item/?PoNo=${poNo}&Item=${itemName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching item details:", error);
    return null;
  }
};



export const getNextChallanNo = async (year) => {
 
  try {
    const res = await axios.get(`${Base_Url}api/get-new-material-challan-no/?year=${year}`);
    return res.data.next_challan_no; // ✅ correct key
  } catch (error) {
    console.error("Error fetching next Challan No:", error);
    throw error;
  }
};

export const postNewMaterialIssue = async (payload) => {
 
  try {
    const response = await axios.post(`${Base_Url}api/New-Material-Issue/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting GRN data:", error);
    throw error;
  }
};



export const getgateInward = async () => {
  try {
    const response = await axios.get(`${Base_Url}api/gate-inward/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GRN details:", error);
    throw error;
  }
};

// Add this to your StoreApi.jsx file
export const deleteGateInward = async (id) => {
  try {
    // URL match karein apne backend url se
    const response = await fetch(`https://sellerp-backend.onrender.com/Store/gate/entry/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
};



// Add this function
export const deleteGrn = async (id) => {
    try {
        await axios.delete(`https://sellerp-backend.onrender.com/Store/grn/delete/${id}/`);
        return true;
    } catch (error) {
        console.error("Error deleting GRN:", error);
        throw error;
    }
};

