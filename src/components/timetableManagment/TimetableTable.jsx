import React from "react";
import TimetableCell from "./TimetableCell";

const TimetableTable = ({ 
  timeSlots, 
  batches,
  batchData,
  conflicts, 
  validationErrors,
  courseOptions,
  teacherOptions,
  roomOptions,
  onCreateBatch,
  onRemoveBatch,
  onUpdateBatch,
  onValidationChange,
  firstCellRef,
  onCopyCell,
  onMoveCell,
  curriculumData,
  allCoursesRaw,
  allTeachersRaw,
  roomBookings,
  allRoomsRaw,
  currentTabMeta,
  currentTableKey,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isSameCell = (r1, r2, c) => {
    const key1 = `${r1}-${c}`;
    const key2 = `${r2}-${c}`;
    const count1 = batches[key1] || 1;
    const count2 = batches[key2] || 1;
    if (count1 !== count2) return false;
    
    let hasData = false;
    for (let i = 0; i < count1; i++) {
       const d1 = batchData[`${r1}-${c}-${i}`] || {};
       const d2 = batchData[`${r2}-${c}-${i}`] || {};
       if (d1.course) hasData = true;
       // All data must match
       if (d1.course !== d2.course) return false;
       if (d1.teacher !== d2.teacher) return false;
       if (d1.room !== d2.room) return false;
       if (d1.batchName !== d2.batchName) return false;
       if (d1.remark !== d2.remark) return false;
    }
    return hasData;
  };

  const shouldSkipCell = (rowIndex, colIndex) => {
    if (rowIndex === 0) return false;
    return isSameCell(rowIndex, rowIndex - 1, colIndex);
  };

  const getRowSpan = (rowIndex, colIndex) => {
    let span = 1;
    for (let r = rowIndex + 1; r < timeSlots.length; r++) {
      if (isSameCell(r, r - 1, colIndex)) {
        span++;
      } else {
        break;
      }
    }
    return span;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-auto max-h-[600px]">
      <table className="w-full">
        <thead className="sticky top-0 z-20">
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="sticky left-0 z-30 p-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide w-24 bg-gray-50 border-r border-gray-200">
              Time
            </th>
            {days.map((day) => (
              <th 
                key={day} 
                className="p-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wide min-w-[120px] bg-gray-50"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              <td className="sticky left-0 z-10 p-3 font-medium text-gray-600 bg-gray-50 text-xs whitespace-nowrap border-r border-gray-200">
                {slot}
              </td>
              {days.map((_, colIndex) => {
                if (shouldSkipCell(rowIndex, colIndex)) return null;
                const rowSpan = getRowSpan(rowIndex, colIndex);
                
                return (
                  <TimetableCell
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    rowSpan={rowSpan}
                    batches={batches}
                    batchData={batchData}
                    conflicts={conflicts}
                    validationErrors={validationErrors}
                    courseOptions={courseOptions}
                    teacherOptions={teacherOptions}
                    roomOptions={roomOptions}
                    onCreateBatch={onCreateBatch}
                    onRemoveBatch={onRemoveBatch}
                    onUpdateBatch={onUpdateBatch}
                    onValidationChange={onValidationChange}
                    isFirstCell={rowIndex === 0 && colIndex === 0}
                    firstCellRef={rowIndex === 0 && colIndex === 0 ? firstCellRef : null}
                    onCopyCell={onCopyCell}
                    onMoveCell={onMoveCell}
                    curriculumData={curriculumData}
                    allCoursesRaw={allCoursesRaw}
                    allTeachersRaw={allTeachersRaw}
                    roomBookings={roomBookings}
                    allRoomsRaw={allRoomsRaw}
                    timeSlots={timeSlots}
                    days={days}
                    currentTabMeta={currentTabMeta}
                    currentTableKey={currentTableKey}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TimetableTable;
