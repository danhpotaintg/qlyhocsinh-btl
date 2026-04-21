import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function StudentSubjectList() {
    

    const [subjectList, setSubjectList] = useState([]);
    const [err, setErr] = useState("");


    const [selection, setSelection] = useState({
        academicYear: "",
        semester: ""
    });

    const fetchSubjectList = async () => {
        try {
            const token = localStorage.getItem('token');
   
            const response = await axios.get(
                `/quanly/grades/student/subjects?semester=${selection.semester}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubjectList(response.data.result);
        } catch (error) {
            const backendMessage = error.response?.data?.message;
            setErr(backendMessage || "Không thể tải danh sách môn học");
            setTimeout(() => setErr(''), 5000);
        }
    };

    useEffect(() => {
        if (selection.academicYear && selection.semester) {
            fetchSubjectList();
        }
    }, [selection]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value) {
            const [year, sem] = value.split('-'); 
            setSelection({
                academicYear: year,
                semester: sem
            });
        } else {
            setSelection({ academicYear: "", semester: "" });
            setSubjectList([]);
        }
    };

    return (
        <div className="p-4">
            {/* Thẻ select dùng value gộp "Năm-Kỳ" */}
            <select 
                className="mb-4 p-2 border rounded border-gray-300"
                onChange={handleChange}
                value={`${selection.academicYear}-${selection.semester}`}
            >
                <option value="-">-- Chọn năm học và học kỳ --</option>
                <option value="2024-1">Học kì 1 năm 2024</option>
                <option value="2024-2">Học kì 2 năm 2024</option>
                <option value="2025-1">Học kì 1 năm 2025</option>
                <option value="2025-1">Học kì 2 năm 2025</option>
            </select>
            
            {err && <div className="text-red-500 bg-red-50 p-2 rounded mb-4">{err}</div>}

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border p-2 text-center">Tên môn</th>
                        <th className="border p-2 text-center w-32">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectList && subjectList.length > 0 ? (
                        subjectList.map(data => (
                            <tr key={data.id} className="hover:bg-gray-50 text-center">
                                <td className="border p-2">
                                    { data.subjectName}
                                </td>
                                <td className="border p-2"> 
                                    <Link 
                                        to={`/student/grade/${data.id}/${selection.semester}/${selection.academicYear}`} 
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 inline-block"
                                    >
                                        Xem điểm
                                    </Link>
                                </td>
                            </tr>  
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="border p-10 text-center text-gray-500 italic">
                                {selection.academicYear 
                                    ? `Không tìm thấy môn học cho học kỳ ${selection.semester} năm ${selection.academicYear}`
                                    : "Vui lòng chọn học kỳ để hiển thị dữ liệu."
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}