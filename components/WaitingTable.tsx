const WaitingTable = ({ waitList }: { waitList: any[] }) => {
  return (
    <div className="flex flex-col gap-7 border border-gray-700 rounded-lg p-7">
      <div className="flex gap-3">
        <div className="bg-amber-800 rounded-[20px] h-[40px] w-[120px] text-center leading-10">
          医生
        </div>
        <div className="bg-green-800 rounded-[20px] h-[40px] w-[160px] text-center leading-10">
          正在就诊
        </div>
        <div className="flex-1 bg-gray-800 rounded-[20px] h-[40px] text-center leading-10">
          待就诊
        </div>
      </div>
      {waitList.map((item, i) => (
        <div className="flex gap-3" key={i}>
          <div className="border border-amber-800 rounded-[20px] h-[40px] w-[120px] flex items-center justify-center">
            {item.doctor}
          </div>
          <div className="border border-green-800 rounded-[20px] h-[40px] w-[160px] flex items-center justify-center">
            {item.patient}
          </div>
          <div className="flex flex-1 gap-2 overflow-hidden">
            {item.waiters.map((waiter) => (
              <div
                key={waiter.name}
                className="border border-gray-700 rounded-[20px] h-[40px] px-1 min-w-[80px] flex items-center justify-center"
              >
                {waiter.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitingTable;
