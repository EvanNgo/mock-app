import {
    REGIONS,
    BRANCHES,
    DEPARTMENTS
} from "../../constant";

export default function Report({ allocations }) {
    const summary = allocations.reduce((acc, item) => {
        const deptId = item.department;
        if (!acc[deptId]) {
            acc[deptId] = {
                amount: 0,
                percentage: 0,
                departmentId: deptId,
                branchId: item.branch,
                regionId: item.region
            };
        }
        acc[deptId].amount += item.amount;
        acc[deptId].percentage += item.percentage;
        return acc;
    }, {});


    return (
        <div className="p-5 rounded-xl shadow">
            <p className="text-xl font-bold mb-4">BÁO CÁO NGÂN SÁCH THEO BỘ PHẬN</p>
            {allocations.length === 0 ? (
                <p className="text-gray-500 text-center">Hiện tại chưa có báo cáo ngân sách nào khả dụng.</p>
            ) : <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th>Bộ phận</th>
                        <th>Chi nhánh</th>
                        <th>Khu vực</th>
                        <th>Tổng Tiền (%)</th>
                        <th>Tổng Tiền (VNĐ)</th>
                        <th>Đã dùng (VNĐ)</th>
                        <th>Đã dùng (%)</th>
                        <th>Còn lại (VNĐ)</th>
                        <th>Còn lại (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(summary).map((data) => (
                        <tr key={data.departmentId}>
                            <td>{DEPARTMENTS[data.departmentId]}</td>
                            <td>{BRANCHES[data.branchId]}</td>
                            <td>{REGIONS[data.regionId]}</td>
                            <td>{data.percentage.toFixed(2)}%</td>
                            <td>{data.amount.toLocaleString("vi-VN")} ₫</td>
                            <td>Đã dùng (VNĐ)</td>
                            <td>Đã dùng (%)</td>
                            <td>Còn lại (VNĐ)</td>
                            <td>Còn lại (%)</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
}
