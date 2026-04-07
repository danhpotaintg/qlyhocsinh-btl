import React, { useState } from "react";
import axios from "axios";

export default function CreateStudent() {
 
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    parentGmail: "",
    parentPhonenumber: "", 
    gender: "",
    className: "",
    academicYear: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      // 2. Gửi request chuẩn xác
      const response = await axios.post(
        "/quanly/students", // Nhớ kiểm tra lại URL có /quanly không
        {
          fullName: formData.fullName,
          dob: formData.dob,
          parentGmail: formData.parentGmail,
          parentPhonenumber: formData.parentPhonenumber,
          gender: formData.gender,
          className: formData.className,
          academicYear: parseInt(formData.academicYear), // Phải lấy đúng giá trị và chuyển về số
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Tạo tài khoản thành công!");
      
      // Reset form về trạng thái trống
      setFormData({
        fullName: "",
        dob: "",
        parentGmail: "",
        parentPhonenumber: "",
        gender: "",
        className: "",
        academicYear: "",
      });
    } catch (err) {
      // Hiển thị lỗi từ Backend nếu có (ví dụ: lỗi validate)
      const backendMessage = err.response?.data?.message || "Không thể tạo tài khoản!";
      setError(backendMessage);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit} className="create-student-form">
        <h3>Tạo tài khoản học sinh</h3>
        
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Họ và tên" />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
        <input name="parentGmail" type="email" value={formData.parentGmail} onChange={handleChange} placeholder="Email phụ huynh" />
        <input name="parentPhonenumber" type="text" value={formData.parentPhonenumber} onChange={handleChange} placeholder="Số điện thoại phụ huynh" />
        <input name="className" type="text" value={formData.className} onChange={handleChange} placeholder="Tên lớp" />
        {/* Academic Year là quan quan trọng để Backend sinh mã K22... */}
        <input name="academicYear" type="number" value={formData.academicYear} onChange={handleChange} placeholder="Khóa (VD: 2022)" />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">-- Chọn giới tính --</option>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
        </select>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

        <button type="submit" style={{ marginTop: "15px", cursor: "pointer" }}>Tạo học sinh</button>
      </form>
    </div>
  );
}