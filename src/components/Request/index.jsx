import { useState } from 'react'
import { APPROVAL_STATUS_TXT, APPROVAL_STATUS } from '../../constant';
export default function Request({ allocations, requests, onRequestAdded, onRequestDeleted }) {
    const [newItem, setNewItem] = useState(null);

    const handleAdd = () => {
        setNewItem({
            id: Date.now(),
            allocationId: null,
            region: "",
            branch: "",
            department: "",
            name: "",
            status: 0,
            amount: 0,
            percentage: 0
        });
    };

    const handleNewItemChange = (e, field) => {
        const value = e.target.value;

        if (field === "allocationId") {
            const allocation = allocations.find((allocation) => allocation.id == parseInt(value));
            setNewItem({
                ...newItem,
                allocationId: parseInt(value),
                region: allocation ? allocation.region : "",
                branch: allocation ? allocation.branch : "",
                department: allocation ? allocation.department : ""
            });
        }
        else if (field === "percentage") {
            if (newItem.allocationId == null) {
                setNewItem({ ...newItem, percentage: value });
                return;
            }
            const budget = getUsableBudget(newItem.allocationId);
            const percentage = parseFloat(value) || 0;
            const amount = Math.round((budget * percentage) / 100);
            setNewItem({ ...newItem, percentage: value, amount });
        }
        else if (field === "amount") {
            if (newItem.allocationId == null) {
                setNewItem({ ...newItem, amount: value });
                return;
            }
            const budget = getUsableBudget(newItem.allocationId);
            const amount = parseFloat(value) || 0;
            const percentage = budget > 0 ? ((amount / budget) * 100).toFixed(2) : 0;
            setNewItem({ ...newItem, amount: value, percentage });
        } else {
            setNewItem({ ...newItem, [field]: value });
        }
    };

    const handleSave = () => {
        const formattedItem = {
            ...newItem,
            percentage: parseFloat(newItem.percentage) || 0,
            amount: parseFloat(newItem.amount) || 0,
        };
        onRequestAdded(formattedItem);
        setNewItem(null);
    };

    function getAllocationName(allocationId) {
        if (allocationId == null) {
            return null;
        }
        const allocation = allocations.find((allocation) => allocation.id == allocationId);
        return allocation ? allocation.name : null;
    }

    function getUsableBudget(allocationId) {
        if (allocationId == null) {
            return null;
        }
        const allocation = allocations.find((allocation) => allocation.id == allocationId);
        if (allocation == null) {
            return null;
        }
        var usedBudget = 0;

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].allocationId == allocationId && requests[i].status == APPROVAL_STATUS.APPROVED) {
                usedBudget += requests[i].amount;
            }
        }
        return allocation.amount - usedBudget;
    }

    return (
        <div className="p-5 rounded-xl shadow">
            <div className="flex">
                <p className="text-xl font-bold">PHIẾU TRÌNH DUYỆT</p>
                <div className="ml-auto">
                    <button onClick={handleAdd} className="border text-sm border-blue-500 text-blue-500 rounded py-1 px-5">
                        THÊM PHIẾU TRÌNH DUYỆT
                    </button>
                </div>
            </div>
            {requests.length === 0 && !newItem ? (
                <p className="text-gray-500 text-center">Hiện tại chưa có phiếu trình duyệt nào khả dụng.</p>
            ) :
                <table className="table-auto mt-5 w-full text-left">
                    <thead>
                        <tr>
                            <th>Tên trình duyệt</th>
                            <th>Liên kết phân bổ</th>
                            <th>Ngân sách còn lại</th>
                            <th>Trạng thái</th>
                            <th>Tiền (%)</th>
                            <th>Tiền (VNĐ)</th>
                            <th className="w-28">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{getAllocationName(item.allocationId)}</td>
                                <td>{getUsableBudget(item.allocationId).toLocaleString("vi-VN")} đ</td>
                                <td><p className='border inline-block text-sm border-red-500 text-red-500 rounded py-1 px-3'>{APPROVAL_STATUS_TXT[item.status]}</p></td>
                                <td>{item.percentage}</td>
                                <td>{item.amount.toLocaleString("vi-VN")} đ</td>
                                <td>
                                    <button onClick={() => onRequestDeleted(index)} className="border text-sm border-red-500 text-red-500 rounded py-1 px-3">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {newItem && (
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={newItem.name}
                                        onChange={(e) => handleNewItemChange(e, "name")}
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td>
                                    <select
                                        className="border px-2 py-1 w-full"
                                        value={newItem.allocationId}
                                        onChange={(e) => handleNewItemChange(e, "allocationId")}
                                    >
                                        <option value="">Chọn ngân sách</option>
                                        {allocations.map((a) => a.status == APPROVAL_STATUS.APPROVED && (
                                            <option key={a.id} value={a.id}>
                                                {a.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{getUsableBudget(newItem.allocationId)}</td>
                                <td className="px-2">
                                    Tạo mới
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        type="number"
                                        value={newItem.percentage}
                                        onChange={(e) => handleNewItemChange(e, "percentage")}
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        type="number"
                                        value={newItem.amount}
                                        onChange={(e) => handleNewItemChange(e, "amount")}
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td>
                                    <div className="flex gap">
                                        <button onClick={handleSave} className="border text-sm border-green-500 text-green-500 rounded py-1 px-3">
                                            Lưu
                                        </button>
                                        <button onClick={() => setNewItem(null)} className="ml-2 border text-sm border-gray-400 text-gray-600 rounded py-1 px-3">
                                            Hủy
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </div>
    )
}