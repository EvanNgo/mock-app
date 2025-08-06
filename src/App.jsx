import { useState } from 'react'
import './App.css'
import Budget from './components/Budget'
import Allocation from './components/Allocation'
import Report from './components/Report'
import Request from './components/Request'
import Approval from './components/Approval'
import { APPROVAL_STATUS } from './constant'
import AllocationApproval from './components/AllocationApproval'

function App() {
  const [allocations, setAllocations] = useState([]);
  const [requests, setRequests] = useState([]);

  function getGetUsedBudget() {
    var used = 0;
    allocations.forEach((allocation) => {
      used += allocation.amount
    })
    return used;
  }

  function onAllocationAdded(newAllocation) {
    setAllocations([...allocations, newAllocation]);
  }

  function onAllocationDeleted(index) {
    const newAllocations = [...allocations];
    newAllocations.splice(index, 1);
    setAllocations(newAllocations);
  }

  function onAllocationApproved(allocationId) {
    const newAllocations = [...allocations];
    const allocation = newAllocations.find((allocation) => allocation.id == allocationId);
    allocation.status = APPROVAL_STATUS.APPROVED;
    setAllocations(newAllocations);
  }

  function onAllocationRejected(allocationId) {
    const newAllocations = [...allocations];
    const allocation = newAllocations.find((allocation) => allocation.id == allocationId);
    allocation.status = APPROVAL_STATUS.REJECTED;
    setAllocations(newAllocations);
  }

  function onRequestAdded(newRequest) {
    setRequests([...requests, newRequest]);
  }

  function onRequestDeleted(index) {
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setAllocations(newRequests);
  }

  function onApproved(requestId) {
    const newRequests = [...requests];
    const request = newRequests.find((request) => request.id == requestId);
    request.status = APPROVAL_STATUS.APPROVED;
    setRequests(newRequests);
  }

  function onRejected(requestId) {
    const newRequests = [...requests];
    const request = newRequests.find((request) => request.id == requestId);
    request.status = APPROVAL_STATUS.REJECTED;
    setRequests(newRequests);
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-5 p-5">
      <Budget
        allocations={allocations}
        requests={requests}
        used={getGetUsedBudget()} />

      <Allocation
        allocations={allocations}
        requests={requests}
        onAllocationAdded={onAllocationAdded}
        onAllocationDeleted={onAllocationDeleted} />

      <AllocationApproval
        allocations={allocations}
        requests={requests}
        onAllocationApproved={onAllocationApproved}
        onAllocationRejected={onAllocationRejected} />

      {/* <Report allocations={allocations} /> */}

      <Request
        allocations={allocations}
        requests={requests}
        onRequestAdded={onRequestAdded}
        onRequestDeleted={onRequestDeleted}
      />

      <Approval allocations={allocations} requests={requests} onApproved={onApproved} onRejected={onRejected} />
    </div>
  )
}

export default App
