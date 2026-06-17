import { Droppable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

export default function JobColumn({ title, jobs }) {
  // We use lowercase title for id to match the status keys (saved, applied, etc)
  const droppableId = title.toLowerCase();

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm w-full md:w-1/3 md:min-w-[300px] flex flex-col max-h-[80vh]">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-bold text-xl text-gray-800">
          {title}
        </h2>
        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
          {jobs.length}
        </span>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto space-y-4 pr-2 pb-4 transition-colors rounded-xl ${
              snapshot.isDraggingOver ? "bg-gray-50/50 ring-2 ring-dashed ring-gray-200" : ""
            }`}
            style={{ minHeight: "150px" }}
          >
            {jobs.map((job, index) => (
              <JobCard
                key={job._id}
                job={job}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}