import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';

export default function AttendanceDetail() {
    const gender = {
        "MALE": "Nam",
        "FEMALE": "Nữ"
    };

    const {classId, className} = useParams();

    const [stuData, setStuData] = useState([]);
    const [err, setErr] = useState("");
    const [attendanceStates, setAttendanceStates] = useState({});
    const [success, setSuccess] = useState("");

    const fetchStuData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/quanly/classes/${classId}/students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStuData(response.data.result);
        } catch (error) {
            const backendMessage = error.response?.data?.message;
            setErr(backendMessage || "Không thể tải danh sách học sinh");
            setTimeout(() => setErr(''), 5000);
        }
    };

    useEffect(() => {
        if (classId) {
            fetchStuData();
        }
    }, [classId]);

    const handleStatusChange = (stuId, value) => {
        setAttendanceStates(prev => ({
            ...prev,
            [stuId]: value
        }));
    };

    const handleSubmit = async (stuId) => {
        try {
            const token = localStorage.getItem('token');
            const status = (attendanceStates[stuId] || "Present").toUpperCase();  

            await axios.post("/quanly/attendances", {
                studentId: stuId,
                status: status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess(`Đã điểm danh học sinh thành công`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            console.error("Chi tiết lỗi:", error.response?.data);
            setErr(error.response?.data?.message || "Điểm danh thất bại");
            setTimeout(() => setErr(''), 5000);
        }
    };

    return(
        <div>
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Danh sách học sinh lớp {className}</h2>

            <div>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border p-2">Họ và tên</th>
                        <th className="border p-2">Ngày sinh</th>
                        <th className="border p-2">Giới tính</th>
                        <th className="border p-2">Số điện thoại phụ huynh</th>
                        <th className="border p-2">Điểm danh</th>
                    </tr>
                </thead>
                <tbody>
                    {stuData.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border p-2 text-center w-16">{user.fullName}</td>
                            <td className="border p-2 text-center w-16">{user.dob}</td>
                            <td className="border p-2 text-center w-16">{gender[user.gender]}</td>
                            <td className="border p-2 text-center w-16">{user.parentPhonenumber}</td>
                            <td className="border p-2 text-center w-16">
                                <select 
                                    className="border p-1 rounded"
                                    value={attendanceStates[user.id] || "Present"}
                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                >
                                    <option value="Present">Có mặt</option>
                                    <option value="Absent">Vắng</option>
                                    <option value="Late">Muộn</option>
                                    <option value="Excused">Nghỉ có phép</option>
                                </select>
                                <button 
                                    onClick={() => handleSubmit(user.id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                >
                                    Điểm danh
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    );
}