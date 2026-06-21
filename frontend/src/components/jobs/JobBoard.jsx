import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import JobColumn from '@/components/jobs/JobColumn';
import CreateJobModal from '@/components/jobs/CreateJobModal';
import JobStats from '@/components/jobs/JobStats';
import { useJobs, useJobStats, useUpdateJob } from '@/features/jobs/jobs.hooks';

export default function JobBoard() {
  const [showModal, setShowModal] = useState(false);
  const [localColumns, setLocalColumns] = useState({});

  const { data: jobsData, isLoading: isJobsLoading } = useJobs();
  const { data: statsData, isLoading: isStatsLoading } = useJobStats();
  const updateJobMutation = useUpdateJob();

  const stats = statsData?.stats || { saved: 0, applied: 0, interview: 0, offer: 0, rejected: 0 };

  // Sync local state when jobs data changes
  useEffect(() => {
    if (jobsData?.jobs) {
      const jobs = jobsData.jobs;
      setLocalColumns({
        'Saved': jobs.filter((j) => j.status?.toLowerCase() === 'saved'),
        'Applied': jobs.filter((j) => j.status?.toLowerCase() === 'applied'),
        'Interview': jobs.filter((j) => j.status?.toLowerCase() === 'interview'),
        'Offer': jobs.filter((j) => j.status?.toLowerCase() === 'offer'),
        'Rejected': jobs.filter((j) => j.status?.toLowerCase() === 'rejected'),
      });
    }
  }, [jobsData]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumnTitle = Object.keys(localColumns).find(
      key => key.toLowerCase() === source.droppableId
    );
    const destColumnTitle = Object.keys(localColumns).find(
      key => key.toLowerCase() === destination.droppableId
    );

    if (!sourceColumnTitle || !destColumnTitle) return;

    const sourceItems = Array.from(localColumns[sourceColumnTitle]);
    const destItems = sourceColumnTitle === destColumnTitle 
      ? sourceItems 
      : Array.from(localColumns[destColumnTitle]);
      
    const [movedJob] = sourceItems.splice(source.index, 1);

    // If moving between different columns, update the status locally and on server
    if (sourceColumnTitle !== destColumnTitle) {
      // Create new job object with updated status for local optimistic update
      const updatedJob = { ...movedJob, status: destination.droppableId };
      destItems.splice(destination.index, 0, updatedJob);

      setLocalColumns({
        ...localColumns,
        [sourceColumnTitle]: sourceItems,
        [destColumnTitle]: destItems,
      });

      // Update backend
      updateJobMutation.mutate({
        id: draggableId,
        payload: { status: destination.droppableId }
      });
    } else {
      // Reordering within the same column
      destItems.splice(destination.index, 0, movedJob);
      setLocalColumns({
        ...localColumns,
        [sourceColumnTitle]: destItems,
      });
      // Optionally we could save the new order if the backend supported sorting
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-[calc(100vh-4rem)]">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black">Application Tracker</h1>
          <p className="text-muted-foreground mt-1">Track and manage your active job applications.</p>
        </div>
        <button
          className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          onClick={() => setShowModal(true)}
        >
          + Add Application
        </button>
      </header>

      {isStatsLoading ? (
        <div className="h-32 bg-muted animate-pulse rounded-3xl mb-6"></div>
      ) : (
        <div className="mb-6">
          <JobStats stats={stats} />
        </div>
      )}

      {isJobsLoading ? (
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="min-w-[280px] w-full md:w-[320px] h-96 bg-muted animate-pulse rounded-3xl shrink-0"></div>
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex overflow-x-auto custom-scrollbar gap-6 pb-6 pt-2 items-start h-full snap-x snap-mandatory hide-scrollbar-mobile">
            {Object.entries(localColumns).map(([title, colJobs]) => (
              <div key={title} className="snap-center shrink-0 w-[85vw] sm:w-[320px]">
                <JobColumn title={title} jobs={colJobs} />
              </div>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* Modal wrapper for CreateJobModal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <CreateJobModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
