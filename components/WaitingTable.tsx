import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

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
            {item.doctor_name} {/* Make sure the field name is correct */}
          </div>
          <div className="border border-green-800 rounded-[20px] h-[40px] w-[160px] flex items-center justify-center">
            {item.patient_name} {/* Make sure the field name is correct */}
          </div>
          <div className="flex flex-1 gap-2 overflow-hidden">
            {/* Convert the waiters string to an array and then map */}
            {item.waiters && item.waiters.split(',').map((waiter: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
              <div
                key={index}
                className="border border-gray-700 rounded-[20px] h-[40px] px-1 min-w-[80px] flex items-center justify-center"
              >
                {waiter}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitingTable;
