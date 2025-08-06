import {
    BUDGET_CATEGORIES,
    REGIONS,
    BRANCHES,
    DEPARTMENTS,
    APPROVAL_STATUS,
    APPROVAL_STATUS_TXT
} from "../../constant";

export default function AllocationApproval({ allocations, onAllocationApproved, onAllocationRejected }) {
    return (
        <div className="p-5 rounded-xl shadow">
            <p className="text-xl font-bold mb-4">DANH SÁCH YÊU CẦU DUYỆT NGÂN SÁCH</p>
            {allocations.length === 0 ? (
                <p className="text-gray-500 text-center">Hiện không có yêu cầu nào đang chờ duyệt.</p>
            ) : (
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th>Danh mục</th>
                            <th>Tên</th>
                            <th>Khu vực</th>
                            <th>Chi nhánh</th>
                            <th>Bộ phận</th>
                            <th>Trạng thái</th>
                            <th>Tiền (VNĐ)</th>
                            <th className="w-28">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map((item) => (
                            <tr key={item.id}>
                                <td>{BUDGET_CATEGORIES[item.category]}</td>
                                <td>{item.name}</td>
                                <td>{REGIONS[item.region]}</td>
                                <td>{BRANCHES[item.branch]}</td>
                                <td>{DEPARTMENTS[item.department]}</td>
                                <td><p className='border inline-block text-sm border-red-500 text-red-500 rounded py-1 px-3'>{APPROVAL_STATUS_TXT[item.status]}</p></td>
                                <td>{item.amount.toLocaleString("vi-VN")} đ</td>
                                <td>
                                    {item.status == APPROVAL_STATUS.WAITING &&
                                        <>
                                            <button onClick={() => onAllocationApproved(item.id)} className="text-sm border border-blue-500 text-blue-500 rounded px-3 py-1 mr-2">
                                                Duyệt
                                            </button>
                                            <button onClick={() => onAllocationRejected(item.id)} className="text-sm border border-red-500 text-red-500 rounded px-3 py-1">
                                                Từ chối
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}