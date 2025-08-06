import { useState } from "react";
import {
    REGIONS,
    BRANCHES,
    DEPARTMENTS,
    BUDGET_CATEGORIES,
    APPROVAL_STATUS,
    APPROVAL_STATUS_TXT
} from "../../constant";

export default function Allocation({ allocations, requests, onAllocationAdded, onAllocationDeleted }) {
    const [newItem, setNewItem] = useState(null);

    const handleAdd = () => {
        setNewItem({
            id: Date.now(),
            name: "",
            category: "",
            region: "",
            branch: "",
            department: "",
            status: 0,
            amount: 0
        });
    };

    const handleNewItemChange = (e, field) => {
        const value = e.target.value;
        setNewItem({ ...newItem, [field]: value });
    };

    const handleSave = () => {
        const formattedItem = {
            ...newItem,
            percentage: parseFloat(newItem.percentage) || 0,
            amount: parseFloat(newItem.amount) || 0,
        };
        onAllocationAdded(formattedItem);
        setNewItem(null);
    };

    function getUsedBudget(allocationId) {
        var usedBudget = 0;

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].allocationId == allocationId && requests[i].status == APPROVAL_STATUS.APPROVED) {
                usedBudget += requests[i].amount;
            }
        }
        return usedBudget;
    }

    function getWaitingBudget(allocationId) {
        var usedBudget = 0;

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].allocationId == allocationId && requests[i].status == APPROVAL_STATUS.WAITING) {
                usedBudget += requests[i].amount;
            }
        }
        return usedBudget;
    }

    return (
        <div className="p-5 rounded-xl shadow">
            <div className="flex">
                <p className="text-xl font-bold">PHÂN BỔ NGÂN SÁCH</p>
                <div className="ml-auto">
                    <button onClick={handleAdd} className="border text-sm border-blue-500 text-blue-500 rounded py-1 px-5">
                        PHÂN BỔ NGÂN SÁCH
                    </button>
                </div>
            </div>
            {allocations.length === 0 && !newItem ? (
                <p className="text-gray-500 text-center">Hiện không có yêu cầu đang chờ duyệt.</p>
            ) :
                <table className="table-auto mt-5 w-full text-left">
                    <thead>
                        <tr>
                            <th>Danh mục</th>
                            <th>Tên</th>
                            <th>Khu vực</th>
                            <th>Chi nhánh</th>
                            <th>Bộ phận</th>
                            <th>Trạng thái</th>
                            <th>Tiền (VNĐ)</th>
                            <th>Đã dùng</th>
                            <th>Chờ duyệt</th>
                            <th>Khả dụng</th>
                            <th className="w-28">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map((item, index) => (
                            <tr key={index}>
                                <td>{BUDGET_CATEGORIES[item.category]}</td>
                                <td>{item.name}</td>
                                <td>{REGIONS[item.region]}</td>
                                <td>{BRANCHES[item.branch]}</td>
                                <td>{DEPARTMENTS[item.department]}</td>
                                <td><p className='border inline-block text-sm border-red-500 text-red-500 rounded py-1 px-3'>{APPROVAL_STATUS_TXT[item.status]}</p></td>
                                <td>{item.amount.toLocaleString("vi-VN")} đ</td>
                                <td>{getUsedBudget(item.id).toLocaleString("vi-VN")} đ</td>
                                <td>{getWaitingBudget(item.id).toLocaleString("vi-VN")} đ</td>
                                <td>{(item.amount - getUsedBudget(item.id)).toLocaleString("vi-VN")} đ</td>
                                <td>
                                    <button onClick={() => onAllocationDeleted(index)} className="border text-sm border-red-500 text-red-500 rounded py-1 px-3">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {newItem && (
                            <tr>
                                <td>
                                    <select
                                        className="border px-2 py-1 w-full"
                                        value={newItem.category}
                                        onChange={(e) => handleNewItemChange(e, "category")}
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {Object.entries(BUDGET_CATEGORIES).map(([id, name]) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-2">
                                    <input
                                        type="text"
                                        value={newItem.name}
                                        onChange={(e) => handleNewItemChange(e, "name")}
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td className="px-2">
                                    <select
                                        className="border px-2 py-1 w-full"
                                        value={newItem.region}
                                        onChange={(e) => handleNewItemChange(e, "region")}
                                    >
                                        <option value="">Chọn khu vực</option>
                                        {Object.entries(REGIONS).map(([id, name]) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        className="border px-2 py-1 w-full"
                                        value={newItem.branch}
                                        onChange={(e) => handleNewItemChange(e, "branch")}
                                    >
                                        <option value="">Chọn chi nhánh</option>
                                        {Object.entries(BRANCHES).map(([id, name]) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        className="border px-2 py-1 w-full"
                                        value={newItem.department}
                                        onChange={(e) => handleNewItemChange(e, "department")}
                                    >
                                        <option value="">Chọn bộ phận
                                        </option>
                                        {Object.entries(DEPARTMENTS).map(([id, name]) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td><p className='border inline-block text-sm border-red-500 text-red-500 rounded py-1 px-3'>{APPROVAL_STATUS_TXT[newItem.status]}</p></td>
                                <td className="px-2 py-1">
                                    <input
                                        type="number"
                                        value={newItem.amount}
                                        onChange={(e) => handleNewItemChange(e, "amount")}
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td>0</td>
                                <td>0</td>
                                <td>{newItem.amount}</td>
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
    );
}
