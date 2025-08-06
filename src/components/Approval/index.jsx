import {
    REGIONS,
    BRANCHES,
    DEPARTMENTS,
    APPROVAL_STATUS,
    APPROVAL_STATUS_TXT
} from "../../constant";

export default function Approval({ allocations, requests, onApproved, onRejected }) {
    function getAllocationName(allocationId) {
        if (allocationId == null) {
            return null;
        }
        const allocation = allocations.find((allocation) => allocation.id == allocationId);
        return allocation ? allocation.name : null;
    }

    function getUsableBudget(allocationId) {
        if (allocationId == null) {
            return 0;
        }
        const allocation = allocations.find((allocation) => allocation.id == allocationId);
        if (allocation == null) {
            return 0;
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
            <p className="text-xl font-bold mb-4">DANH SÁCH YÊU CẦU GIẢI NGÂN</p>
            {requests.length === 0 ? (
                <p className="text-gray-500 text-center">Hiện không có yêu cầu đang chờ duyệt.</p>
            ) : (
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th>Mã yêu cầu</th>
                            <th>Bộ phận</th>
                            <th>Chi nhánh</th>
                            <th>Khu vực</th>
                            <th>Loại ngân sách</th>
                            <th>Ngân sách khả dụng</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{REGIONS[r.region]}</td>
                                <td>{BRANCHES[r.branch]}</td>
                                <td>{DEPARTMENTS[r.department]}</td>
                                <td>{getAllocationName(r.allocationId)}</td>
                                <td>{getUsableBudget(r.allocationId).toLocaleString("vi-VN")} ₫</td>
                                <td>{r.amount.toLocaleString("vi-VN")} ₫</td>
                                <td><p className='border inline-block text-sm border-red-500 text-red-500 rounded py-1 px-3'>{APPROVAL_STATUS_TXT[r.status]}</p></td>
                                <td>
                                    {r.status == APPROVAL_STATUS.WAITING &&
                                        <>
                                            <button onClick={() => onApproved(r.id)} className="text-sm border border-blue-500 text-blue-500 rounded px-3 py-1 mr-2">
                                                Duyệt
                                            </button>
                                            <button onClick={() => onRejected(r.id)} className="text-sm border border-red-500 text-red-500 rounded px-3 py-1">
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