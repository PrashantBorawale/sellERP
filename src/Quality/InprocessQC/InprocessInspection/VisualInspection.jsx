import React from "react";

const VisualInspection = ({ visualTests, setVisualTests }) => {
  const [newVisualTest, setNewVisualTest] = React.useState({
    test_no: "",
    test_description: "",
    specification: "",
    method_of_check: "",
    m1: "", m2: "", m3: "", m4: "", m5: "",
    merge: false,
    remark: ""
  });

  const handleAdd = () => {
    setVisualTests(prev => [...prev, { ...newVisualTest, id: Date.now() }]);
    setNewVisualTest({
      test_no: "",
      test_description: "",
      specification: "",
      method_of_check: "",
      m1: "", m2: "", m3: "", m4: "", m5: "",
      merge: false,
      remark: ""
    });
  };

  const handleDelete = (id) => {
    setVisualTests(visualTests.filter(t => t.id !== id));
  };

  return (
    <div className="mt-3">
      {/* ================= UPPER ENTRY TABLE ================= */}
      <div className="table-responsive mb-3">
        <table className="table table-bordered text-center">
          <thead className="table-secondary">
            <tr>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Specification</th>
              <th>Method of Check</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>Merge</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input className="form-control" placeholder="Enter" value={newVisualTest.test_no} onChange={(e) => setNewVisualTest({ ...newVisualTest, test_no: e.target.value })} /></td>
              <td><input className="form-control" placeholder="Enter" value={newVisualTest.test_description} onChange={(e) => setNewVisualTest({ ...newVisualTest, test_description: e.target.value })} /></td>
              <td><input className="form-control" placeholder="Enter" value={newVisualTest.specification} onChange={(e) => setNewVisualTest({ ...newVisualTest, specification: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.method_of_check} onChange={(e) => setNewVisualTest({ ...newVisualTest, method_of_check: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.m1} onChange={(e) => setNewVisualTest({ ...newVisualTest, m1: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.m2} onChange={(e) => setNewVisualTest({ ...newVisualTest, m2: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.m3} onChange={(e) => setNewVisualTest({ ...newVisualTest, m3: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.m4} onChange={(e) => setNewVisualTest({ ...newVisualTest, m4: e.target.value })} /></td>
              <td><input className="form-control" value={newVisualTest.m5} onChange={(e) => setNewVisualTest({ ...newVisualTest, m5: e.target.value })} /></td>
              <td><input type="checkbox" checked={newVisualTest.merge} onChange={(e) => setNewVisualTest({ ...newVisualTest, merge: e.target.checked })} /></td>
              <td><input className="form-control" value={newVisualTest.remark} onChange={(e) => setNewVisualTest({ ...newVisualTest, remark: e.target.value })} /></td>
              <td><button className="btn btn-primary btn-sm" onClick={handleAdd}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= LOWER GRID TABLE ================= */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-info">
            <tr>
              <th>Sr.</th>
              <th>Test No</th>
              <th>Test Description</th>
              <th>Specification</th>
              <th>Method of Check</th>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>M4</th>
              <th>M5</th>
              <th>Merge</th>
              <th>Remark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {visualTests.map((t, idx) => (
              <tr key={t.id}>
                <td>{idx + 1}</td>
                <td>{t.test_no}</td>
                <td>{t.test_description}</td>
                <td>{t.specification}</td>
                <td>{t.method_of_check}</td>
                <td>{t.m1}</td>
                <td>{t.m2}</td>
                <td>{t.m3}</td>
                <td>{t.m4}</td>
                <td>{t.m5}</td>
                <td className="text-center"><input type="checkbox" checked={t.merge} readOnly /></td>
                <td>{t.remark}</td>
                <td><button className="btn btn-link text-danger border-0 bg-transparent" onClick={() => handleDelete(t.id)}>🗑</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisualInspection;