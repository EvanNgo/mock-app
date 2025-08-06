import {
    REGIONS,
    BRANCHES,
    DEPARTMENTS,
    APPROVAL_STATUS,
    APPROVAL_STATUS_TXT
} from "../../constant";

export default function Budget({ allocations, requests }) {
    const approvedBudget = getApprovedBudget();
    const waitingBudget = getWaitingBudget();
    const approvedRequest = getApprovedRequest();

    function getApprovedBudget() {
        var approvedBudget = {
            item: 0,
            amount: 0
        };
        allocations.forEach((allocation) => {
            if (allocation.status == APPROVAL_STATUS.APPROVED) {
                approvedBudget.amount += allocation.amount;
                approvedBudget.item++;
            }
        })
        return approvedBudget;
    }

    function getWaitingBudget() {
        var waitingBudget = {
            item: 0,
            amount: 0
        };
        allocations.forEach((allocation) => {
            if (allocation.status == APPROVAL_STATUS.WAITING) {
                waitingBudget.amount += allocation.amount;
                waitingBudget.item++;
            }
        })
        return waitingBudget;
    }

    function getApprovedRequest() {
        var approvedRequest = {
            item: 0,
            amount: 0
        }
        requests.forEach((request) => {
            if (request.status == APPROVAL_STATUS.APPROVED) {
                approvedRequest.amount += request.amount;
                approvedRequest.item++;
            }
        })
        return approvedRequest;
    }

    return (
        <div className="p-5 rounded-xl shadow">
            <p className="text-xl font-bold">NGÂN SÁCH</p>
            <div className="mt-5 flex-column gap-2 text-base">
                <div className="flex border-b border-dotted py-2">
                    <p>{approvedBudget.item} chi phí đã được duyệt</p>
                    <p className="ml-auto"><span>{approvedBudget.amount.toLocaleString('vi-VN')}</span> đ</p>
                </div>
                <div className="flex border-b border-dotted py-2">
                    <p>{waitingBudget.item} chi phí đang chờ duyệt</p>
                    <p className="ml-auto"><span>{waitingBudget.amount.toLocaleString('vi-VN')}</span> đ</p>
                </div>
                <div className="flex border-b border-dotted py-2">
                    <p>{approvedRequest.item} chi phí đã sử dụng</p>
                    <p className="ml-auto"><span>{approvedRequest.amount.toLocaleString('vi-VN')}</span> đ</p>
                </div>
                <div className="flex border-b border-dotted py-2">
                    <p>Ngân sách chưa sử dụng</p>
                    <p className="ml-auto"><span>{(approvedBudget.amount - approvedRequest.amount).toLocaleString('vi-VN')}</span> đ</p>
                </div>
            </div>
        </div>
    );
}
